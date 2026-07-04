# Odoo Forge HRMS

Odoo Forge HRMS is a comprehensive Human Resource Management System designed to digitize and streamline core HR operations such as employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows for admins and HR officers.

## Features

*   **Authentication & Role-Based Access:** Secure Sign Up/Sign In with distinct roles for Admins (HR Officers) and Employees.
*   **Dashboards:** Dedicated quick-access dashboards for both employees and admins to view activity, requests, and overviews.
*   **Employee Profile Management:** View and edit personal details, job details, salary structure, and documents.
*   **Attendance Tracking:** Daily and weekly attendance views with check-in/check-out functionality and status monitoring.
*   **Leave & Time-Off Management:** Apply for leave, view a monthly attendance calendar, and robust approval workflows for admins.
*   **Payroll Management:** Visibility of salary structure and payroll data for employees, with full management control for admins.

## Tech Stack

### Frontend
*   [Next.js](https://nextjs.org/) (App Router)
*   [React](https://reactjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Lucide React](https://lucide.dev/) (Icons)
*   [Zustand](https://github.com/pmndrs/zustand) (State Management)
*   [Axios](https://axios-http.com/)

### Backend
*   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
*   [JSON Web Tokens (JWT)](https://jwt.io/) & [BcryptJS](https://www.npmjs.com/package/bcryptjs) (Authentication)
*   [Multer](https://www.npmjs.com/package/multer) (File Uploads)

## Project Structure

This repository is organized as a monorepo containing both the frontend and backend applications:

*   `/frontend`: Contains the Next.js application.
*   `/Backend`: Contains the Node.js/Express API server.

## Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn

### Running the Backend

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (create a `.env` file with necessary variables like `PORT`, `MONGO_URI`, `JWT_SECRET`).
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The backend typically runs on `http://localhost:5000` (or as configured in `.env`).

### Running the Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (create a `.env.local` file with backend API URLs if needed).
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

## Design Reference

The UI/UX design blueprints for this project can be found here: [Excalidraw Design](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)
