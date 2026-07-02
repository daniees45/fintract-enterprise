import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../features/auth/AuthContext';
import type { AuthResponse } from '../types/auth.types';

export const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const { request, loading, error } = useApi();
  const navigate = useNavigate();

  // Unified structural payload mapping state
  const [formData, setFormData] = useState({
    companyName: '',
    subdomain: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Execute registration call against our public registration API route mapping
      const response = await request<AuthResponse>('/api/v1/auth/register', {
        method: 'POST',
        body: formData,
      });
      
      // Seed global authentication state with received access token profile
      login(response);
      navigate('/dashboard');
    } catch (err) {
      // Error handling is gracefully side-managed by the native hook state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-xl space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Initialize Corporate Node</h2>
          <p className="mt-2 text-sm text-slate-400">Establish your isolated cloud billing partition and admin console</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center font-medium">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Company Identity</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Isolated Subdomain Routing Key</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg overflow-hidden focus-within:border-emerald-500 transition-colors">
                <input type="text" name="subdomain" required value={formData.subdomain} onChange={handleChange} placeholder="acme" className="w-full px-4 py-2 bg-transparent text-sm text-white focus:outline-none" />
                <span className="bg-slate-900 px-3 text-slate-500 font-mono text-xs border-l border-slate-800">.fintrack.app</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Root Administrator Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="admin@company.com" className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Access Passphrase</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg shadow-lg transition-colors cursor-pointer">
            {loading ? 'Initializing Cloud Architecture Partition...' : 'Deploy Secure Domain Node'}
          </button>

          <p className="text-center text-xs text-slate-500">
            Node already registered? <Link to="/login" className="text-emerald-400 hover:underline">Sign in instead</Link>
          </p>
        </form>
      </div>
    </div>
  );
};