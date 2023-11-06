# Sociopedia — Full-Stack Social Media App

Sociopedia is a full-stack social media web application built with the **MERN stack** (MongoDB, Express, React, and Node.js) and **Material UI**. It lets users sign up, upload profile pictures, publish posts with images, like posts from other people, add or remove friends, and toggle between dark and light themes.

---

## What It Does

- **User Accounts**: Create an account with your name, location, occupation, and profile picture. Passwords are encrypted with Bcrypt, and sessions are kept safe with JWT tokens.
- **Feed & Posts**: Write posts, upload images with drag-and-drop, and see what other people have posted on the main home feed.
- **Likes**: Like and unlike posts with instant count updates.
- **Friend System**: Add or remove friends from someone's profile card or post. The sidebar shows your updated list of friends in real time.
- **Dark & Light Mode**: Switch between dark and light themes anytime. Your theme preference and login session stay saved even after refreshing the page.

---

## Tech Stack

### Frontend (`client/`)
- **React 18** with **Vite** for fast builds
- **Material UI (MUI v5)** and Emotion for components and styling
- **Redux Toolkit** and **Redux Persist** for state and session storage
- **Formik** and **Yup** for clean form handling and input validation
- **React Dropzone** for drag-and-drop image uploads
- **React Router v6** for page routing

### Backend (`server/`)
- **Node.js** and **Express.js** (using ES Modules)
- **MongoDB** and **Mongoose** for data storage
- **JWT (`jsonwebtoken`)** for authentication
- **Bcrypt** for password hashing
- **Multer** for saving uploaded images
- **Helmet**, **CORS**, and **Morgan** for security and logging

---

## Project Structure

```text
Sociopedia-Project/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable cards, user avatars, and friend badges
│   │   ├── scenes/             # Pages (home, login, profile, and navbar)
│   │   ├── state/              # Redux slices for auth, posts, and theme state
│   │   ├── App.jsx             # Main router and theme provider
│   │   └── theme.js            # Color palette and dark/light tokens
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express API backend
│   ├── controllers/            # Logic for auth, users, and posts
│   ├── middleware/             # JWT auth protection middleware
│   ├── models/                 # Database models (User and Post)
│   ├── public/assets/          # Folder where uploaded photos are stored
│   ├── routes/                 # API route handlers
│   ├── .env.example            # Sample environment variables
│   ├── index.js                # Server setup and database connection
│   └── package.json
└── README.md
```

---

## How to Run It Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) database (or a local MongoDB instance)

---

### 1. Set Up the Backend

Open a terminal and go into the `server` folder:

```bash
cd server
yarn install
# or: npm install
```

Copy the example environment file and add your MongoDB connection string and a secret key:

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sociopedia?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:

```bash
node index.js
```

The server will run on `http://localhost:8080`.

---

### 2. Set Up the Frontend

Open a second terminal window and go into the `client` folder:

```bash
cd client
yarn install
# or: npm install
```

Start the frontend development server:

```bash
yarn dev
# or: npm run dev
```

Open `http://localhost:5173` in your browser. You can now register a new account, upload a profile photo, and start sharing posts!

---

## License

This project is licensed under the [MIT License](server/package.json).
