# 🚀 FlowSync | VS Code Aesthetic CRM

FlowSync is a high-performance, developer-centric CRM designed for seamless project management between clients and development teams. Built with a **VS Code-inspired design system**, it offers a professional, diagnostic-first interface for managing project lifecycles.

![FlowSync Dashboard](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000)

## 🌌 Design Philosophy
FlowSync breaks away from generic SaaS designs by adopting a **"Developer Workspace"** aesthetic:
- **Editor-Themed UI**: Uses deep grays (`#0d1117`), monospaced typography, and diagnostic-style labels.
- **Micro-interactions**: Powered by `Framer Motion` for tactile feedback and smooth transitions.
- **Role-Centric Workspaces**: Distinct environments tailored for Administrative oversight and Client collaboration.

## 🛠️ Key Features

### 👔 Admin Workspace (The Command Center)
- **Live Analytics**: Dynamic bar charts (Recharts) visualizing resource distribution across `PENDING`, `IN_PROGRESS`, and `STABLE` stages.
- **Resource Management**: High-density data table with real-time **Search**, **Multi-Status Filtering**, and **Bulk Actions**.
- **Hover Kanban**: A unique, non-drag status update board using hover overlays for precision state transitions.
- **Automated Workflows**: Status updates (e.g., to `REVIEW`) automatically recalculate project progress metrics.

### 👤 Customer Workspace (The Client Portal)
- **Project Initialization**: A stylized configuration form for deploying new project requests.
- **Deployment Stream**: A real-time activity log showing milestones from initialization to final release.
- **Interactive Details**: Granular views of project specs, assigned development units, and communication logs.

## 🧱 Technical Architecture
- **Frontend**: `React 18` + `Vite` for blazing fast HMR.
- **Styling**: `Tailwind CSS v4` with a custom-engineered VS Code color palette.
- **State Management**: `TanStack Query (v5)` for efficient server-state synchronization and caching.
- **Backend**: `Node.js` + `Express` with a secure JWT authentication layer.
- **Persistence**: Lightweight JSON-based persistence layer—ideal for portable demos and rapid prototyping.

## 🚦 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/flowsync-crm.git
cd flowsync-crm
```

### 2. Launch Backend
```bash
cd backend
npm install
npm start # Running on http://localhost:5000
```

### 3. Launch Frontend
```bash
cd frontend
npm install
npm run dev # Running on http://localhost:5173
```

## 🔑 Access Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@gmail.com` | `admin123!` |
| **Customer** | `customer@gmail.com` | `customer123!` |

---

Developed with ❤️ for the modern development workflow.
