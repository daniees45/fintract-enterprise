import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, bypass marketing page and jump directly to ledger operations
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <span>v2026 Stable Release</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
          The Immutable Ledger for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Enterprise SaaS</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Engineered with multi-tenant data isolation boundaries, zero-loss fixed decimal math accuracy, and real-time append-only accounting ledger streams.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/register" className="w-full sm:w-auto px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-center shadow-lg transition-colors">
            Create Corporate Account
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-lg text-center transition-colors">
            Sign In to Workspace
          </Link>
        </div>
      </div>
    </div>
  );
};