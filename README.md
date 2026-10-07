# LinkDeck

# Overview
A simple MERN CRUD application. It lets users create a basic public profile and manage a list of links that can be shared through a personal profile URL.

# Folder Structure

```
LinkDeck/
├── backend/
├── frontend/
└── README.md
```

## Frontend Structure

```
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   vite.config.js
|   .env.production
|   .env.development
│
|
├───public
│       favicon.svg
│       
└───src
    │   index.css
    │   main.jsx
    │   
    ├───components
    │   │   index.js
    │   │   
    │   ├───card
    │   │       Card.jsx
    │   │       
    │   ├───dashboard
    │   │       Dashboard.jsx
    │   │       
    │   ├───footer
    │   │       Footer.jsx
    │   │       
    │   ├───header
    │   │       Header.jsx
    │   │       
    │   ├───loader
    │   │       Loader.jsx
    │   │       
    │   ├───login
    │   │       Login.jsx
    │   │       
    │   ├───main
    │   │       Main.jsx
    │   │       
    │   ├───messageBars
    │   │       Message.jsx
    │   │       
    │   ├───preview
    │   │       Preview.jsx
    │   │       
    │   ├───profile
    │   │       Profile.jsx
    │   │       
    │   ├───scroll
    │   │       Scroll.jsx
    │   │       
    │   ├───sign
    │   │       Sign.jsx
    │   │       
    │   └───user
    │           User.jsx
    │           
    ├───router
    │       Layout.jsx
    │       Protect.jsx
    │       Router.jsx
    │       
    └───store
        │   Store.js
        │   
        └───slice
                authSlice.js
                userSlice.js
                
```

## Backend Structure

```
│   .env
│   .gitignore
│   index.js
│   package-lock.json
│   package.json
|   .env.example
│   
├───config
│       db.js
│       
├───controllers
│       auth.js
│       index.js
│       profile.js
│       user.js
│       verify.js
│       
├───middleware
│       authChecker.js
│       tokenAuth.js
│       
├───models
│       User.js
│       
├───routes
│       auth.js
│       index.js
│       profile.js
│       user.js
│       verify.js
│       
└───schemas
        authSchema.js
        linkSchema.js
```

## Frontend Environment Variables (`.env`)

```bash
VITE_BACKEND_URL=""
VITE_FRONTEND_URL=""
```

These variables should contain your production URLs or your `localhost` addresses for local development.

## Backend Environment Variables (`.env`)

```bash
PORT=8000
MONGODB_URI=''  
SECRET_KEY=""
```

This file specifies your server's application port, the MongoDB connection string, and the authentication secret key.
