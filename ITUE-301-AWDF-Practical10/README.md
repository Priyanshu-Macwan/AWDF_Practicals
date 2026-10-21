# Task Manager API

Full-stack task management application built with React, Node.js, Express,
MongoDB, and JWT authentication.

## Project structure

- `app.js` - Express server and MongoDB startup
- `models/` - Mongoose models for users and tasks
- `routes/` - authentication and task CRUD routes
- `middleware/` - JWT authentication and task validation
- `task-manager-frontend/` - React frontend
- `postman/` - Postman collections and environments

## Requirements

- Node.js 18 or newer
- MongoDB connection
- npm

## Backend setup

From the repository root:

```bash
npm install
```

Copy `.env.example` to `.env` in the repository root, then set your MongoDB connection string and a private JWT secret:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
```

Never commit `.env`; it is ignored by Git. The committed `.env.example` contains placeholders only.

Start the backend:

```bash
node app.js
```

The backend runs at `http://localhost:5000`.

## Frontend setup

Open a second terminal:

```bash
cd task-manager-frontend
npm install
npm run dev
```

The frontend normally runs at `http://localhost:5173`.

## API endpoints

### Authentication

- `POST /api/auth/register` - register a user
- `POST /api/auth/login` - log in and receive a JWT
- `GET /api/auth/me` - get the authenticated user's details

### Protected task routes

Send the login token in this header:

```text
Authorization: Bearer <token>
```

- `GET /api/tasks` - list the logged-in user's tasks
- `POST /api/tasks` - create a task
- `PUT /api/tasks/:id` - update a task
- `DELETE /api/tasks/:id` - delete a task

## Full-stack flow

1. Register a user from the React interface.
2. Log in to receive a JWT token.
3. Create, view, update, and delete tasks.
4. Refresh the browser to confirm that tasks remain saved in MongoDB.
5. Use the Postman files in `postman/` to verify the backend independently.

## Event-driven task notifications

`events.js` defines a custom `TaskEventEmitter` class using Node.js's built-in `node:events` module. After MongoDB successfully creates a task, `POST /api/tasks` sends the `201` response and emits `task-created` with the task title, creation timestamp, and assigned user ID. The asynchronous listener resolves the user's email and logs the notification after a two-second demonstration delay.

The API terminal records ISO timestamps for the response finishing and the later notification. The notification line includes the task title, task creation timestamp, and assigned user, showing the API response completes while the event listener is still pending. The frontend also points to the API terminal after a successful task creation.

Expected log order (timestamps and user vary by run):

```text
[...Z] [Listener] task-created handler started: {"title":"Prepare report","emittedAt":"..."}
[...Z] [API] HTTP response finished: {"method":"POST","path":"/api/tasks","title":"Prepare report"}
[...Z] [Notification] Background notification logged: {"title":"Prepare report","taskTimestamp":"...","assignedUser":"student@example.com"}
```

## Security

The `.env` file is ignored by Git and must not be committed. The JWT secret
and MongoDB connection string should remain local.
