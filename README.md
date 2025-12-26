🛒 Commerce Hub – E-commerce Web Application

🔗 Live Demo:
https://commerce-hub-frontend-poj8.vercel.app/

📌 Overview

Commerce Hub is a modern e-commerce web application built as a learning-driven project to understand real-world frontend development, authentication flows, and deployment.

The primary focus of this project is frontend architecture and integration, while leveraging managed backend services for authentication and data handling.

🎯 Project Goals

Build a real, deployable web application (not just a demo)

Learn how frontend applications integrate with authentication systems

Understand OAuth flows (Google Login)

Practice environment configuration and deployment

Gain experience debugging real production issues

🧩 Features
👤 Authentication

Email & password login

Google OAuth login

Persistent login sessions

Role-based access (Admin / User)

🛍️ Application

Public product browsing

Admin-protected routes

Secure API communication using JWT

Responsive UI (desktop & mobile)

🔐 Security

JWT-based authentication

Admin routes protected at API level

Environment-based configuration

No sensitive keys exposed on frontend

🛠️ Tech Stack
Frontend

React

Vite

Tailwind CSS

Axios

TypeScript

Backend & Services

Supabase Auth (Email + Google OAuth)

Express.js (API layer)

Supabase Database

JWT Authentication

Deployment

Vercel (Frontend)

Supabase (Auth & Database)

🧠 What I Learned

How frontend applications communicate with backend APIs

OAuth login flow and redirect handling in production

Difference between development (localhost) and production environments

Secure handling of environment variables

Debugging deployment-only issues

Role-based access control concepts

⚠️ Project Scope Clarification (Important)

This project is frontend-focused.

While a backend API is used, the primary learning objective was:

Frontend integration

Auth flow understanding

Deployment & environment management

Backend logic is intentionally minimal and service-driven (Supabase) to keep focus on frontend development.

🚀 Running Locally
# Clone repository
git clone https://github.com/Rishi283G/commerce-hub-frontend.git

# Install dependencies
npm install

# Start development server
npm run dev


Create a .env file:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:5000/api

📌 Future Improvements

Product management UI (CRUD)

Cart & checkout flow

User profile page

Improved admin dashboard

Better loading & error states

👨‍💻 Author

Rushikesh Jadhav
Aspiring Frontend Developer (Preparing for 2026 roles)

LinkedIn: https://linkedin.com/in/rushikesh-jadhav283

GitHub: https://github.com/Rishi283G

