# ApplyMate – Job Tracker Application

ApplyMate is a full-stack job application tracking platform built using the MERN stack. It helps job seekers organize their job search, manage applications, and monitor their application progress in one place.

## 🚀 Features

- **User Authentication:** Secure user registration and login.
- **Dashboard:** View and manage job applications.
- **Add Applications:** Record company names, job roles, and application details.
- **Application Tracking:** Track application statuses such as Applied, Interview, Selected, and Rejected.
- **Application Management:** View and manage your job application records.
- **Protected Routes:** Restrict dashboard access to authenticated users.
- **Responsive UI:** User-friendly interface for different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML5
- CSS3
- JavaScript
- Vite

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication & Security**
- JSON Web Token (JWT)
- bcryptjs

**Tools**
- Visual Studio Code
- Git & GitHub
- Postman

## 📁 Project Structure

```text
ApplyMate-React/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/PedduriShalini/ApplyMate--Job-Tracker-Application.git
```

### 2. Navigate to the project

```bash
cd ApplyMate--Job-Tracker-Application
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `server` folder and configure your MongoDB connection and authentication secret according to your server configuration.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Never upload your actual `.env` file or credentials to GitHub.

### 6. Start the backend

From the server directory:

```bash
npm start
```

### 7. Start the frontend

From the client directory:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🎯 Project Objective

The main objective of ApplyMate is to simplify the job search process by providing a centralized platform where users can organize their applications and track their recruitment journey efficiently.

## 👩‍💻 Developer

**Shalini Pedduri**

B.Tech – Information Technology

GitHub: [PedduriShalini](https://github.com/PedduriShalini)

---

⭐ If you find this project useful, consider giving it a star!
