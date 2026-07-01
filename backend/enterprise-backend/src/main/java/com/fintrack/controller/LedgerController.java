package com.fintrack.controller;

import java.util.List;

import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintrack.domain.LedgerEntry;
import com.fintrack.domain.User;
import com.fintrack.dto.AccountDto;
import com.fintrack.dto.PostTransactionRequest;
import com.fintrack.service.LedgerService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/ledger")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LedgerController {
        private final LedgerService ledgerService;

        @GetMapping("/accounts")
        public ResponseEntity<List<AccountDto>> getAccounts(@AuthenticationPrincipal User user) {
            return ResponseEntity.ok(ledgerService.getTenantAccounts(user));
        }
        
        @PostMapping("/transactions")
        public ResponseEntity<LedgerEntry> postTransaction(@AuthenticationPrincipal User currentUser,
            @RequestBody PostTransactionRequest request
        ) {
            
            return ResponseEntity.ok(ledgerService.postTransaction(currentUser, request));
        }
        
}
