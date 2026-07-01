import React, { useState } from 'react';
import { useLedger } from '../features/ledger/LedgerContext';
import { DataGrid } from '../components/common/DataGrid';
import {type Account } from '../types/ledger.types';
import { useAuth } from '../features/auth/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { accounts, isLoading, submitTransaction } = useLedger();
  
  // Local state for controlling modal execution loop
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [txType, setTxType] = useState<'DEBIT' | 'CREDIT'>('DEBIT');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute aggregate total portfolio balances across asset definitions
  const totalAssets = accounts
    .filter(a => a.type === 'ASSET')
    .reduce((sum, current) => sum + current.currentBalance, 0);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccountId || !amount) return;
    
    setIsSubmitting(true);
    try {
      await submitTransaction({
        accountId: selectedAccountId,
        type: txType,
        amount: parseFloat(amount),
        referenceId: `TX-REF-${Date.now().toString().substring(8)}`,
        description
      });
      setAmount('');
      setDescription('');
      alert('Double-entry ledger entry executed securely.');
    } catch (err: any) {
      alert(`Posting rejected: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: "Account Number", accessor: (row: Account) => <span className="font-mono text-emerald-400 font-semibold">{row.accountNumber}</span> },
    { header: "Account Identity", accessor: (row: Account) => <span className="font-medium text-slate-100">{row.name}</span> },
    { header: "Classification", accessor: (row: Account) => <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700">{row.type}</span> },
    { header: "Net Liquid Balance", accessor: (row: Account) => <span className={`font-mono font-bold ${row.currentBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{row.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {row.currency}</span> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      {/* Header Module */}
      <div className="flex justify-between items-center mb-10 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">System <span className="text-emerald-400">Ledger</span> Matrix</h1>
          <p className="text-sm text-slate-400 mt-1">Tenant Subdomain Scope Context ID: <span className="font-mono text-slate-300 font-bold">{user?.tenantId}</span></p>
        </div>
        <button onClick={logout} className="px-4 py-2 text-sm font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors cursor-pointer">
          Disconnect Session
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Aggregate Tenant Liquidity</p>
          <p className="text-4xl font-black mt-2 font-mono text-emerald-400">${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-sm text-slate-500 font-normal">USD</span></p>
        </div>
      </div>

      {/* Primary Execution Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Ledger Tables View */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold tracking-tight text-slate-300">Monitored Corporate Portfolios</h3>
          <DataGrid columns={columns} data={accounts} isLoading={isLoading} />
        </div>

        {/* Right Side: Double-Entry Operational Form */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-fit shadow-2xl backdrop-blur-sm">
          <h3 className="text-lg font-bold tracking-tight text-slate-200 mb-4">Post Structural Ledger Event</h3>
          <form onSubmit={handlePost} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Target Account Profile</label>
              <select 
                value={selectedAccountId} 
                onChange={e => setSelectedAccountId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- Core Account Vector --</option>
                {accounts.map(acc => (
                  <option key={acc.id.toString()} value={acc.id.toString()}>{acc.name} ({acc.accountNumber})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Entry Structural Alignment</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setTxType('DEBIT')} className={`py-2 text-xs font-bold rounded-lg border transition-colors ${txType === 'DEBIT' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>DEBIT (+)</button>
                <button type="button" onClick={() => setTxType('CREDIT')} className={`py-2 text-xs font-bold rounded-lg border transition-colors ${txType === 'CREDIT' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>CREDIT (-)</button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Transaction Value (USD)</label>
              <input 
                type="number" 
                step="0.0001"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.0000"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Operational Manifest Description</label>
              <textarea 
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe bookkeeping event details..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !selectedAccountId || !amount}
              className="w-full py-2.5 px-4 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold rounded-lg text-sm transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Committing Ledger Record...' : 'Execute Transaction Block'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};