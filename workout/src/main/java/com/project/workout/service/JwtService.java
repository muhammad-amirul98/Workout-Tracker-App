package com.project.workout.service;

import java.security.Key;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService {
	static final long EXPIRATIONTIME = 864000000; //1 day in ms
	
	static final String PREFIX = "Bearer";
	
	//Generate secret key for demo. in prod, read from application configuration
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	//Generate signed JWT token
	public String getToken(String username, List<String> roles) {
		String token = Jwts.builder()
				.setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.claim("roles", roles)
				.signWith(key)
				.compact();
	
		return token;
	}
	
	public List<String> getRolesFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token.replace(PREFIX, ""))
				.getBody();
		
		return claims.get("roles", List.class);
	}
	
	//Get a token from request Authorization header, verify token and get username
	public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if (token != null) {
			String user = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();
			if (user != null) {
				return user;
			}
		}
		return null;
	}
}
