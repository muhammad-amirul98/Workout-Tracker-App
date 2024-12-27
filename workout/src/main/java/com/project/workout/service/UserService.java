package com.project.workout.service;



import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.workout.domain.AppUser;
import com.project.workout.domain.AppUserRepository;
import com.project.workout.exception.UserAlreadyExistsException;


@Service
public class UserService {
	
	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(AppUserRepository appUserRepository,
			PasswordEncoder passwordEncoder) {
		this.appUserRepository = appUserRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	
	public AppUser createUser(AppUser user) {
		if (appUserRepository.existsByUsername(user.getUsername())) {
			throw new UserAlreadyExistsException("Username already exists: " 
		+ user.getUsername());
		}
		
		if (appUserRepository.existsByEmail(user.getEmail())) {
			throw new UserAlreadyExistsException("Email already exists: "
		+ user.getEmail());
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));

        return appUserRepository.save(user);
	}
	
}
