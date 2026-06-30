package com.fintrack.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fintrack.domain.Role;
import com.fintrack.domain.Tenant;
import com.fintrack.domain.User;
import com.fintrack.dto.AuthResponse;
import com.fintrack.dto.LoginRequest;
import com.fintrack.dto.RegisterRequest;
import com.fintrack.repository.TenantRepository;
import com.fintrack.repository.UserRepository;
import com.fintrack.security.JwtService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse registerTenant(RegisterRequest request) {
        
        Tenant tenant = Tenant.builder()
        .companyName(request.companyName())
        .subdomain(request.subdomain().toLowerCase().trim())
        .build();

        User user = User.builder()
        .tenant(tenant)
        .email(request.email())
        .password(passwordEncoder.encode(request.password()))
        .firstName(request.firstName())
        .lastName(request.lastName())
        .role(Role.ROLE_ADMIN)
        .build();

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken, user.getEmail(), user.getRole().name(), tenant.getId().toString());
    } 

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email()
        , request.password()));

        User user = userRepository.findByEmail(request.email())
        .orElseThrow( ()->  new IllegalArgumentException("Invalid email or password"));
        
        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken, user.getEmail(), user.getRole().name(), user.getTenant().getId().toString());
    }
}
