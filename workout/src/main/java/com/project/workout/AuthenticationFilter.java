package com.project.workout;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.workout.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthenticationFilter extends OncePerRequestFilter{
	private final JwtService jwtService;
	
	public AuthenticationFilter(JwtService jwtService) {
		this.jwtService = jwtService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
			FilterChain filterChain) throws ServletException, java.io.IOException {
		//Get token from authorization header
		String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (jws != null && jws.startsWith("Bearer ")) {
			//Verify token and get user
			String user = jwtService.getAuthUser(request);
			//get roles
			List<String> roles = jwtService.getRolesFromToken(jws);
			List<SimpleGrantedAuthority> authorities = roles.stream()
					.map(role -> new SimpleGrantedAuthority("ROLE_" + role))
					.toList();
			//Authenticate
			Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
					authorities);
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		filterChain.doFilter(request, response);
	}
}
