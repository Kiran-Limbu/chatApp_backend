# Mero Chat Backend

A real-time chat backend built with Express.js, MongoDB, Passport.js, and Socket.IO. It provides Google OAuth authentication, user management, message storage, and live group chat events for the frontend client.

## Project Overview

This backend powers the Mero Chat app by:

- authenticating users with Google OAuth
- creating and managing user records in MongoDB
- issuing JWT-based auth cookies for session handling
- exposing REST APIs for user and message operations
- enabling real-time communication over Socket.IO

## Requirements

Before starting, make sure you have:

- Node.js 18+ recommended
- npm or Bun installed
- MongoDB running locally or a MongoDB connection string
- Google OAuth credentials from Google Cloud Console

## Installation

1. Open the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

If you prefer Bun:

```bash
bun install
```

## Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=4000
DB_LOACL_URL=******
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
JWT_SECRET=your_jwt_secret
```

### Variable explanations

- `PORT`: Port used by the API server
- `DB_LOACL_URL`: MongoDB connection string
- `CLIENT_ID`: Google OAuth client ID
- `CLIENT_SECRET`: Google OAuth client secret
- `CLIENT_URL`: Frontend base URL
- `GOOGLE_CALLBACK_URL`: Redirect URL for Google OAuth callback
- `JWT_SECRET`: Secret used to sign JWT/auth cookies

## Running the Server

Development mode:

```bash
npm run dev
```

Or start the app directly:

```bash
node index.ts
```

The server starts on the port defined by `PORT` (default: `4000`).

## Project Structure

```bash
backend/
├── config/
│   ├── db/
│   │   └── db.ts
│   └── passport.ts
├── controller/
├── middlewares/
├── model/
│   ├── message.model.ts
│   └── user.model.ts
├── route/
│   ├── auth.route.ts
│   ├── msg.route.ts
│   └── user.route.ts
├── utils/
│   └── createToken.ts
├── .env
├── index.ts
├── package.json
├── README.md
├── tsconfig.json
└── .gitignore
```

## Authentication Flow

The backend uses Passport.js with the Google OAuth strategy.

- User hits `/api/auth/google`
- Google authenticates the user
- Backend redirects to `/api/auth/google/callback`
- User data is stored or retrieved in MongoDB
- A JWT session cookie is created and the user is redirected to the frontend

## API Endpoints

### Auth Routes

- `GET /api/auth/google` — initiate Google login
- `GET /api/auth/google/callback` — handle Google callback
- `GET /api/auth/login/success` — success response for auth flow
- `GET /api/auth/login/failed` — failure response

### User Routes

- `GET /api/user` or relevant user endpoints as defined in the app

### Message Routes

- `GET /api/msg` and message-related endpoints for fetching/saving chat messages

## Socket.IO Events

The backend listens for real-time chat events such as:

- `joinRoom`
- `sendMsg`
- `typingNotify`
- `stopTypingNotify`

Messages are saved to MongoDB and broadcast to the room participants.

## Notes

- The app uses `cookie-session` and cookie-based authentication
- CORS is configured for the local frontend URL and production frontend URL
- MongoDB must be reachable before the server starts successfully

## Troubleshooting

### MongoDB connection issue

Check your `DB_LOACL_URL` and ensure MongoDB is running.

### Google login fails

Verify the following:

- `CLIENT_ID` and `CLIENT_SECRET` are correct
- `GOOGLE_CALLBACK_URL` matches the backend callback URL exactly
- OAuth redirect URIs are enabled in Google Cloud Console

### CORS error

Make sure `CLIENT_URL` in `.env` matches the frontend origin used by the app.

---

## Quick Start

```bash
cd backend
npm install
npm run dev
```

Then ensure your MongoDB and frontend are running before testing the chat flow.
