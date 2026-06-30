package com.fintrack.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fintrack.domain.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
// In production, NEVER hardcode this. Inject it from environment variables.
@Value("${app.security.jwt.secret:v9B2xK7mPq4tW8zA1cX6rJ3kL5nN0pQ2sT4wY7zC9vB1xN3m}")
private String secretKey;

@Value("${app.security.jwt.expiration:86400000}") //24 hrs in milliseconds
private Long jwtExpiration;

private SecretKey getSigningKey() {
    byte[] keyBytes = this.secretKey.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
}

public String generateToken(User user){
    Map<String, Object> extraClaims = new HashMap<>();
    // Add tenant ID to the claims
    extraClaims.put("tenant_id", user.getTenant().getId().toString());
    extraClaims.put("role", user.getRole().name());
    extraClaims.put("firstName", user.getFirstName());
    extraClaims.put("lastName", user.getLastName());

    return buildToken(extraClaims, user.getUsername(), jwtExpiration);
}

private String buildToken(Map<String,Object> extraClaims, String subject, long expiration) {
    return Jwts.builder()
            .claims(extraClaims)
            .subject(subject)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), Jwts.SIG.HS256)
            .compact();

}

public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
}

public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
}

public String extractTenantId(String token) {
    return extractAllClaims(token).get("tenant_id", String.class);
}
public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
}
private boolean isTokenExpired(String token){
    return extractExpiration(token).before(new Date());

}
private Date extractExpiration(String token){
    return extractClaim(token, Claims::getExpiration);
}
private Claims extractAllClaims(String token){
    return Jwts.parser()
    .verifyWith(getSigningKey())
    .build()
    .parseSignedClaims(token)
    .getPayload();
}
}

