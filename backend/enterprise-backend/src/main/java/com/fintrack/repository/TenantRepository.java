package com.fintrack.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fintrack.domain.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, UUID>{
    Optional<Tenant> findBySubdomain(String subdomani);
}
