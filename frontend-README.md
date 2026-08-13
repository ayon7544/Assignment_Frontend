# Assignment & Submission Management System — Frontend

A responsive web application for managing school assignments. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Role-based UI for Admin, Teacher, and Student
- JWT authentication with protected routes
- Admin dashboard: manage users, classes, subjects, teacher assignments, and student enrolments
- Teacher dashboard: create/edit/publish assignments, view submissions, grade and give feedback
- Student dashboard: view assignments, submit answers, track marks and feedback
- Form validation on all inputs
- Responsive layout for desktop and mobile

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| HTTP Client | Fetch API |
| Auth | JWT stored in localStorage |
| Deployment | Vercel |

## Project Structure

```
Assignment_Frontend/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── admin/
│   ├── teacher/
│   ├── student/
│   └── layout.tsx
├── components/
├── lib/
│   ├── api.ts           # API client helpers
│   └── auth.ts          # Auth utilities
├── types/               # TypeScript interfaces
├── .env.example
└── README.md
```

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- npm or yarn

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ayon7544/Assignment_Frontend.git
cd Assignment_Frontend
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5062
```

For production, set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm start
```

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@school.edu | Admin@123 |
| Teacher | teacher1@school.edu | Teacher@123 |
| Student | student1@school.edu | Student@123 |

## Live URLs

- **Frontend**: https://assignment-frontend-three-tau.vercel.app
- **Backend API**: https://assignment-backend-b924.onrender.com
- **Swagger UI**: https://assignment-backend-b924.onrender.com/swagger

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:5062` |

## Assumptions

- The frontend relies entirely on the backend API; no server-side data fetching is used for role-specific pages.
- JWT tokens are stored in `localStorage`. A production deployment should consider `httpOnly` cookies for improved security.
- Role detection and redirect logic happens client-side after login based on the `role` field in the JWT response.
