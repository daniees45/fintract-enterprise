package com.fintrack.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fintrack.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID>{
    List<Account> findByTenantId(UUID tenantId);

    Optional<Account> findByTenantIdAndAccountNumber(UUID tenantId, String accountNumber);
}
