# NoteNest

**NoteNest** is a modern, full-stack note-taking web application designed to help users organize their thoughts, tasks, and ideas efficiently. Built with React, Material-UI, Node.js, Express, and PostgreSQL, NoteNest offers a sleek, intuitive interface and secure authentication, making it easy to create, edit, and manage notes from any device.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [API Overview](#api-overview)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- **User Authentication:** Secure registration and login with JWT and hashed passwords.
- **Email Confirmation:** Sends a welcome email upon registration.
- **Create, Edit, Delete Notes:** Full CRUD operations for personal notes.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Modern Design:** Built with React and Material-UI for a clean, professional look.
- **Protected Routes:** Only authenticated users can access their notes.
- **Confirmation Modals:** Prevent accidental deletions.
- **Error Handling:** User-friendly error messages and alerts.
- **Deployment Ready:** Easily deployable to Vercel (frontend) and Render (backend).

---

## Tech Stack

**Frontend:**
- React 19
- Material-UI (MUI)
- Vite
- Axios

**Backend:**
- Node.js
- Express 5
- PostgreSQL (via `pg`)
- JWT for authentication
- bcryptjs for password hashing
- Nodemailer for email notifications
- dotenv for environment management

---

## Project Structure

```
NoteNest/
│
├── backend/
│   ├── config/           # Database and environment configs
│   ├── controllers/      # Business logic (auth, notes)
│   ├── middleware/       # JWT authentication middleware
│   ├── models/           # (Docs for DB models)
│   ├── routes/           # API routes (auth, notes)
│   ├── .env              # Environment variables (not committed)
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/           # Static assets and CSS
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Main pages (Login, Dashboard)
│   │   ├── services/     # API calls
│   │   ├── utils/        # Helper functions
│   │   └── index.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md             # Project documentation
```

---

## Screenshots

> _Add screenshots or GIFs here to showcase the UI and features._

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### Environment Variables

#### Backend (`backend/.env`)

```
LOCAL_DB=postgresql://user:password@localhost:5432/notenest
DATABASE_URL=your_production_database_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> _Never commit your `.env` files. See [`backend/.gitignore`](backend/.gitignore)_

#### Frontend

No environment variables required for local development.

---

### Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure your database:**
   - Create a PostgreSQL database and update `LOCAL_DB` in `.env`.
   - Ensure your `users` and `notes` tables exist with appropriate fields.

3. **Start the backend server:**
   ```sh
   npm start
   ```
   The server runs on port `10000` by default.

---

### Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Deployment

- **Frontend:** Deploy to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- **Backend:** Deploy to [Render](https://render.com/) or any Node.js hosting provider.
- **Proxying API:** The frontend uses a Vercel rewrite ([`.vercel/project.json`](frontend/.vercel/project.json)) to proxy `/api` requests to the backend.

---

## API Overview

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Notes (Protected)

- `GET /api/notes` — Get all notes for the authenticated user
- `POST /api/notes` — Create a new note
- `PUT /api/notes/:id` — Update a note
- `DELETE /api/notes/:id` — Delete a note

> All `/api/notes` routes require an `Authorization: Bearer <token>` header.

---

## Security

- Passwords are hashed with bcryptjs before storage.
- JWT tokens are used for authentication and must be kept secret.
- CORS is configured to allow only trusted frontend origins.
- Sensitive configuration is managed via environment variables.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License

This project is licensed under the ISC License.

---

## Author

**Jeansy Pena**
[LinkedIn](https://www.linkedin.com/in/jeansy-pena/)
[GitHub](https://github.com/vJeansy)

---

_Thank you for using NoteNest!_