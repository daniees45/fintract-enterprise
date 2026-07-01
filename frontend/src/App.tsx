import React from 'react';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { LedgerProvider } from './features/ledger/LedgerContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

const NavigationRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">
        LOADING SECURE SECURITY SYSTEM SHIELD MATRIX...
      </div>
    );
  }

  return isAuthenticated ? (
    <LedgerProvider>
      <DashboardPage />
    </LedgerProvider>
  ) : (
    <LoginPage />
  );
};

function App() {
  return (
    <AuthProvider>
      <NavigationRouter />
    </AuthProvider>
  );
}

export default App;