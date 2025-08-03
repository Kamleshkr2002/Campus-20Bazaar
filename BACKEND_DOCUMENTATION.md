# CampusBazaar Backend Documentation

## 🏗️ Architecture Overview

This is a comprehensive, industry-ready Node.js backend built using modern web development practices and technologies. The architecture follows RESTful API principles with real-time capabilities through WebSockets.

## 📚 Technology Stack & Reasoning

### **Core Framework: Express.js**
**What**: Fast, minimalist web framework for Node.js
**Why Chosen**:
- ✅ Mature and stable (most popular Node.js framework)
- ✅ Large ecosystem of middleware
- ✅ Excellent performance and flexibility
- ✅ Easy to scale and maintain
- ✅ Strong community support

**Alternatives Considered**:
- **Fastify**: Faster but smaller ecosystem
- **Koa.js**: More modern but less adoption
- **NestJS**: Too opinionated for this project scope

### **Database: MongoDB + Mongoose**
**What**: NoSQL document database with ODM
**Why Chosen**:
- ✅ Flexible schema perfect for marketplace data
- ✅ Excellent performance for read-heavy operations
- ✅ JSON-like documents match JavaScript objects
- ✅ Horizontal scaling capabilities
- ✅ Rich querying with aggregation pipeline
- ✅ Built-in replication and sharding

**Alternatives Considered**:
- **PostgreSQL**: Great but overkill for this use case
- **MySQL**: Relational constraints would limit flexibility
- **Redis**: Good for caching but not primary database

**Mongoose Benefits**:
- Schema validation and type casting
- Built-in middleware (pre/post hooks)
- Population (joins) for references
- Query building and validation

### **Authentication: JWT (JSON Web Tokens)**
**What**: Stateless authentication tokens
**Why Chosen**:
- ✅ Stateless (no server-side sessions)
- ✅ Scalable across multiple servers
- ✅ Contains user info payload
- ✅ Industry standard for APIs
- ✅ Works great with frontend frameworks

**Security Implementation**:
```javascript
// Dual token system for security
accessToken: '15-minute expiry'  // Short-lived for API calls
refreshToken: '30-day expiry'    // Long-lived for token renewal
```

**Alternatives Considered**:
- **Sessions**: Server-side storage, harder to scale
- **OAuth**: Too complex for internal authentication
- **Basic Auth**: Not secure enough

### **Real-time Communication: Socket.io**
**What**: WebSocket library for real-time communication
**Why Chosen**:
- ✅ Automatic fallback to polling if WebSocket fails
- ✅ Room-based messaging perfect for chat
- ✅ Built-in authentication middleware
- ✅ Excellent browser compatibility
- ✅ Event-based architecture

**Chat Architecture**:
```javascript
// Room structure
user:${userId}           // Personal notifications
conversation:${convId}   // Chat conversations
```

**Alternatives Considered**:
- **Native WebSocket**: Too low-level
- **Server-Sent Events**: One-way communication only
- **WebRTC**: Overkill for text messaging

### **File Upload: Multer**
**What**: Middleware for handling multipart/form-data
**Why Chosen**:
- ✅ Integrates seamlessly with Express
- ✅ Memory and disk storage options
- ✅ File filtering and size limits
- ✅ Multiple file upload support
- ✅ Security features built-in

**Security Features**:
- File type validation
- Size limits (5MB default)
- Filename sanitization
- Upload path restrictions

**Alternatives Considered**:
- **Busboy**: Lower level, more complex
- **Formidable**: Less integration with Express

### **Validation: Express-Validator**
**What**: Middleware for request validation
**Why Chosen**:
- ✅ Built on validator.js (battle-tested)
- ✅ Express-native integration
- ✅ Comprehensive validation rules
- ✅ Custom validators support
- ✅ Automatic error handling

**Example Validation**:
```javascript
validateUserRegistration: [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  handleValidationErrors
]
```

**Alternatives Considered**:
- **Joi**: Good but adds extra dependency
- **Yup**: More for frontend validation
- **Custom validation**: Time-consuming to build

### **Security: Multiple Layers**

#### **Rate Limiting: express-rate-limit**
```javascript
authRateLimit: 5 attempts per 15 minutes
generalRateLimit: 100 requests per 15 minutes
messageRateLimit: 30 messages per minute
```

#### **Security Headers: Helmet**
- Content Security Policy
- DNS Prefetch Control
- X-Frame-Options
- X-Content-Type-Options
- And 10+ other security headers

#### **CORS: cors package**
```javascript
// Configured for development/production
origin: specific domains only
credentials: true for cookies
methods: GET, POST, PUT, DELETE, PATCH
```

#### **Input Sanitization: Custom Middleware**
- XSS prevention
- SQL injection prevention
- HTML tag stripping
- Script tag removal

