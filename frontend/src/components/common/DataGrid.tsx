import React from "react";

interface Column<T>{
    header : string;
    accessor : (row : T) => React.ReactNode;
}

interface DataGridProps<T>{
    columns :Column<T>[];
    data : T[];
    isLoading: boolean;
    emptyMessage?: string;
}

export const DataGrid = <T, >({columns, data, isLoading, emptyMessage = "No records located."}: DataGridProps<T>) => {
        if (isLoading) {
            return(
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-8 h-8 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-400 font-medium">Fetching secure ledger information...</p>
                </div>
            );
        }
        if (data.length === 0) {
            return(
                <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
                    <p className="text-sm text-slate-400">{emptyMessage}</p>
                </div>
            );
        }

        return(
            <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {columns.map((col, idx) =>(
                            <th key={idx} className="px-6 py-4">{col.header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                        {data.map((row, rowIdx) =>(
                            <tr key={rowIdx} className="hover:bg-slate-800/30 transition-colors">
                                {columns.map((col, colIdx) =>(
                                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">{col.accessor(row)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }