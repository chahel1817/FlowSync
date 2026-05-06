import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectManagement from './pages/admin/ProjectManagement';
import KanbanBoard from './pages/admin/KanbanBoard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CreateProject from './pages/customer/CreateProject';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} /> {/* Reusing login for simplicity or can create signup */}

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="customers" element={<div className="p-8 text-center text-secondary">Customers Page (Coming Soon)</div>} />
          <Route path="analytics" element={<div className="p-8 text-center text-secondary">Analytics Page (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-secondary">Settings Page (Coming Soon)</div>} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={
          <ProtectedRoute allowedRole="customer">
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="projects" element={<CustomerDashboard />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="settings" element={<div className="p-8 text-center text-secondary">Settings Page (Coming Soon)</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
