import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';

interface FetchOptions extends RequestInit {
  body?: any;
}

export const useApi = () => {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    setLoading(true);
    setError(null);

    const targetUrl = url.startsWith('http') ? url : `http://localhost:8080${url}`;
    
    const headers = new Headers(options.headers);
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const response = await fetch(targetUrl, {
        ...options,
        headers,
        body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body
      });

      if (response.status === 401 || response.status === 403) {
        logout(); // Auto-expire credential session if token becomes invalid
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Execution Error: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (err: any) {
      const msg = err.message || 'An unknown networking anomaly occurred';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};