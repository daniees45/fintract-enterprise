
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { LedgerProvider } from './features/ledger/LedgerContext';
import { AppLayout } from './components/common/AppLayout';

// View Components Imports
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { ProtectedRoute } from './routes/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Context Unauthenticated Routing Path Segments */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Secure Context Route Guard Boundary Layer */}
          <Route element={<ProtectedRoute />}>
            {/* Nested Layout Wrapper Scopes */}
            <Route element={
              <LedgerProvider>
                <AppLayout />
              </LedgerProvider>
            }>
              {/* Globally Permitted Authenticated Domain Dashboards */}
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Explicitly Isolated Administrative Control Segment */}
              <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>

          {/* Dynamic Catch-All Wildcard Route Interceptor to Prevent Broken Links */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;