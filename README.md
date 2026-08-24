🎟️ Event Management System

A full-stack Event Management System that allows users to discover events, register for events, and manage their registrations. Administrators can create and manage events, view users, and monitor event registrations through an admin dashboard.

🚀 Features

👤 Student/User

User registration

Secure login authentication

JWT-based authentication

Browse available events

View event details

Register for events

View personal event registrations

Logout functionality

🛠️ Admin

Secure admin login

Admin dashboard

View dashboard statistics

View registered users

Create new events

Manage existing events

Delete events

View event registrations and participants

Monitor upcoming events

🔐 Authentication

JWT authentication

Password hashing using bcrypt

Role-based authorization

Protected routes

Separate Student and Admin access

🏗️ Project Architecture

event-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md

🧰 Technologies Used

Frontend

React.js

Vite

Tailwind CSS

React Router DOM

Axios

JavaScript

Backend

Node.js

Express.js

MySQL

JWT

bcrypt

CORS

dotenv

Development Tools

Visual Studio Code

Git

GitHub

Postman

MySQL

🔄 Application Flow

                    ┌───────────────┐
                    │     Home      │
                    └───────┬───────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
          Register                      Login
              │                           │
              │                    ┌──────┴──────┐
              │                    │             │
              │                 Student        Admin
              │                    │             │
              │                    ↓             ↓
              │                 Events      Admin Dashboard
              │                    │             │
              │                    ↓             ├── Users
              │              Event Details       ├── Create Event
              │                    │             ├── Manage Events
              │                    ↓             └── Registrations
              │               Register
              │                    │
              │                    ↓
              │             My Registrations
              │
              └─────────────────────────────────

👥 User Roles

Student

Students can:

Login
  ↓
Browse Events
  ↓
View Event Details
  ↓
Register for Event
  ↓
View My Registrations

Admin

Administrators can:

Admin Login
     ↓
Admin Dashboard
     ├── View Statistics
     ├── View Users
     ├── Create Events
     ├── Manage Events
     └── View Registrations

🔐 Authentication

The application uses JWT (JSON Web Token) for authentication.

After successful login:

User Login
    ↓
Backend verifies credentials
    ↓
JWT Token generated
    ↓
Token sent to frontend
    ↓
Token used for protected API requests

Passwords are securely hashed using bcrypt.

🗄️ Database

The application uses MySQL as the database.

Main tables include:

users
events
registrations

Users

Stores:

User ID

Full name

Email

Password

Role

Created date

Events

Stores:

Event ID

Title

Description

Category

Event date

Event time

Venue

Capacity

Image URL

Created by

Registrations

Stores event registration information including:

Registration ID

User ID

Event ID

Registration status

Registration date

📡 API Structure

Authentication

POST /api/auth/register
POST /api/auth/login

Events

POST /api/events/create

Admin

GET /api/admin/dashboard
GET /api/admin/users
GET /api/admin/registrations
GET /api/admin/events/:eventId/participants
DELETE /api/admin/events/:eventId

⚙️ Installation

1. Clone the repository

git clone https://github.com/charan111-c/event-management-system.git
cd event-management-system

🔧 Backend Setup

cd backend
npm install

Create a .env file:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_management

JWT_SECRET=your_secret_key

Update the database credentials according to your MySQL configuration.

Start the backend:

node server.js

Backend:

http://localhost:5000

🎨 Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

🧪 Testing APIs

The backend APIs can be tested using Postman.

Example login request:

POST http://localhost:5000/api/auth/login

Request body:

{
    "email": "user@example.com",
    "password": "your_password"
}

Successful login returns a JWT token.

🛡️ Security

The project includes:

Password hashing with bcrypt

JWT authentication

Protected API routes

Role-based authorization

Environment variables for sensitive configuration

CORS configuration

Sensitive files such as .env and node_modules are excluded using .gitignore.

📱 Responsive Design

The frontend uses Tailwind CSS to provide a responsive interface across:

Desktop

Laptop

Tablet

Mobile

🎯 Project Objective

The main objective of this project is to provide a centralized platform for managing college or organizational events.

The system simplifies:

Event creation

Event discovery

Student registration

Participant management

User management

Event administration

It reduces manual event-management work and provides administrators with a centralized dashboard for monitoring the entire system.

🔮 Future Enhancements

Possible future improvements:

Event search and filtering

Event categories

Email notifications

Event reminders

QR-code based event attendance

Online payment integration

Event image uploads

Attendance tracking

Analytics and reports

Pagination

Admin user management

Password reset functionality

👨‍💻 Author

Charan Kotha

GitHub: https://github.com/charan111-c

📄 License

This project is developed for educational and project purposes.
