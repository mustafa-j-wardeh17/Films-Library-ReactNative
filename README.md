# IMDb Mobile Application
<img src="https://res.cloudinary.com/dsos2uuov/image/upload/v1703008824/IMDb%20Project%20Image%20Done/6_b4pwmt.jpg" alt="Project Image 1" width="320" height="600" />
*Login Page*


## Overview
This is a simple IMDb-like mobile application built using React Native for the front end and Express for the backend. The application allows users to browse a list of movies, search for movies, and view details about each movie. It also includes user authentication and authorization using JWT tokens, bcrypt for password hashing, and input validation using Joi. MongoDB is used to store data with separate models for movies and users.

## Features
- **Authentication and Authorization:**
  - User registration and login functionality.
  - JWT token-based authentication for secure API access.
  - Passwords are securely hashed using bcrypt.

- **Movie Listing:**
  - Main page displays a list of movies.
  - Users can click on a movie to view detailed information.

- **Search Functionality:**
  - Users can search for movies using the search screen.

- **Drawer Navigation:**
  - Drawer navigation provides easy access to different sections of the application.
  - Logout option at the bottom of the drawer for user convenience.

## Tech Stack
### Frontend (React Native)
- `react-native`
- `react-navigation` for navigation
- `async-storage` for storing JWT tokens securely
- `react-native-responsive-screen` for responsive design

### Backend (Express)
- `express` for server
- `jsonwebtoken` for JWT token generation and verification
- `bcrypt` for password hashing
- `joi` for input validation
- `mongoose` for MongoDB integration

## Project Structure
- **Screens:**
  - `Home`: Displays a list of movies.
  - `Movie`: Displays detailed information about a selected movie.
  - `SearchScreen`: Allows users to search for movies.
  - `Person`: Information about a person (future enhancement).
  - `Register`: User registration screen.
  - `Login`: User login screen.
  - `Profile`: User profile screen (future enhancement).

- **Navigation:**
  - `Navigation`: Sets up the navigation structure using `react-navigation`.

- **Backend:**
  - Express server with routes for authentication and movie-related operations.
  - MongoDB models for movies and users.

- **Middleware:**
  - `authMiddleware`: Middleware for JWT token verification.
  - `errorHandler`: Middleware for handling errors.
  - `logger`: Middleware for logging requests.

## Getting Started
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
