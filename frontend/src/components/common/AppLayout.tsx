import type React from "react";
import { useAuth } from "../../features/auth/AuthContext";
import { Link, Outlet } from "react-router-dom";

export const AppLayout : React.FC = () => {
    const {user, logout} = useAuth();

    return(
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-xl font-black tracking-tight hover:opacity-90" >
                    Fintrack <span className="text-emerald-400">Enterprise</span>
                    </Link>
                    <div className="hidden md:flex space-x-4 text-sm font-medium text-slate-400">
                        <Link to="/dashboard" className="hover: text-emerald-400">
                            {user?.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="hover:text-emerald-400 transition-colors border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/5"> Admin Console</Link>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xc font-semibold text-slate-200">{user?.email}</p>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{user?.role}</p>
                        </div>
                        <button onClick={logout} className="px-3 py-1.5 text-xs font-bold bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                            Sign out
                        </button>
                </div>
            </nav>
            <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    <Outlet/>
            </main>
        </div>
    )
}