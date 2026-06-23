# Social Media Platform - Project Context

## Project Summary

A full-stack social media platform built using the MERN stack.

Users can:
- Create accounts
- Authenticate using JWT
- Create posts with images
- Like and unlike posts
- Comment on posts
- Follow and unfollow users
- View profiles
- View their own posts

The project follows MVC architecture and uses MongoDB as the database.

---

# Developer Information

Developer: Anshul Jaswal

Goal:
- Learn production-level MERN development
- Strengthen backend development skills
- Build a portfolio-worthy project
- Prepare for Junior Software Engineer / MERN Stack Developer roles

---

# Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- multer

## Third Party Services

- ImageKit (image storage)
- Postman (API testing)

---

# Project Architecture

Backend follows MVC architecture.

backend/

controllers/
models/
routes/
middleware/
config/
utils/

Frontend follows component-based architecture.

frontend/

components/
pages/
redux/
services/
hooks/

---

# Database Models

## User Model

Fields:

- username
- email
- password
- followers
- following
- profilePicture
- bio
- createdAt
- updatedAt

Example:

{
  username: String,
  email: String,
  password: String,
  followers: [ObjectId],
  following: [ObjectId]
}

---

## Post Model

Fields:

- image
- imageFileId
- caption
- user
- likes
- comments
- createdAt

Example:

{
  image: String,
  imageFileId: String,
  caption: String,
  user: ObjectId,
  likes: [ObjectId]
}

---

## Comment Model

Fields:

- text
- user
- post
- createdAt

Example:

{
  text: String,
  user: ObjectId,
  post: ObjectId
}

---

# Authentication System

Authentication method:
JWT

Workflow:

1. User registers
2. Password hashed using bcrypt
3. JWT token generated
4. Token returned to frontend
5. Frontend stores token
6. Protected routes require Authorization header

Format:

Authorization: Bearer <token>

Middleware:

protect()

Responsibilities:
- Verify token
- Extract user id
- Attach user to request

---

# API Endpoints

## Authentication

POST /api/auth/signup

POST /api/auth/login

GET /api/auth/me

---

## Posts

POST /api/posts

GET /api/posts

GET /api/posts/:id

PUT /api/posts/:id

DELETE /api/posts/:id

---

## Likes

POST /api/posts/:id/like

Behavior:
- If already liked -> unlike
- Else -> like

---

## Comments

POST /api/posts/:id/comments

GET /api/posts/:id/comments

DELETE /api/comments/:id

---

## Users

GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id

---

## Follow System

POST /api/users/:id/follow

POST /api/users/:id/unfollow

---

# Features Completed

✅ User Registration

✅ User Login

✅ JWT Authentication

✅ Password Hashing

✅ Protected Routes

✅ User CRUD

✅ Post CRUD

✅ Image Upload

✅ Like / Unlike Feature

✅ Comment Creation

✅ Current User Endpoint

✅ Follow / Unfollow System

---

# Frontend Status

Implemented:
- Authentication Pages
- Redux Setup

Pending:
- Feed Page
- Profile Page
- Post Creation Modal
- Comments UI
- Followers UI

---

# Image Handling

Current Storage Provider:
ImageKit

Workflow:

1. User selects image
2. multer processes upload
3. Image uploaded to ImageKit
4. URL stored in MongoDB
5. URL returned to frontend

---

# Known Issues

1. No pagination

2. Feed query optimization needed

3. No notifications

4. No real-time updates

5. No chat system

---

# Future Features

Priority 1

- Feed UI
- Profile UI
- Search Users
- Better Error Handling

Priority 2

- Notifications
- Bookmarks
- Saved Posts
- Story Feature

Priority 3

- Real-time Chat
- Socket.io Integration
- Typing Indicators

---

# Deployment Plan

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

Images:
- ImageKit

---

# Coding Standards

Backend:
- Controllers contain business logic
- Routes only define endpoints
- Models contain schema definitions
- Middleware handles authentication and validation

Frontend:
- Reusable components
- Redux for global state
- Axios for API requests

---

# Next Development Tasks

1. Build Feed Page

2. Connect Feed API

3. Display Posts

4. Implement Likes UI

5. Implement Comments UI

6. Build User Profile Page

7. Add Search Feature

---

# Last Updated

June 2026