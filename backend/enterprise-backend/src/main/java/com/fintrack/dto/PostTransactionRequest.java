package com.fintrack.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record PostTransactionRequest(
    UUID accountId,
    String type,
    BigDecimal amount,
    String referenceId,
    String description
) {
}
