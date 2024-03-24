# Dashboard Web Application

## Overview

This project is a dashboard web application built using ReactJS, Next.js, Redux Toolkit, and Tailwind CSS. It features login, registration, and profile pages with session management using encrypted cookies.

## Technologies Used

- ReactJS
- Next.js
- Redux Toolkit
- Tailwind CSS

## Dependencies

```json
"dependencies": {
  "@reduxjs/toolkit": "^2.2.2",
  "cookies-next": "^4.1.1",
  "jose": "^5.2.3",
  "next": "14.1.4",
  "next-themes": "^0.3.0",
  "react": "^18",
  "react-dom": "^18",
  "react-icons": "^5.0.1",
  "react-redux": "^9.1.0",
  "react-toastify": "^10.0.5"
},
"devDependencies": {
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.0.1",
  "eslint": "^8",
  "eslint-config-next": "14.1.4",
  "postcss": "^8",
  "tailwindcss": "^3.3.0",
  "typescript": "^5"
}
```

## Getting Started

- Clone the repository to your local machine.
- Install dependencies by running `npm install` in the project directory.
- Run the development server with `npm run dev`.
- Access the web application in your browser at `http://localhost:3000`.

## Features

### Login Page

- Create a login page with fields for users to enter their credentials.
- Validate the form inputs and display appropriate error messages for invalid inputs.
- Upon successful login, store the user's session in encrypted cookies set to expire in 1 minute.
- Store the user's data in the Redux store upon successful login.
- Redirect the user to their profile page after successful login.

### Register Page

- Create a registration page with fields for users to create a new account.
- Validate the form inputs and display appropriate error messages for invalid inputs.
- Upon successful registration, store the user's session in encrypted cookies.
- Store the user's data in the Redux store upon successful registration.
- Redirect the user to the login page after successful registration.

### Profile Page

- Create a profile page that displays user information retrieved from the Redux store.
- Ensure the profile page is only accessible to authenticated users, redirecting unauthenticated users to the login page as needed.

### Session Management

- Implement session management using cookies to store user sessions. Cookies are encrypted when being saved and decrypted when retrieved.
- Authenticate subsequent requests to protected routes using the encrypted cookies.
- Redirect unauthenticated users to the login page if they try to access a protected route.
- Redirect users to the login page when their session cookie expires.

### Flow

- Upon first accessing the web application, display the registration page.
- After successful registration, display the login page.
- After successful login, display the profile page, populated with user information retrieved from the Redux store.
- Redirect users to the login page when their session cookie expires.

## Styling

- Style all pages using Tailwind CSS for a consistent and attractive UI.
- Interface allows users to switch between light and dark themes. (Light theme: Blue, Dark theme: Orange)

## Committing Changes

- Commit your changes and push them to your branch when you are done.
