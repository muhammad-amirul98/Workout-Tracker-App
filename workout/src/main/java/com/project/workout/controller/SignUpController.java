package com.project.workout.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.domain.AppUser;
import com.project.workout.exception.UserAlreadyExistsException;
import com.project.workout.service.UserService;

@RestController
public class SignUpController {
	
	private final UserService userService;
	
	public SignUpController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody AppUser user) {
		if (user.getUsername() == null || 
				user.getPassword() == null ||
				user.getEmail() == null) {
			return ResponseEntity.badRequest().
					body("Username, password and email required");
		}
		
		try {
			AppUser newUser = userService.createUser(user);
			
			return ResponseEntity.ok("User Registered Successfully");
			
		} catch (UserAlreadyExistsException e) {
//			return ResponseEntity.status(500).
//					body(e.getMessage());
			throw e;
		}
	}
	

		
}
