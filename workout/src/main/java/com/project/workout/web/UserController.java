package com.project.workout.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@RestController
@RequestMapping("/users/me")
public class UserController {
	
	@Autowired
	private WorkoutRepository workoutRepository;
	
	
	@GetMapping("/workouts")
	public ResponseEntity<List<Workout>> getUserWorkouts(Authentication authentication) {
//	    if (authentication == null || !authentication.isAuthenticated()) {
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthenticated");
//	    }

	    String username = authentication.getName(); // Extract username from Principal


	    List<Workout> workouts = workoutRepository.findByUserUsername(username);
	    return ResponseEntity.ok(workouts);
	}

}
