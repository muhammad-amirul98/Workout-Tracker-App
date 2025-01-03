package com.project.workout.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.model.AccountCredentials;
import com.project.workout.service.JwtService;

@RestController
public class LoginController {
		private final JwtService jwtService;
		private final AuthenticationManager authenticationManager;
		
		public LoginController(JwtService jwtService, AuthenticationManager authenticationManager) {
			this.jwtService = jwtService;
			this.authenticationManager = authenticationManager;
		}
		
		@PostMapping("/login")
		public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
			UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(
					credentials.username(), credentials.password());
			Authentication auth = authenticationManager.authenticate(creds);
			
			//Extract roles from authenticated user
			List<String> roles = auth.getAuthorities().stream()
					.map(authority -> authority.getAuthority().replace("ROLE_", ""))
					.toList();
			
			//Generate Token
			String jwts = jwtService.getToken(auth.getName(), roles);
			
			//Build response with the generated token
			return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION,
					"Bearer " + jwts).header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS,
					"Authorization").build();
			
		}
}
