package com.fintrack.domain;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "tenants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "subdomain", nullable = false, unique = true)
    private String subdomain;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    
}
