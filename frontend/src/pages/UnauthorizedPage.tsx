import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold font-mono">!</div>
        <h2 className="text-2xl font-black text-white tracking-tight">Security Boundary Interception</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Your current cryptographic authentication role mapping credentials do not possess authorized entry clearances for this endpoint segment.
        </p>
        <div className="pt-2">
          <Link to="/dashboard" className="inline-block px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-lg text-emerald-400 tracking-wide transition-colors">
            Return to Core Ledger Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};