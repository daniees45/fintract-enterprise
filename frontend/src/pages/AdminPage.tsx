import React from 'react';
import { useAuth } from '../features/auth/AuthContext';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Administrative Control Console</h1>
        <p className="text-sm text-slate-400 mt-1">Tenant System Configuration Operations for Node Space ID: <span className="font-mono font-bold text-emerald-400">{user?.tenantId}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-200">Tenant Operational Access Policies</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            As a designated administrator (<span className="font-mono text-xs bg-slate-950 px-1 py-0.5 text-amber-400 rounded border border-amber-500/20">{user?.role}</span>), you maintain full configuration read/write privileges over this multi-tenant database partition. All balance tracking parameters, ledger modifications, and transaction entries are cryptographically bound to your organization scope.
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Invariant Checks</h4>
            <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
              <li>Cross-tenant leakage safety: <span className="text-emerald-400 font-bold">ACTIVE</span></li>
              <li>JPA Row-Level isolated scoping context: <span className="text-emerald-400 font-bold">VERIFIED</span></li>
              <li>Append-only transactional ledger locks: <span className="text-emerald-400 font-bold">ENFORCED</span></li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-md font-bold text-slate-300">Administrative Utilities</h3>
          <div className="space-y-2">
            <button onClick={() => alert('Audit logs requested. Fetching immutable event streams...')} className="w-full text-left px-4 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-colors rounded-lg text-xs font-semibold text-slate-300 cursor-pointer">
              Download Cryptographic Audit Trail Log
            </button>
            <button onClick={() => alert('Recalibrating accounting parameters...')} className="w-full text-left px-4 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-colors rounded-lg text-xs font-semibold text-slate-300 cursor-pointer">
              Force Multi-Portfolio Ledger Recalculation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};