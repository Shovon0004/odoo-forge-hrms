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

<<<<<<< HEAD
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
=======
## 🗄️ Database Architecture

The application uses **PostgreSQL** hosted on **Neon DB** as its relational database. The schema structure consists of 6 core tables:

### 1. Organizations (`organizations`)
Stores the main company information.
* `_id` (VARCHAR(24), Primary Key)
* `name` (VARCHAR(255), Unique)
* `logo` (TEXT)
* `phone` (VARCHAR(255))
* `createdAt` (TIMESTAMP)

### 2. Employees (`employees`)
Stores employee records, credential hashes, and personal/professional details.
* `_id` (VARCHAR(24), Primary Key)
* `employee_id` (VARCHAR(255), Unique) — Auto-generated via specialized logic
* `name` (VARCHAR(255))
* `email` (VARCHAR(255), Unique)
* `mobile` (VARCHAR(255))
* `company_id` (VARCHAR(24), Foreign Key → `organizations`)
* `department` (VARCHAR(255))
* `manager_id` (VARCHAR(24), Foreign Key → `employees`, Self-referential)
* `location` (VARCHAR(255))
* `status` (VARCHAR(255)) — `Present` / `Absent` / `On Leave`
* `password_hash` (VARCHAR(255))
* `role` (VARCHAR(255)) — `Admin` / `HR` / `Employee`
* `isVerified` (BOOLEAN)
* `isActivated` (BOOLEAN)
* `profilePicture` (TEXT) — Stores raw Base64 data strings
* `date_of_birth` (TIMESTAMP)
* `nationality` (VARCHAR(255))
* `marital_status` (VARCHAR(255))
* `gender` (VARCHAR(255))
* `resume` (JSONB) — Stores bio, interests, and professional history
* `skills` (ARRAY(TEXT))
* `certifications` (ARRAY(TEXT))

### 3. Attendances (`attendances`)
Daily work hours logs for employees.
* `_id` (VARCHAR(24), Primary Key)
* `employee_id` (VARCHAR(24), Foreign Key → `employees`)
* `date` (VARCHAR(10)) — Format `YYYY-MM-DD`
* `check_in` (TIMESTAMP)
* `check_out` (TIMESTAMP, Nullable)
* `work_hours` (FLOAT)
* `extra_hours` (FLOAT)

### 4. Time Off Requests (`time_off_requests`)
Leave requests submitted by employees.
* `_id` (VARCHAR(24), Primary Key)
* `employee_id` (VARCHAR(24), Foreign Key → `employees`)
* `time_off_type` (VARCHAR(255)) — `Paid Time off` / `Sick Leave`
* `start_date` (TIMESTAMP)
* `end_date` (TIMESTAMP)
* `allocation_days` (INTEGER)
* `remarks` (TEXT)
* `attachment_url` (TEXT) — Stores uploaded medical certificate paths or links
* `status` (VARCHAR(255)) — `Pending` / `Approved` / `Rejected`
* `comments` (TEXT) — Reviewer remarks

### 5. Time Off Allocations (`time_off_allocations`)
Current leave balances per employee.
* `_id` (VARCHAR(24), Primary Key)
* `employee_id` (VARCHAR(24), Foreign Key → `employees`, Unique)
* `paid_time_off_available` (INTEGER) — Default 24 days
* `sick_time_off_available` (INTEGER) — Default 7 days

### 6. Salary Settings (`salary_settings`)
Configures payroll, deductions, and allowances.
* `_id` (VARCHAR(24), Primary Key)
* `employee_id` (VARCHAR(24), Foreign Key → `employees`, Unique)
* `monthly_wage` (FLOAT)
* `yearly_wage` (FLOAT)
* `working_days_per_week` (INTEGER)
* `break_time_hours` (FLOAT)
* `basic_salary` (FLOAT) — Auto-calculated (50% of monthly wage)
* `hra` (FLOAT) — Auto-calculated (50% of basic)
* `standard_allowance` (FLOAT) — Auto-calculated
* `performance_bonus` (FLOAT) — Auto-calculated
* `lta` (FLOAT) — Auto-calculated
* `fixed_allowance` (FLOAT) — Auto-calculated
* `employee_pf` (FLOAT) — Auto-calculated
* `employer_pf` (FLOAT) — Auto-calculated
* `professional_tax` (FLOAT)

