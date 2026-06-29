--Enums for strict state control
CREATE TYPE transaction_type as ENUM ('CREDIT', 'DEBIT');
CREATE TYPE ledger_status as ENUM ('PENDING', 'POSTED', 'REVERSED', 'REJECTED');

--1. Multi-Tenant Isolation Table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

--2. User Accounts (Bounded to Tenants)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_tenant_user_email UNIQUE (tenant_id, email)
);

--3. Financial Accounts (Asset, Liability, Equity, Revenue, Expense)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    account_number VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    current_balance NUMERIC(19,4) NOT NULL DEFAULT 0.0000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_tenant_account_name UNIQUE (tenant_id, account_number)
);


--4. Immutable Double-Entry Ledger Entries
CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
    type transaction_type NOT NULL,
    amount NUMERIC(19,4) NOT NULL,
    status ledger_status NOT NULL DEFAULT 'PENDING',
    reference_id VARCHAR(100), --For tracing cross-system receipts
    description TEXT,
    posted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Production Database Performance Optimizations Indices
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_accounts_tenant ON accounts(tenant_id);
CREATE INDEX idx_ledger_tenant_account ON ledger_entries(tenant_id, account_id);
CREATE INDEX idx_ledger_posted_at ON ledger_entries(posted_at) WHERE status = 'POSTED';
