package com.fintrack.dto;

public record LoginRequest(
    String email,
    String password
) {

}