---

## ⚙️ Special Application Logics & Architecture

To achieve a seamless database migration from MongoDB to PostgreSQL without rewriting the controller layer, several custom architectural elements were developed:

### 1. Mongoose-to-Sequelize Compatibility Layer (`sequelize.js`)
We engineered `MongooseCompatibleModel` and `MongooseQueryWrapper` which intercepts chainable queries:
```javascript
// This Mongoose query is automatically parsed and executed as raw Sequelize code
const employee = await Employee.findOne({ email: email.toLowerCase() })
  .populate('company_id', 'name logo')
  .select('-password_hash');
```
* Translates operators (`$or`, `$and`, `$gte`, `$lte`, `$in`) to Sequelize `Op` structures.
* Emulates MongoDB hooks (`beforeSave` hashing).
* Provides dynamic `populate` by mapping it to Sequelize `include` associations.

### 2. Globally Unique Employee ID Generation (`idGenerator.js`)
Employee ID generation follows a strict corporate format:
`[Company Initials (2 letters)][Name Initials (2-4 letters)][Year of Joining][4-digit Serial Number]`
* **Example:** `OISHHA20260002` (Company: **O**doo **I**ndia, Name: **Sh**ovon **Ha**lder, Year: **2026**, Serial: **0002**).
* **Collision Protection Loop:** To prevent global collision errors across organizations, the generator queries the database in a loop, checking the availability of the ID and incrementing the serial count automatically if a conflict is detected.

### 3. In-place Mutation Tracking
Sequelize does not automatically detect array updates (such as `.push()` on skills/certifications arrays) or JSON additions because the object references do not change. We overrode the `.save()` method to automatically call `this.changed(key, true)` for array and JSONB columns, ensuring changes are always written to PostgreSQL.

### 4. Dual-Protocol Mailer with Failover (`mailer.js`)
Because hosting platforms (like Render Free Tier) block standard SMTP traffic on ports 25, 465, and 587, we configured the mailer to dispatch verification and onboarding emails via the **Resend HTTP API**. In case the Resend account limit or validation errors trigger a failure, it automatically falls back to standard **Nodemailer SMTP** as a safety net.

---

## 🔑 Login & Testing Credentials

Use the following mock credentials to log in and test role features:

| User Role | Login Email / ID | Password | Purpose / Features |
|---|---|---|---|
| **Admin / HR Officer** | `admin@hackathon.com` | `Password@123` | Can onboard employees, approve/reject leaves, modify salary structures, and view directory attendance |
| **Employee** | `johndoe@hackathon.com` | `Password@123` | Can check-in/out, apply for leaves, view salary breakdown, and update profile skills/avatar |

---

## 📧 Automated Emails Screenshots

Below are placeholders for the transactional emails generated by the HRMS portal (such as registration notifications, account verification, and employee credentials dispatches):

### 1. Org Admin Welcome & Setup Email
*Allows the admin to verify their email link after registering their organization.*
![Org Verification Setup Email](frontend/public/logo.png) *(Insert Admin Welcome Email image here)*

### 2. Employee Account Activation Email
*Sends the auto-generated credentials (Employee ID, temporary password) to the onboarded employee.*
![Employee Activation Email](frontend/public/logo.png) *(Insert Employee Activation Email image here)*

---

## 🖥️ Application Pages Mockups & Screenshots

Below are placeholders for the core application pages. Add your custom screenshots inside the designated repository assets folder:

### 1. Landing & Signup Page
*Where organizations and admins register their accounts.*
*(Insert Landing Page Screenshot here)*

