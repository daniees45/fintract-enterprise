export interface UserContext{
    email : string;
    role : 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_AUDITOR';
    tenantId: string;
}

export interface AuthResponse{
    token : string;
    email: string;
    role : string;
    tenantId : string;
}