# TASKFLOW

> A raw, brutalist task tracker built with the MERN stack.  
> No polish. No softness. Maximum contrast, maximum function.

---

## Live URLs

| Service  | URL                                           |
|----------|-----------------------------------------------|
| Frontend | _Add Vercel URL after deployment_             |
| Backend  | _Add Render URL after deployment_             |

---

## Features

- ✅ Full CRUD — create, read, update, delete tasks with zero page reloads
- 🎨 Brutalist UI — hard black borders, electric yellow accents, IBM Plex Mono + Space Grotesk
- 🔍 Filter by **status** (Todo / In Progress / Done) and **priority** (Low / Medium / High)
- 🗂 Sort by **created date** or **due date**
- 💾 Filter state persisted in `localStorage`
- ⚠ Overdue task dates highlighted in **red**
- ⌨ Press **`N`** anywhere to open the new task modal
- 🔔 Toast notifications for all CRUD operations
- 📊 Live task count summary bar
- 📱 Fully responsive — 3-col desktop grid, 1-col on mobile

---

## Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Frontend  | React 19 (Vite), CSS Modules         |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB + Mongoose                   |
| HTTP      | Axios                                |
| Toasts    | react-hot-toast                      |
| Dates     | date-fns                             |
| Deploy FE | Vercel                               |
| Deploy BE | Render                               |

---

## Local Setup

### Prerequisites

- Node.js ≥ 18
- A MongoDB URI (MongoDB Atlas free tier recommended)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd intern_aasigmnnt
```

### 2. Backend

```bash
cd server
cp .env.example .env
# Fill in your MONGO_URI in .env
npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend

```bash
cd ../client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api (already set by default)
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Description                                    |
|--------|------------------|------------------------------------------------|
| GET    | `/tasks`         | Fetch all tasks (`?status=`, `?priority=`, `?sort=createdAt\|dueDate`) |
| POST   | `/tasks`         | Create a new task                              |
| PUT    | `/tasks/:id`     | Update task by ID                              |
| DELETE | `/tasks/:id`     | Delete task by ID                              |

### Task Object

```json
{
  "_id": "...",
  "title": "Finish the report",
  "description": "Optional details",
  "status": "todo | in-progress | done",
  "priority": "low | medium | high",
  "dueDate": "2025-07-01T00:00:00.000Z",
  "createdAt": "2025-06-28T00:00:00.000Z"
}
```

---

## Deployment

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo, set root directory to `server/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `PORT` — `10000` (Render default)
   - `CLIENT_ORIGIN` — your Vercel frontend URL

### Frontend → Vercel

1. Import your repo on [Vercel](https://vercel.com)
2. Set root directory to `client/`
3. Framework: **Vite**
4. Add environment variable:
   - `VITE_API_URL` — your Render backend URL + `/api`
5. Deploy

---

## Project Structure

```
intern_aasigmnnt/
├── README.md
├── server/
│   ├── server.js           # Express entry point
│   ├── models/Task.js      # Mongoose schema
│   ├── controllers/        # Route handlers
│   ├── routes/             # Express routers
│   └── middleware/         # Validation + error handlers
└── client/
    ├── index.html
    └── src/
        ├── App.jsx          # Root component + modal + state
        ├── hooks/useTasks.js # Task state + API calls
        └── components/      # TaskCard, TaskForm, TaskList, FilterBar, EmptyState
```
