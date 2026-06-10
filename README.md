# 🚀 express-create-backend

### Scaffold a Clean, Minimal, and Beginner-Friendly Express.js + MongoDB Backend Starter in Seconds ⚡

[![NPM Version](https://img.shields.io/npm/v/express-create-backend.svg)](https://www.npmjs.com/package/express-create-backend)
[![NPM Downloads](https://img.shields.io/npm/dm/express-create-backend.svg)](https://www.npmjs.com/package/express-create-backend)
[![GitHub Stars](https://img.shields.io/github/stars/ankesh4209/express-create-backend.svg)](https://github.com/ankesh4209/express-create-backend)

`npx express-create-backend my-app`

Fast • Secure • No Hidden Abstractions • Developer-Friendly • Ready to Hack

---

## ⚡ Why express-create-backend?

`express-create-backend` is an optimized CLI generator designed to scaffold a clean, beginner-friendly **Express.js backend starter** with MongoDB and JWT authentication. Unlike other generators, it avoids enterprise over-engineering, hidden middleware wrappers (`asyncHandler`), and complex design patterns. It uses only standard **async/await**, **try/catch** blocks, and explicit Node.js core patterns that any developer can understand in under 5 minutes.

---

## ✨ Features

- **Clean MVC Architecture**: Simplified structure with Models, Routes, and Controllers.
- **JWT Authentication**: Explicit registration, login, and protected profile endpoint.
- **MongoDB + Mongoose Setup**: Quick database integration out of the box.
- **Manual Validations**: Easy-to-understand string and type verification without heavy external libraries.
- **Lightweight Request Logging**: Console-based request/response logger tracking routes and latency.
- **Socket.io Built-in**: Ready-to-go real-time WebSocket communication setup.
- **Security Essentials**: Configured with Helmet and CORS headers.
- **Nodemon Hot Reload**: Pre-configured scripts for local development.

---

## 📁 Scaffolded Project Structure

The generated application follows a clean, single-responsibility folder layout with zero unused code:

```text
my-backend-app/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── env.js              # Environment variables loader & validation
├── controllers/
│   ├── health.controller.js # Health check & system status controller
│   └── user.controller.js   # User registration, login, and profile controllers
├── middlewares/
│   └── logger.middleware.js # Standard console request/response logger
├── models/
│   └── user.model.js        # User model definition
├── routes/
│   ├── health.route.js      # Health endpoints
│   └── user.route.js        # Authentication endpoints
├── utils/
│   ├── auth.util.js         # Inline user authentication helper
│   └── jwt.util.js          # JWT sign & verify utility functions
├── .env                     # Local environment variables configuration
├── package.json             # Core scripts and dependencies
└── server.js                # App entry point & Socket.io server configuration
```

---

## 🚀 Quick Start & Installation

### 1. Scaffold Your Project (NPX Recommended)

Create your new Express backend project directly without installing the CLI globally:

```bash
npx express-create-backend my-backend-app
```

### 2. Configure Environment

Enter the project directory and check your `.env` file (the CLI generates a secure `JWT_SECRET` key for you automatically):

```bash
cd my-backend-app
```

Verify your environment configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/localdb
JWT_SECRET=your_secure_hex_key
NODE_ENV=development
```

### 3. Start Developing

Start the hot-reloading development server:

```bash
npm run dev
```

The server runs on [http://localhost:5000](http://localhost:5000).

---

## 🔑 REST API Endpoints

All JSON endpoints return a standardized success or error schema:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Verify server is running | No |
| **GET** | `/api/health` | Retrieve system & DB health status | No |
| **POST** | `/api/users/register` | Register a new user | No |
| **POST** | `/api/users/login` | Log in existing user and return token | No |
| **GET** | `/api/users/me` | Fetch user profile data | **Yes** (Bearer Token) |

### JSON Schema Formats

**Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "Alex",
      "email": "alex@example.com",
      "createdAt": "2026-06-10T14:00:00.000Z",
      "updatedAt": "2026-06-10T14:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (`400/401/404/500`)**:
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## 🔌 Socket.io Real-Time Support

Socket.io is configured out of the box in `server.js`. Test connections or listen/broadcast messages with ease:

```javascript
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("message", (msg) => {
    io.emit("message", msg); // Broadcast message to all clients
  });
});
```

---

## 📦 Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Security**: Helmet & CORS
- **Real-Time**: Socket.io
- **Auth**: Jsonwebtoken & Bcryptjs

---

## ⭐ Support & Contributions

If this boilerplate generator saved you time, please give it a ⭐ on [GitHub](https://github.com/ankesh4209/express-create-backend)! 

Contributions, bug reports, and suggestions are always welcome. Feel free to open a Pull Request.

Happy coding! 🚀
