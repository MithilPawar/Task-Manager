# Task Manager (MERN)

A full-stack task management web app built with React, Vite, Node.js, Express, MongoDB, and JWT cookie-based authentication.

## Highlights

- User registration and login
- Protected routes and auth persistence
- Create, read, update, and delete tasks
- Task status management (`Pending`, `In Progress`, `Completed`)
- Clean split between client and server codebases

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express 5, MongoDB + Mongoose, JWT, Cookie Parser

## Project Structure

- `client/` React app
- `server/` Express API + MongoDB models/controllers/routes

## API Endpoints

### Auth (`/api/v1/users`)
- `POST /register`
- `POST /login`
- `POST /logout` (protected)
- `POST /refresh-tokens`
- `GET /check-user` (protected)

### Tasks (`/api/v1/tasks`)
- `POST /` (protected)
- `GET /` (protected)
- `GET /:taskId` (protected)
- `PUT /:taskId` (protected)
- `DELETE /:taskId` (protected)

## Environment Variables

### Server (`server/.env`)
Use `server/.env.example` as template.

Required:

- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `ACCESS_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRY`

### Client (`client/.env`)
Use `client/.env.example` as template.

Required:

- `VITE_API_BASE_URL` (example: `http://localhost:8000/api/v1`)

## Local Setup

### 1) Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2) Configure environment

- Copy `client/.env.example` to `client/.env`
- Copy `server/.env.example` to `server/.env`
- Fill in valid MongoDB and JWT values

### 3) Run app

In one terminal:

```bash
cd server
npm run dev
```

In a second terminal:

```bash
cd client
npm run dev
```

Client: `http://localhost:5173`

## Quality Checks

Client:

```bash
cd client
npm run lint
npm run build
```

Server:

```bash
cd server
npm run test
```

## Portfolio Checklist

Before sharing this project publicly:

- Add 3–5 screenshots (login, register, dashboard, create/edit task)
- Add a short deployed-demo link (if deployed)
- Ensure `.env` files are not committed
- Confirm `MONGO_URI` points to a valid MongoDB cluster

---

If you use this project in your portfolio, include a short note on what you improved (auth flow, task authorization checks, env setup, and lint/build quality).
