# Kongo Dev (PERN)

![Kongo Dev]()

Kongo Dev is a full-stack web application built using the PERN stack (Postgresql, Express, React, Node.js).

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
    - [Frontend](#frontend)
    - [Backend](#backend)
- [Contact](#contact)

## Key Features

- Blog post creation, editing, and deletion
- Rich text editor for creating posts
- Image upload for posts
- User authentication

## Tech Stack

**Frontend:** React, Redux Toolkit, TailwindCSS

**Backend:** Node, Express, Postgresql, JWT

## Demo

Experience the live demo of the application: [https://kongodev.netlify.app](https:kongodev.netlify.app)

## Getting Started

### Installation

Follow these steps to set up the application:

```bash
# Clone the repository

# Frontend 
git clone https://github.com/kadea-academy-learners/capstone-c2-DanielMwamba.git

# Backend
git clone https://github.com/kadea-academy-learners/capstone2-c2-DanielMwamba.git

# Frontend - Install dependencies
npm install

# Backend - Install dependencies
npm install
```

### Environment Variables

Before you run the application, make sure to create a `.env` file in both for the `frontend` and `backend` directories.

#### Frontend

In `.env` (frontend folder):

```dotenv
VITE_TINYMCE_API_KEY=<Get your API key from [TinyMCE](https://www.tiny.cloud/)>
```

#### Backend

In `.env` (Backend folder):

```dotenv
CLOUDINARY_API_KEY=<Get your API Key from [Cloudinary](https://cloudinary.com/) after creating an account>
CLOUDINARY_CLOUD_NAME=<Get your Cloud Name from [Cloudinary](https://cloudinary.com/) after creating an account>
SECRET_KEY=<Your secret key for JWT (Random Text)>
DATABASE_URI=<Get your Postgres URI>
PORT=<Port for the server, default is 3000>
```

### Start the Application

After setting up the environment variables, you can now start the application:

```bash
# Start the server
npm run dev

# Start the frontend
npm run dev
```

The app should now be up and running at http://localhost:5173

## Contact

For any questions or issues, feel free to reach out to me at danmuamba81@gmail.com. We would love to hear from you!
