package com.fintrack.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fintrack.domain.LedgerEntry;

@Repository
public interface LedgerEntryRepository  extends JpaRepository<LedgerEntry, UUID>{
    List<LedgerEntry> findByTenantIdOrderByCreatedAtDesc(UUID tenantId);

    List<LedgerEntry> findByTenantIdAndAccountIdOrderByCreatedAtDesc(UUID tenaantId, UUID accountId);
}
