package com.fintrack.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record AccountDto(
    UUID id,
    String accountNumber,
    String name,
    String type,
    String currency,
    BigDecimal currentBalance
) {

}
