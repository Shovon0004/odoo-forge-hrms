# 🏢 Odoo Forge HRMS

Odoo Forge HRMS is a state-of-the-art, premium Human Resource Management System (HRMS) designed to digitize, automate, and streamline core organizational workflows. Built with a modern **Next.js** frontend and an **Express/Node.js** backend, the system transitioned from MongoDB to a highly performant **PostgreSQL (Neon DB)** backend using a custom-engineered Mongoose compatibility translation layer built on top of **Sequelize**.

The system enables automated employee onboarding, dynamic salary calculations, automatic attendance monitoring (with check-in, check-out, and overtime calculations), and a robust multi-role approval workflow for leaves and time-off requests.

---

## ⚡ Tech Stack & Tools

### Frontend
* **Core Framework:** [Next.js 14+](https://nextjs.org/) (App Router & React Server Components)
* **Styling & Theme:** [Tailwind CSS](https://tailwindcss.com/) with a sleek, responsive dark mode and custom dashboard cards
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Lightweight, decoupled state manager)
* **Icons:** [Lucide React](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)

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

### 3. Boot Frontend Client
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the system.
