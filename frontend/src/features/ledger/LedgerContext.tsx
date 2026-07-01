import React, {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import type { Account, LedgerEntry, PostTransactionPayload } from "../../types/ledger.types";
import { useApi } from "../../hooks/useApi";

interface LedgerContextType{
    accounts : Account[];
    transactions : LedgerEntry[];
    isLoading: boolean;
    refreshLedgerData : () => Promise<void>;
    submitTransaction : (payload : PostTransactionPayload) => Promise<void>;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider : React.FC<{children: ReactNode}> = ({children}) =>{
    const {request} = useApi();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshLedgerData = async () => {
        try {
            const accountsData = await request<Account[]>('/api/v1/ledger/accounts');
            setAccounts(accountsData);
            setTransactions([]);
        } catch (error) {
            console.error("Ledger structural sync aborted:", error);
        }finally{
            setIsLoading(false);
        }
    };

    const submitTransaction = async (payload : PostTransactionPayload) =>{
        await request<LedgerEntry>('/api/v1/ledger/transactions', { 
            method: 'POST',
            body : payload
        });

        await refreshLedgerData();
    };

    useEffect(() => {
        refreshLedgerData();
    }, []);

    return(
        <LedgerContext.Provider value={{accounts, transactions, isLoading, refreshLedgerData, submitTransaction}}>
            {children}
        </LedgerContext.Provider>
    );

};

export const useLedger = () => {
    const context = useContext(LedgerContext);
    if (!context) throw new Error('useLedger must be bound within a structural LedgerProvider scope');
    return context;
}