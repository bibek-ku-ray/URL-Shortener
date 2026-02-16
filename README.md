# URL Shortener

A full-stack URL shortening service with user authentication and URL management capabilities.

## Overview

This application allows users to create shortened URLs, manage them with full CRUD operations, and track their links. Built with Express.js backend and Next.js frontend, featuring JWT authentication and PostgreSQL database.

## Technology Stack

### Backend

- Node.js with Express.js
- PostgreSQL database
- Drizzle ORM
- JWT authentication
- Zod validation
- Docker for database containerization

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React Hooks
- Zustand, Axios

## System Architecture

![System Architectre](./diagrams/System%20Architecture.png)

## Database Schema

![Database Shema](./diagrams/Database%20Schema.png)

## Authentication Flow

![Auth flow](./diagrams/Authentication%20Flow.png)

## URL Management Flow

![URL management flow](./diagrams/URL%20Management%20Flow1.png)  
![URL management flow](./diagrams/URL%20Management%20Flow2.png)

## API Endpoints

### Authentication

- `POST /user/signup` - Register new user
- `POST /user/login` - Login and receive JWT token

### URL Management (Protected)

- `POST /shorten` - Create shortened URL
- `GET /codes` - List user's URLs
- `PATCH /:id` - Update URL
- `DELETE /:id` - Delete URL

### Public

- `GET /:shortCode` - Redirect to target URL

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (via Docker)
- pnpm package manager

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start PostgreSQL with Docker:

```bash
docker-compose up -d
```

4. Setup database:

```bash
pnpm db:push
```

5. Start development server:

```bash
pnpm run dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. Start development server:

```bash
pnpm run dev
```

Frontend runs on `http://localhost:3001`

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://admin:password@localhost:5432/url_shortener
PORT=3000
FRONTEND_URL=http://localhost:3001
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Features

### User Management

- User registration with validation
- Secure password hashing with salt
- JWT-based authentication
- Token verification middleware

### URL Operations

- Create short URLs with custom or auto-generated codes
- List all URLs for authenticated user
- Update existing URLs (target URL or short code)
- Delete URLs with ownership verification
- Public redirect without authentication

### Security

- Password hashing with individual salts
- JWT token authentication
- User-based authorization
- Input validation with Zod
- CORS configuration
- SQL injection prevention via ORM

## API Response Examples

### Success Response

```json
{
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "message": "User created successfully."
}
```

### Error Response

```json
{
  "error": "User already exist with email: user@example.com"
}
```

### Validation Error

```json
{
  "error": {
    "errors": [],
    "properties": {
      "email": { "errors": ["Invalid email"] }
    }
  }
}
```

## HTTP Status Codes

- `200 OK` - Successful GET, PATCH, DELETE
- `201 Created` - Successful POST
- `302 Found` - Redirect
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource

## Development

### Backend Scripts

```bash
pnpm run dev        # Start development server
pnpm db:push        # Push schema changes
pnpm db:studio      # Open Drizzle Studio
```

### Frontend Scripts

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run start      # Start production server
pnpm run lint       # Run ESLint
```

## Testing

### Test Backend with curl

Health check:

```bash
curl http://localhost:3000
```

User signup:

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"firstname":"John","lastname":"Doe","email":"john@example.com","password":"password123"}'
```

User login:

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Create short URL:

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"mycode"}'
```
