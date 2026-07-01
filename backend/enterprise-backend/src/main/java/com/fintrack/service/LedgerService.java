package com.fintrack.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fintrack.domain.Account;
import com.fintrack.domain.LedgerEntry;
import com.fintrack.domain.User;
import com.fintrack.dto.AccountDto;
import com.fintrack.dto.PostTransactionRequest;
import com.fintrack.repository.AccountRepository;
import com.fintrack.repository.LedgerEntryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LedgerService {
    private final AccountRepository accountRepository;
    private final LedgerEntryRepository ledgerEntryRepository;

    public List<AccountDto> getTenantAccounts(User currentUser){
        UUID tenantId = currentUser.getTenant().getId();
        return accountRepository.findByTenantId(tenantId).stream()
        .map(acc -> new AccountDto(acc.getId(), acc.getAccountNumber(), acc.getName(), acc.getType(), acc.getCurrency(), acc.getCurrentBalance()))
        .collect(Collectors.toList());
    }

    @Transactional
    public LedgerEntry postTransaction(User currentUser, PostTransactionRequest request){
        UUID tenantId = currentUser.getTenant().getId();
        // 1. Fetch account ensuring absolute multi-tenant containment
        Account account = accountRepository.findById(request.accountId())
                            .filter(acc -> acc.getTenant().getId().equals(tenantId))
                            .orElseThrow(() -> new IllegalArgumentException("Target accounting profile not found"));

        // 2. Adjust financial balances based on absolute Double-Entry principles
        if ("DEBIT".equalsIgnoreCase(request.type())) {
            account.setCurrentBalance(account.getCurrentBalance().add(request.amount()));
        } else if ("CREDIT".equalsIgnoreCase(request.type())) {
            account.setCurrentBalance(account.getCurrentBalance().subtract(request.amount()));
        } else {
            throw new IllegalArgumentException("Invalid transaction vector type.");
        }
        accountRepository.save(account);

        LedgerEntry entry = LedgerEntry.builder()
        .tenant(currentUser.getTenant())
        .account(account)
        .type(request.type().toUpperCase())
        .amount(request.amount())
        .status("POSTED")
        .referenceId(request.referenceId())
        .description(request.description())
        .postedAt(OffsetDateTime.now())
        .build();

        return ledgerEntryRepository.save(entry);

    }
}
