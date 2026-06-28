# TASKFLOW

A no-nonsense task tracker built with the MERN stack. Brutalist design — hard borders, zero fluff, maximum contrast. You open it, you add tasks, you get things done.

---

## What it looks like

Black borders. Electric yellow buttons. Monospace text everywhere. It was designed to feel like a manifesto printed on graph paper.

---

## What you can do with it

- **Create tasks** with a title, description, priority (low / medium / high), status, and due date
- **Edit or delete** any task with one click
- **Mark tasks done** instantly without opening the edit form
- **Filter** tasks by status or priority — results update as you click, no submit needed
- **Sort** by creation date or due date
- **Overdue dates turn red** so nothing slips through
- Press **N** anywhere on the page to open the new task form
- Filters remember where you left off (saved in localStorage)
- Toast notifications for every action so you always know what happened

---

## Tech stack

| Part | What's used |
|------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB (Atlas) + Mongoose |
| Styling | CSS Modules |
| HTTP | Axios |
| Notifications | react-hot-toast |
| Dates | date-fns |

---

## Running it locally

You'll need Node.js (v18+) and a MongoDB Atlas URI.

**1. Clone the repo**
```bash
git clone https://github.com/Aryan-jr-07/taskflow.git
cd taskflow
```

**2. Set up the backend**
```bash
cd server
cp .env.example .env
# Open .env and paste your MongoDB Atlas URI
npm install
```

**3. Set up the frontend**
```bash
cd ../client
cp .env.example .env
# VITE_API_URL is already set to localhost:5001 by default
npm install
```

**4. Run both at once**
```bash
cd ..
npm install
npm run dev
```

That's it. Frontend runs on `http://localhost:5173`, backend on `http://localhost:5001`.

---

## Deploying

**Backend → Render**
- Root directory: `server`
- Build: `npm install`
- Start: `npm start`
- Env vars: `MONGO_URI`, `PORT` (use 10000), `CLIENT_ORIGIN` (your Vercel URL)

**Frontend → Vercel**
- Root directory: `client`
- Framework: Vite
- Env var: `VITE_API_URL` → your Render backend URL + `/api`

---

## Live

| | URL |
|--|-----|
| Frontend | _coming soon_ |
| Backend | _coming soon_ |

---

## API

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?sort=`) |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Folder layout

```
taskflow/
├── server/         ← Express API
│   ├── models/     ← Mongoose schemas
│   ├── controllers/← Route handlers
│   ├── routes/     ← API routes
│   └── middleware/ ← Validation + errors
└── client/         ← React app
    └── src/
        ├── hooks/      ← useTasks (all state + API calls)
        └── components/ ← TaskCard, TaskForm, FilterBar, etc.
```