### **Logging: Winston**
**What**: Professional logging library
**Why Chosen**:
- ✅ Multiple log levels (error, warn, info, debug)
- ✅ Multiple transports (file, console, database)
- ✅ Structured logging with metadata
- ✅ Log rotation and archiving
- ✅ Production-ready performance

**Log Structure**:
```javascript
{
  timestamp: '2024-01-20 10:30:45',
  level: 'info',
  message: 'User login successful',
  service: 'campusbazaar-api',
  userId: '507f1f77bcf86cd799439011',
  ip: '192.168.1.1'
}
```

**Alternatives Considered**:
- **Morgan**: HTTP-only, not comprehensive
- **Bunyan**: Good but less popular
- **Console.log**: Not suitable for production

### **Password Hashing: bcryptjs**
**What**: Password hashing library
**Why Chosen**:
- ✅ Industry standard for password hashing
- ✅ Configurable salt rounds (12 rounds = ~250ms)
- ✅ Automatic salt generation
- ✅ Time-tested security

**Security Config**:
```javascript
BCRYPT_SALT_ROUNDS=12  // ~250ms per hash
// Higher = more secure but slower
// 12 rounds is current industry standard
```

### **HTTP Client Logging: Morgan**
**What**: HTTP request logger middleware
**Why Chosen**:
- ✅ Standard for Express applications
- ✅ Configurable output formats
- ✅ Integration with other loggers
- ✅ Performance metrics included

## 🗄️ Database Schema Design

### **User Model Features**:
```javascript
// Authentication fields
email, password, refreshTokens[]

// Profile information
firstName, lastName, bio, avatar, university, studentId

// Verification status
isEmailVerified, isStudentVerified, isActive

// Statistics
stats: { itemsSold, itemsBought, rating, totalRatings }

// Preferences
preferences: { emailNotifications, chatNotifications }
```

### **Item Model Features**:
```javascript
// Basic information
title, description, price, originalPrice, category, condition

// Rich metadata
images[], specifications{}, tags[], brand, model

// Marketplace features
isNegotiable, deliveryOptions[], paymentMethods[]

// Analytics
views, favorites, reportCount

// Status management
status: 'active' | 'sold' | 'reserved' | 'inactive'
moderationStatus: 'approved' | 'pending' | 'rejected'
```

### **Chat System Models**:

#### **Conversation Model**:
```javascript
participants[]     // User references
item              // Item being discussed
lastMessage       // Quick access to latest message
readStatus[]      // Unread counts per user
metadata: {
  isBlocked,      // Conversation blocking
  blockedBy,      // Who blocked it
  isMuted[]       // Muting preferences
}
```

#### **Message Model**:
```javascript
content           // Message text
type: 'text' | 'image' | 'file' | 'offer' | 'system'
attachments[]     // File uploads
offer: {          // Price negotiation
  amount, status, expiresAt
}
reactions[]       // Message reactions
replyTo          // Reply threading
editHistory[]    // Message editing
```

## 🔄 API Architecture

### **RESTful Design Principles**:
```
GET    /api/items          # Get all items
POST   /api/items          # Create new item
GET    /api/items/:id      # Get specific item
PATCH  /api/items/:id      # Update item
DELETE /api/items/:id      # Delete item
```

### **Response Format Standard**:
```javascript
// Success Response
{
  success: true,
  data: { /* response data */ },
  pagination?: { page, limit, total, pages }
}

// Error Response
{
  success: false,
  message: "Error description",
  errors?: [{ field, message, value }]
}
```

### **Authentication Flow**:
```
1. POST /api/auth/register → { accessToken, refreshToken }
2. Use accessToken in Authorization: Bearer <token>
3. When accessToken expires → POST /api/auth/refresh
4. Logout → POST /api/auth/logout (invalidates refresh token)
```

## 🔒 Security Implementation

### **Input Validation Layers**:
1. **Express-validator**: Schema validation
2. **Mongoose**: Database-level validation
3. **Custom sanitization**: XSS/injection prevention
4. **File validation**: Type, size, content checks

### **Rate Limiting Strategy**:
```javascript
// Different limits for different endpoints
auth endpoints: 5/15min    // Prevent brute force
general API: 100/15min     // Normal usage
messages: 30/1min          // Prevent spam
password reset: 3/1hour    # Prevent abuse
```

### **CORS Configuration**:
```javascript
// Development: Allow localhost
origin: ['http://localhost:3000', 'http://localhost:8080']

// Production: Specific domains only
origin: ['https://campusbazaar.edu']
```

## 📁 Project Structure

