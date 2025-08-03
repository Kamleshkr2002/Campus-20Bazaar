import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User, Conversation, Message } from '../models/index.js';
import { config } from '../config/config.js';
import logger from '../utils/logger.js';

class ChatSocket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.socketIoCorsOrigin,
        credentials: true,
        methods: ['GET', 'POST'],
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    this.connectedUsers = new Map(); // userId -> { socketId, user }
    this.userSockets = new Map(); // socketId -> userId
    
    this.setupMiddleware();
    this.setupEventHandlers();
    
    logger.info('Socket.io chat system initialized');
  }

  setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.query.token;
        
        if (!token) {
          throw new Error('Authentication token required');
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.userId).select('-password -refreshTokens');
        
        if (!user || !user.isActive) {
          throw new Error('Invalid token or user not found');
        }

        socket.userId = user._id.toString();
        socket.user = user;
        next();
      } catch (error) {
        logger.warn(`Socket authentication failed: ${error.message}`);
        next(new Error('Authentication failed'));
      }
    });
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      this.handleConnection(socket);
    });
  }

  handleConnection(socket) {
    const userId = socket.userId;
    const user = socket.user;

    logger.info(`User connected: ${user.email} (${socket.id})`);

    // Store user connection
    this.connectedUsers.set(userId, {
      socketId: socket.id,
      user: user,
      lastSeen: new Date(),
    });
    this.userSockets.set(socket.id, userId);

    // Join user to their own room for personal notifications
    socket.join(`user:${userId}`);

    // Join user to their conversation rooms
    this.joinUserConversations(socket, userId);

    // Emit user online status to conversations
    this.broadcastUserStatus(userId, 'online');

    // Handle events
    socket.on('join_conversation', (data) => this.handleJoinConversation(socket, data));
    socket.on('leave_conversation', (data) => this.handleLeaveConversation(socket, data));
    socket.on('send_message', (data) => this.handleSendMessage(socket, data));
    socket.on('typing_start', (data) => this.handleTypingStart(socket, data));
    socket.on('typing_stop', (data) => this.handleTypingStop(socket, data));
    socket.on('mark_read', (data) => this.handleMarkRead(socket, data));
    socket.on('get_online_users', () => this.handleGetOnlineUsers(socket));

    socket.on('disconnect', () => this.handleDisconnection(socket));
  }

  async joinUserConversations(socket, userId) {
    try {
      const conversations = await Conversation.find({
        participants: userId,
        isActive: true,
      }).select('_id');

      conversations.forEach(conv => {
        socket.join(`conversation:${conv._id}`);
      });

      logger.debug(`User ${userId} joined ${conversations.length} conversation rooms`);
    } catch (error) {
      logger.error('Error joining user conversations:', error);
    }
  }

  handleJoinConversation(socket, data) {
    const { conversationId } = data;
    
    if (!conversationId) {
      return socket.emit('error', { message: 'Conversation ID is required' });
    }

    socket.join(`conversation:${conversationId}`);
    logger.debug(`User ${socket.userId} joined conversation ${conversationId}`);
    
    socket.emit('joined_conversation', { conversationId });
  }

  handleLeaveConversation(socket, data) {
    const { conversationId } = data;
    
    if (!conversationId) {
      return socket.emit('error', { message: 'Conversation ID is required' });
    }

    socket.leave(`conversation:${conversationId}`);
    logger.debug(`User ${socket.userId} left conversation ${conversationId}`);
    
    socket.emit('left_conversation', { conversationId });
  }

  async handleSendMessage(socket, data) {
    try {
      const { conversationId, content, type = 'text', offer } = data;

      if (!conversationId || !content) {
        return socket.emit('error', { message: 'Conversation ID and content are required' });
      }

      // Verify conversation exists and user is participant
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return socket.emit('error', { message: 'Conversation not found' });
      }

      if (!conversation.participants.some(p => p.equals(socket.userId))) {
        return socket.emit('error', { message: 'Access denied' });
      }

      if (conversation.metadata.isBlocked) {
        return socket.emit('error', { message: 'This conversation is blocked' });
      }

      // Create message
      const messageData = {
        conversation: conversationId,
        sender: socket.userId,
        content,
        type,
      };

      if (type === 'offer' && offer) {
        messageData.offer = offer;
      }

      const message = new Message(messageData);
      await message.save();

      // Update conversation
      conversation.lastMessage = message._id;
      conversation.lastMessageAt = new Date();
      await conversation.incrementUnreadCount(socket.userId);

      // Populate message data
      await message.populate('sender', 'firstName lastName avatar');

      // Emit to conversation room
      this.io.to(`conversation:${conversationId}`).emit('new_message', {
        message: message.toObject(),
        conversationId,
      });

      // Send push notifications to offline users
      this.sendNotificationsToOfflineUsers(conversation, message);

      logger.debug(`Message sent in conversation ${conversationId} by user ${socket.userId}`);

    } catch (error) {
      logger.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  }

  handleTypingStart(socket, data) {
    const { conversationId } = data;
    
    if (!conversationId) {
      return socket.emit('error', { message: 'Conversation ID is required' });
    }

    socket.to(`conversation:${conversationId}`).emit('user_typing', {
      userId: socket.userId,
      user: {
        _id: socket.userId,
        firstName: socket.user.firstName,
        lastName: socket.user.lastName,
      },
      conversationId,
    });
  }

  handleTypingStop(socket, data) {
    const { conversationId } = data;
    
    if (!conversationId) {
      return socket.emit('error', { message: 'Conversation ID is required' });
    }

    socket.to(`conversation:${conversationId}`).emit('user_stopped_typing', {
      userId: socket.userId,
      conversationId,
    });
  }

  async handleMarkRead(socket, data) {
    try {
      const { conversationId, messageId } = data;

      if (conversationId) {
        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
          await conversation.markAsRead(socket.userId);
          
          // Notify other participants
          socket.to(`conversation:${conversationId}`).emit('message_read', {
            conversationId,
            userId: socket.userId,
          });
        }
      }

      if (messageId) {
        const message = await Message.findById(messageId);
        if (message) {
          await message.markAsRead(socket.userId);
        }
      }

    } catch (error) {
      logger.error('Error marking as read:', error);
    }
  }

  handleGetOnlineUsers(socket) {
    const onlineUsers = Array.from(this.connectedUsers.values()).map(conn => ({
      userId: conn.user._id,
      firstName: conn.user.firstName,
      lastName: conn.user.lastName,
      avatar: conn.user.avatar,
      lastSeen: conn.lastSeen,
    }));

    socket.emit('online_users', { users: onlineUsers });
  }

  handleDisconnection(socket) {
    const userId = this.userSockets.get(socket.id);
    
    if (userId) {
      this.connectedUsers.delete(userId);
      this.userSockets.delete(socket.id);
      
      // Broadcast user offline status
      this.broadcastUserStatus(userId, 'offline');
      
      logger.info(`User disconnected: ${socket.user?.email || userId} (${socket.id})`);
    }
  }

  broadcastUserStatus(userId, status) {
    // Get user's conversations and broadcast status to participants
    Conversation.find({ participants: userId })
      .then(conversations => {
        conversations.forEach(conv => {
          this.io.to(`conversation:${conv._id}`).emit('user_status_changed', {
            userId,
            status,
            timestamp: new Date(),
          });
        });
      })
      .catch(error => {
        logger.error('Error broadcasting user status:', error);
      });
  }

  async sendNotificationsToOfflineUsers(conversation, message) {
    try {
      const offlineParticipants = conversation.participants.filter(
        participantId => !this.connectedUsers.has(participantId.toString())
      );

      if (offlineParticipants.length > 0) {
        // Here you would integrate with your notification service
        // For now, just log the notification
        logger.info(`Sending notifications to ${offlineParticipants.length} offline users for message ${message._id}`);
      }
    } catch (error) {
      logger.error('Error sending notifications to offline users:', error);
    }
  }

  // Utility methods
  isUserOnline(userId) {
    return this.connectedUsers.has(userId.toString());
  }

  getOnlineUsersCount() {
    return this.connectedUsers.size;
  }

  emitToUser(userId, event, data) {
    const connection = this.connectedUsers.get(userId.toString());
    if (connection) {
      this.io.to(connection.socketId).emit(event, data);
      return true;
    }
    return false;
  }

  emitToConversation(conversationId, event, data) {
    this.io.to(`conversation:${conversationId}`).emit(event, data);
  }

  // Send system message to conversation
  async sendSystemMessage(conversationId, type, content) {
    try {
      const message = await Message.createSystemMessage(conversationId, type, content);
      
      this.io.to(`conversation:${conversationId}`).emit('new_message', {
        message: message.toObject(),
        conversationId,
      });

      return message;
    } catch (error) {
      logger.error('Error sending system message:', error);
      throw error;
    }
  }
}

export default ChatSocket;
