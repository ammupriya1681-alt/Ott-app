# Movie OTT – Full-stack MVP

Monorepo: **backend**, **frontend**, **admin**.

## Quick start

```bash
# Backend
cd backend
cp .env.example .env
npm i
npm run dev
```

```bash
# Seed admin (optional via Mongo shell)
# db.users.insertOne({ email:'admin@test.com', password:'$2a$10$Cq2bqF8tQkq1oXn5nT9eQeJ2S9m1qf8n7cKqEw5uBv0kU7j3JYh8S', role:'admin' })
# (hash is 'password')
```

```bash
# Frontend
cd frontend
cp .env.example .env
npm i
npm run dev
```

```bash
# Admin
cd admin
cp .env.example .env
npm i
npm run dev
```

Set `VITE_API_URL` in both frontends to your backend URL.
Deploy:
- **Backend** on Render/railway: `npm start`
- **Frontend/Admin** on Vercel/Netlify: build with `vite build`.
```

