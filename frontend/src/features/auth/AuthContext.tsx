import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserContext, AuthResponse } from '../../types/auth.types';

interface AuthContextType {
  user: UserContext | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserContext | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt restoration of session context from safe storage on startup
    const storedToken = localStorage.getItem('fintrack_token');
    const storedUser = localStorage.getItem('fintrack_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (authData: AuthResponse) => {
    const parsedUser: UserContext = {
      email: authData.email,
      role: authData.role as UserContext['role'],
      tenantId: authData.tenantId,
    };

    setToken(authData.token);
    setUser(parsedUser);
    
    localStorage.setItem('fintrack_token', authData.token);
    localStorage.setItem('fintrack_user', JSON.stringify(parsedUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('fintrack_token');
    localStorage.removeItem('fintrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to abstract consumption of AuthContext securely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be consumed within an explicit AuthProvider wrapper scope');
  }
  return context;
};