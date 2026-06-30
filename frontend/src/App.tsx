
import { AuthProvider } from './features/auth/AuthContext';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;