import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import 'express-async-errors';

// Import configurations and utilities
import { config } from './config/config.js';
import database from './config/database.js';
import logger from './utils/logger.js';

// Import middleware
import {
  generalRateLimit,
  securityHeaders,
  corsOptions,
  securityLogger,
  preventTimingAttacks,
  sanitizeInput,
  globalErrorHandler,
  handleUnhandledRoutes,
} from './middleware/index.js';

// Import routes
import {
  authRoutes,
  userRoutes,
  itemRoutes,
  chatRoutes,
} from './routes/index.js';

// Import Socket.io chat system
import ChatSocket from './socket/chatSocket.js';

// Legacy demo route for compatibility
import { handleDemo } from './routes/demo.js';

class Server {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.chatSocket = null;
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // Trust proxy for accurate IP addresses
    this.app.set('trust proxy', 1);

    // Security middleware
    this.app.use(securityHeaders);
    this.app.use(cors(corsOptions));
    this.app.use(securityLogger);
    this.app.use(preventTimingAttacks);
    this.app.use(sanitizeInput);

    // Rate limiting
    this.app.use(generalRateLimit);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression middleware
    this.app.use(compression());

    // Session middleware
    this.app.use(session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: config.mongodbUri,
        touchAfter: 24 * 3600, // lazy session update
      }),
      cookie: {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }));

    // Logging middleware
    if (config.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined', { stream: logger.stream }));
    }

    // Static files middleware
    this.app.use('/uploads', express.static('uploads'));
    
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
        database: database.isConnected() ? 'connected' : 'disconnected',
        onlineUsers: this.chatSocket ? this.chatSocket.getOnlineUsersCount() : 0,
      });
    });
  }

  setupRoutes() {
    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/items', itemRoutes);
    this.app.use('/api/chat', chatRoutes);

    // Legacy routes for compatibility
    this.app.get('/api/ping', (req, res) => {
      res.json({
        message: 'pong',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
      });
    });
    
    this.app.get('/api/demo', handleDemo);

    // API documentation endpoint
    this.app.get('/api', (req, res) => {
      res.json({
        name: 'CampusBazaar API',
        version: '2.0.0',
        description: 'Industry-ready backend API for student marketplace',
        documentation: '/api/docs',
        endpoints: {
          auth: '/api/auth',
          users: '/api/users',
          items: '/api/items',
          chat: '/api/chat',
        },
        features: {
          authentication: 'JWT with refresh tokens',
          realTimeChat: 'Socket.io',
          fileUpload: 'Multer with validation',
          database: 'MongoDB with Mongoose',
          security: 'Helmet, CORS, Rate limiting',
          validation: 'Express-validator',
          logging: 'Winston',
        },
      });
    });

    // Serve frontend in production
    if (config.nodeEnv === 'production') {
      this.app.use(express.static('dist/spa'));
      
      // Handle React Router (client-side routing)
      this.app.get('*', (req, res, next) => {
        // Skip API routes
        if (req.path.startsWith('/api')) {
          return next();
        }
        res.sendFile(path.join(process.cwd(), 'dist/spa/index.html'));
      });
    }
  }

  setupErrorHandling() {
    // Handle unhandled routes
    this.app.use(handleUnhandledRoutes);

    // Global error handler
    this.app.use(globalErrorHandler);
  }

  async start() {
    try {
      // Connect to database
      await database.connect();

      // Initialize Socket.io chat system
      if (config.features.enableChat) {
        this.chatSocket = new ChatSocket(this.server);
        logger.info('Real-time chat system enabled');
      }

      // Start server
      this.server.listen(config.port, () => {
        logger.info(`🚀 CampusBazaar server running on port ${config.port}`);
        logger.info(`📱 Environment: ${config.nodeEnv}`);
        logger.info(`💾 Database: ${database.isConnected() ? 'Connected' : 'Disconnected'}`);
        logger.info(`💬 Chat: ${config.features.enableChat ? 'Enabled' : 'Disabled'}`);
        logger.info(`📁 File Upload: ${config.features.enableFileUpload ? 'Enabled' : 'Disabled'}`);
        
        if (config.nodeEnv === 'development') {
          logger.info(`🌐 API available at: http://localhost:${config.port}/api`);
          logger.info(`💻 Frontend available at: http://localhost:${config.port}`);
        }
      });

      // Graceful shutdown handlers
      process.on('SIGTERM', () => this.shutdown('SIGTERM'));
      process.on('SIGINT', () => this.shutdown('SIGINT'));

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  async shutdown(signal) {
    logger.info(`${signal} received. Starting graceful shutdown...`);

    try {
      // Close server
      await new Promise((resolve) => {
        this.server.close(resolve);
      });

      // Disconnect from database
      await database.disconnect();

      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  }

  // Getter for the app instance (for testing)
  getApp() {
    return this.app;
  }

  // Getter for the chat socket instance
  getChatSocket() {
    return this.chatSocket;
  }
}

// Create and start server
const server = new Server();
server.start();

export default server;
