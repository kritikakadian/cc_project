TaskOrbit

Introduction

TaskOrbit is a full-stack task management web application built using the MERN stack. It allows users to create an account, securely log in, and manage their tasks through a simple and responsive interface.

The project is designed with separate frontend and backend applications and is deployed using Vercel and Render.

Flow

The user opens the TaskOrbit frontend.

The user can register a new account or log in with an existing account.

Authentication requests are sent from the React frontend to the Express backend.

The backend validates the user credentials and stores user data in MongoDB.

After successful authentication, the user can access the protected task management area.

Users can create, view, update, and manage their tasks.

Authentication is handled using JWT tokens.

The frontend communicates with the deployed backend API for all required operations.

GitHub Actions automatically checks the project whenever changes are pushed to the repository.

Backend API tests run using Jest and Supertest with MongoDB Memory Server for an isolated test database.

Tech Stack

Frontend

React.js

Vite

React Router

JavaScript

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt

Testing

Jest

Supertest

MongoDB Memory Server

Deployment

Vercel — Frontend

Render — Backend

MongoDB Atlas — Production Database

GitHub Actions — Continuous Integration

Project Structure

cc_project/
├── Backend/
│   ├── src/
│   │   ├── Controllers/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── tests/
│   │   └── auth.test.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .github/
    └── workflows/
        └── ci.yml

API Overview

Authentication

POST /api/auth/register — Register a new user

POST /api/auth/login — Log in an existing user

GET /api/auth/me — Get the authenticated user's information

Tasks

Task-related routes are provided through the backend API under the /api route.

Authentication

TaskOrbit uses JWT-based authentication.

After successful login or registration, the authentication token is used by the frontend when accessing protected backend routes.

Passwords are securely hashed using bcrypt before being stored.

Testing

The backend contains automated API tests using Jest and Supertest.

MongoDB Memory Server provides a temporary MongoDB database during testing, so the automated tests do not depend on the production MongoDB database.

Run backend tests locally:

cd Backend
npm test

Continuous Integration

GitHub Actions is configured to automatically:

Install backend dependencies.

Check backend syntax.

Run backend tests.

Install frontend dependencies.

Build the frontend.

This helps ensure that new changes do not break the application before deployment.

Deployment

Backend

The backend is deployed on Render.

Render configuration:

Root Directory: Backend
Build Command: npm install
Start Command: node server.js

Frontend

The frontend is deployed on Vercel.

Vercel configuration:

Root Directory: Frontend
Build Command: npm run build
Output Directory: dist

The frontend uses an environment variable to communicate with the deployed backend:

VITE_API_URL=https://your-render-backend-url/api

The backend uses:

FRONTEND_URL=https://your-vercel-frontend-url

for CORS configuration.

Environment Variables

Backend

MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=your_database_name
FRONTEND_URL=your_vercel_frontend_url
PORT=3000

Frontend

VITE_API_URL=your_render_backend_url/api

Do not commit real credentials, passwords, or secret keys to GitHub.

Features

User registration

User login

JWT-based authentication

Protected routes

Task management

MongoDB database integration

REST API

Automated backend testing

MongoDB Memory Server for isolated tests

GitHub Actions CI

Vercel frontend deployment

Render backend deployment

Conclusion

TaskOrbit demonstrates a complete full-stack web application workflow, from frontend and backend development to database integration, authentication, automated testing, continuous integration, and cloud deployment.
