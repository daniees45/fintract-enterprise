package com.fintrack.dto;

public record RegisterRequest (
    String companyName,
    String subdomain,
    String email,
    String password,
    String firstName,
    String lastName
){}
