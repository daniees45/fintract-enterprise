import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../features/auth/AuthContext';
import type { AuthResponse } from '../types/auth.types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { request, loading, error } = useApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await request<AuthResponse>('/api/v1/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      login(data);
      alert('Login successful! Welcome to FinTrack.');
    } catch (err) {
      // Errors are handled natively by useApi custom state engine
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white">
            FinTrack <span className="text-emerald-500">Enterprise</span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in to access your secure corporate billing ledger
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Corporate Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-sm font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-semibold shadow-lg transition-colors cursor-pointer"
          >
            {loading ? 'Validating Credentials...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};