### 2. Admin Dashboard
*Main center for tracking active/absent employees and reviewing pending leave requests.*
*(Insert Admin Dashboard Screenshot here)*

### 3. Employee Dashboard
*Check-in/Check-out widgets, remaining leave balance cards, and quick navigation link indicators.*
*(Insert Employee Dashboard Screenshot here)*

### 4. Leave Application Calendar
*Interactive calendar view marking present/absent days and permitting date range selections.*
*(Insert Time Off Request Screenshot here)*

### 5. Payroll Management Panel
*Breakdown of basic salary, HRA, allowance calculations, and tax deductions.*
*(Insert Payroll Panel Screenshot here)*

---

## 🚀 Getting Started Locally

Follow this comprehensive guide to configure, initialize, and run the Odoo Forge HRMS application on your local machine.

### 📋 Prerequisites
Ensure you have the following installed before starting:
* **Node.js** (v18.x or higher)
* **npm** (v9.x or higher) or **yarn**
* **PostgreSQL Database** (Either a local PostgreSQL instance or a serverless instance on [Neon DB](https://neon.tech/))

---

### 📂 Step 1: Backend Setup & Configuration

1. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `Backend/` directory and populate it with the following configuration:
   ```env
   # Server Config
   PORT=5000
   NODE_ENV=development

   # Database Connection (PostgreSQL connection string)
   # If using Neon, make sure to append ?sslmode=require at the end
   DATABASE_URL=postgresql://neondb_owner:[PASSWORD]@[HOST]/neondb?sslmode=require

   # Authentication Security Key
   JWT_SECRET=your_jwt_signing_secret_key_here

   # Email Dispatcher Settings
   # Provide your Resend API token. 
   # Note: For free Resend sandbox accounts, you can only send verification emails to your registered email address.
   RESEND_API_KEY=re_your_resend_api_token
   
   # Custom domain email sender address. Must match your verified domain on Resend.
   MAIL_FROM=HRMS Portal <no-reply@shovon.tech>

   # SMTP Fallback Configurations (Used automatically if Resend fails)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_gmail_address@gmail.com
   SMTP_PASS=your_gmail_app_password

   # Frontend Client URL (for CORS validation)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Initialize Database Tables:**
   The backend uses Sequelize's `{ alter: true }` synchronization schema. On the first boot, the system will automatically create all tables, relationships, and basic indexes in your database.

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   * The backend API server will start on `http://localhost:5000`.
   * You can access the **Interactive API Client & Tester Console** directly by opening `http://localhost:5000` in your web browser.

---

### 💻 Step 2: Frontend Setup & Configuration

1. **Navigate to the Frontend directory:**
   ```bash
   # From root directory
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `frontend/` directory to configure the Next.js API client endpoint:
   ```env
   # API endpoint pointing to your local Express server
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. **Start Dev Server:**
   ```bash
   npm run dev
   ```
   * The Next.js client app will launch at `http://localhost:3000`.

---

### 🔧 Troubleshooting & Utilities

#### 1. Unique Constraint Violations / Index Bloat
If you restart the server frequently with Sequelize's `alter: true`, duplicate constraint configurations might accumulate under PostgreSQL (e.g. `employees_employee_id_key1`). To clean them up without dropping your tables:
* Run the pre-configured migration script in the Backend folder:
  ```bash
  node scratch/cleanup_indexes.js
  ```

#### 2. Base64 Upload Size Limits
If you get `value too long for type character varying(255)` errors on profile picture uploads, make sure your backend schema has been updated to `DataTypes.TEXT` (our current codebase is fully updated to support this).

#### 3. Mail Client Blocks on Render
When deploying the Backend server to Render, outbound traffic on standard SMTP ports (25, 465, 587) is blocked on Free tier accounts. **Always** specify `RESEND_API_KEY` on Render to route email requests through the HTTP API instead of raw SMTP ports.
>>>>>>> 8812501 (Expand local setup guidelines and environment variables instructions in README.md)