```
server/
├── config/          # Configuration files
│   ├── config.js    # Environment variables
│   └── database.js  # MongoDB connection
├── middleware/      # Express middleware
│   ├── auth.js      # Authentication
│   ├── validation.js # Request validation
│   ├── security.js  # Security headers/rate limiting
│   ├── upload.js    # File upload handling
│   └── errorHandler.js # Error handling
├── models/          # Database models
│   ├── User.js      # User schema
│   ├── Item.js      # Item schema
│   ├── Conversation.js # Chat conversation
│   ├── Message.js   # Chat message
│   └── index.js     # Model exports
├── routes/          # API routes
│   ├── auth.js      # Authentication endpoints
│   ├── users.js     # User management
│   ├── items.js     # Item management
│   ├── chat.js      # Chat endpoints
│   └── index.js     # Route exports
├── socket/          # Real-time features
│   └── chatSocket.js # Socket.io implementation
├── utils/           # Utility functions
│   └── logger.js    # Winston logger setup
└── index.ts         # Main server file
```

## 🚀 Performance Optimizations

### **Database Optimizations**:
```javascript
// Strategic indexing
userSchema.index({ email: 1 });
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ title: 'text', description: 'text' });

// Efficient pagination
.limit(parseInt(limit)).skip(skip)

// Population optimization
.populate('seller', 'firstName lastName avatar') // Only needed fields
```

### **Caching Strategy**:
- MongoDB connection pooling
- Express response compression
- Static file serving with proper headers
- Session storage in MongoDB (not memory)

### **Memory Management**:
- File upload streaming (not buffering in memory)
- Database connection limits
- Request size limits
- Cleanup on process exit

## 📊 Monitoring & Logging

### **Health Check Endpoint**:
```
GET /health
{
  status: 'OK',
  timestamp: '2024-01-20T10:30:45.123Z',
  uptime: 86400,
  environment: 'development',
  database: 'connected',
  onlineUsers: 42
}
```

### **Logging Levels**:
- **ERROR**: Application errors, failed requests
- **WARN**: Security alerts, rate limits exceeded
- **INFO**: User actions, system events
- **DEBUG**: Detailed execution flow (dev only)

### **Log Rotation**:
- Daily log rotation
- Maximum 5 files kept
- 5MB file size limit
- Separate error log file

## 🌍 Environment Configuration

### **Development vs Production**:
```javascript
// Development
NODE_ENV=development
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:8080

// Production
NODE_ENV=production
LOG_LEVEL=info
CORS_ORIGIN=https://campusbazaar.edu
```

### **Feature Flags**:
```javascript
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_PUSH_NOTIFICATIONS=false
ENABLE_FILE_UPLOAD=true
ENABLE_CHAT=true
```

## 🔄 Deployment Considerations

### **Horizontal Scaling**:
- Stateless design (JWT, no server sessions)
- Database connection pooling
- File uploads to external storage (Cloudinary ready)
- Socket.io with Redis adapter (for multiple servers)

### **Security in Production**:
- Environment variables for secrets
- HTTPS enforcement
- Content Security Policy
- Rate limiting per IP
- Input validation and sanitization

## 📖 Learning Resources

### **Essential Reading**:

1. **Express.js Official Docs**: https://expressjs.com/
2. **MongoDB Manual**: https://docs.mongodb.com/
3. **Mongoose Docs**: https://mongoosejs.com/docs/
4. **JWT Introduction**: https://jwt.io/introduction
5. **Socket.io Docs**: https://socket.io/docs/
6. **Node.js Security**: https://nodejs.org/en/docs/guides/security/

### **Advanced Topics**:

1. **RESTful API Design**: https://restfulapi.net/
2. **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices
3. **MongoDB Performance**: https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/
4. **WebSocket vs Server-Sent Events**: https://ably.com/blog/websockets-vs-sse
5. **JWT Security Best Practices**: https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/

### **Books Recommended**:

1. **"Node.js Design Patterns"** by Mario Casciaro
2. **"MongoDB: The Definitive Guide"** by Shannon Bradshaw
3. **"REST API Design Rulebook"** by Mark Masse
4. **"Web Security for Developers"** by Malcolm McDonald

## 🛠️ Getting Started

1. **Install MongoDB**: https://docs.mongodb.com/manual/installation/
2. **Clone and setup**:
   ```bash
   npm install
   cp .env.example .env  # Configure your settings
   npm run dev
   ```
3. **Test API**: Visit http://localhost:8080/api
4. **View logs**: `npm run logs`

## 🤝 Contributing

The codebase follows these principles:
- **Clean Code**: Self-documenting, single responsibility
- **Error Handling**: Comprehensive try-catch with logging
- **Security First**: Input validation, authentication required
- **Performance**: Database indexing, efficient queries
- **Maintainability**: Modular structure, consistent patterns

This architecture is designed to handle thousands of users and scale horizontally as needed. Each technology choice was made based on industry best practices, security requirements, and scalability needs.
