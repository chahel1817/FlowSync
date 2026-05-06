# FlowSync CRM Dashboard

A premium Project Management CRM built with the MERN stack (Node.js + React) using JSON for persistent storage.

## Features
- **Modern UI/UX**: Built with Tailwind CSS, Framer Motion, and Lucide Icons.
- **Role-Based Access**: Separate dashboards for Admins and Customers.
- **Admin Dashboard**: Overview stats, charts (Recharts), and recent activity.
- **Project Management**: Interactive table with filtering and search.
- **Kanban Board**: Visual project tracking across different stages.
- **Customer Portal**: Project creation and progress tracking.
- **Authentication**: JWT-based secure login system.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Query, React Router, Framer Motion.
- **Backend**: Node.js, Express, JWT, BcryptJS.
- **Database**: JSON file storage (`projects.json`, `users.json`).

## Getting Started

### Prerequisites
- Node.js installed

### Installation & Running

1. **Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Default Credentials
- **Admin**: `admin@gmail.com` / `admin123`
- **Customer**: `customer@gmail.com` / `customer123`
