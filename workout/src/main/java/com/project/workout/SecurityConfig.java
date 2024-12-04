package com.project.workout;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;

import com.project.workout.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
//	for in-memory user
//	@Bean
//	public InMemoryUserDetailsManager userDetailsService() {
//		UserDetails user = User.builder().username("user").password(passwordEncoder().encode("password"))
//				.roles("USER").build();
//		
//		return new InMemoryUserDetailsManager(user);
//	}
	
	private final UserDetailsServiceImpl userDetailsService;
	private final AuthenticationFilter authenticationFilter;
	private final AuthEntryPoint exceptionHandler;
	
	public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthenticationFilter authenticationFilter,
			AuthEntryPoint exceptionHandler) {
		this.userDetailsService = userDetailsService;
		this.authenticationFilter = authenticationFilter;
		this.exceptionHandler = exceptionHandler;
	}
	
	public void configureGlobal (AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	
	@Bean 
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf((csrf) -> csrf.disable())
		.cors(withDefaults()).sessionManagement((sessionManagement) -> sessionManagement.
				sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
		authorizeHttpRequests((authorizeHttpRequests) -> 
		authorizeHttpRequests.requestMatchers(HttpMethod.POST, "/login").permitAll().
		requestMatchers("/admin/**").hasRole("ADMIN").requestMatchers("/user/**").hasRole("USER").
		anyRequest().authenticated())
		.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
		.exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(exceptionHandler));
		
		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		// localhost:3000 is allowed, to explicitly define origins
//		config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(false);
		config.applyPermitDefaultValues();
		
		source.registerCorsConfiguration("/**", config);
		return source;
		
	}
 }
