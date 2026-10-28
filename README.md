# StudentDesk — Full Stack Application (React + Node.js + Express + MongoDB)

A full-stack Student Management application built according to the **Backend Notes: Node.js, Express.js, MongoDB and Testing** curriculum.

---

## 📁 Project Architecture

```text
react-demo/
├── frontend/                       # React 18 + Vite Frontend App
│   ├── index.html                  # HTML entry point with Inter typography
│   ├── package.json                # Frontend dependencies & scripts
│   ├── vite.config.js              # Vite bundler configuration
│   └── src/
│       ├── App.jsx                 # StudentDesk core client application
│       ├── StudentForm.jsx         # Controlled student registration form
│       ├── StudentTable.jsx        # Data table with avatars, badges & delete actions
│       ├── index.css               # Modern glassmorphic dark-mode design system
│       └── main.jsx                # React DOM entry point
│
├── backend/                        # Node.js + Express + MongoDB REST API
│   ├── package.json                # Backend dependencies & test scripts
│   ├── .env                        # Environment variables (MongoDB connection string)
│   ├── .env.example                # Example configuration template
│   ├── app.js                      # Express configuration (CORS, JSON parser, logger, routes)
│   ├── index.js                    # Database connection & server runner (Port 5000)
│   ├── departments.js              # Shared departments enum & validation helper
│   ├── models/
│   │   ├── Student.js              # Student Mongoose model (name, usn, email, department)
│   │   └── Course.js               # Course Mongoose model (title, code, instructor, credits, dept)
│   ├── controllers/
│   │   ├── studentController.js    # CRUD handlers for students (?department filter)
│   │   └── courseController.js     # CRUD handlers for courses (?department filter & ?sort=credits)
│   ├── routes/
│   │   ├── studentRoutes.js        # /api/students routing endpoints
│   │   └── courseRoutes.js         # /api/courses routing endpoints
│   └── tests/
│       ├── jest/
│       │   ├── students.test.js    # Supertest + Jest tests for Student API (mocked DB)
│       │   └── courses.test.js     # Supertest + Jest tests for Course API (mocked DB)
│       └── mocha/
│           └── students.spec.js    # Mocha + Chai unit & integration tests
```

---

## 🚀 Getting Started

### 1. Backend Setup & Running

Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Configure your MongoDB connection in `backend/.env`:
```env
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.xxxxx.mongodb.net/studentdesk?retryWrites=true&w=majority
PORT=5000
```

Start the backend API server:
```bash
npm run dev
# Or for standard production start:
npm start
```
The server will run at `http://localhost:5000`.

---

### 2. Running Automated Tests

Run the full **Jest test suite** (12 tests covering Student & Course CRUD):
```bash
cd backend
npm test
```

Run the **Mocha + Chai test suite** (5 tests):
```bash
cd backend
npm run test:mocha
```

---

### 3. Frontend Setup & Running

Navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

Build for production:
```bash
npm run build
```

---

## 🔌 API Reference

### Student Endpoints (`/api/students`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Get all students (Supports query filter: `?department=CSE`) |
| `GET` | `/api/students/:id` | Get student by MongoDB `_id` |
| `POST` | `/api/students` | Add a new student |
| `PUT` | `/api/students/:id` | Update an existing student |
| `DELETE`| `/api/students/:id` | Delete a student by `_id` |

#### Student Payload Example:
```json
{
  "name": "Asha Sharma",
  "usn": "1RV23CS001",
  "email": "asha@example.com",
  "department": "CSE"
}
```

---

### Course Endpoints (`/api/courses`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | Get all courses (Supports `?department=CSE` and `?sort=credits`) |
| `GET` | `/api/courses/:id` | Get course by MongoDB `_id` |
| `POST` | `/api/courses` | Create a new course |
| `PUT` | `/api/courses/:id` | Update a course |
| `DELETE`| `/api/courses/:id` | Delete a course |

#### Course Payload Example:
```json
{
  "title": "Data Structures & Algorithms",
  "code": "CS201",
  "instructor": "Dr. Sharma",
  "credits": 4,
  "department": "CSE"
}
```

---

## ✨ Features & Standards Implemented

- **Schema Validation & Unique Indexing**: USN and Course Codes are enforced unique with Mongoose schema rules.
- **Controlled Department Enums**: `["CSE", "ISE", "ECE", "ME"]`.
- **Decoupled Architecture**: Separated Express `app.js` and server `index.js` enabling fast and reliable in-memory Supertest unit testing without hanging database connections.
- **Glassmorphic UI**: High aesthetic visual design with responsive layouts, glowing badges, animated loading states, and instant error handling.
