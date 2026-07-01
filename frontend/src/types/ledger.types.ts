export interface Account{
    id : String;
    accountNumber : string;
    name : string;
    type : 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
    currency : string;
    currentBalance : number;
}

export interface LedgerEntry{
    id: string;
    type : 'DEBIT' | 'CREDIT';
    amount: number;
    status : 'PENDING' | 'POSTED' | 'REJECTED';
    referenceId : string | null;
    description : string | null;
    postedAt : string;
    createdAt : string
}

export interface PostTransactionPayload{
    accountId :  string;
    type : 'DEBIT' | 'CREDIT';
    amount : number;
    referenceId: string;
    description : string;
}