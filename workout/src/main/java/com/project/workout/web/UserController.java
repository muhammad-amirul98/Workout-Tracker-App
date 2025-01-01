package com.project.workout.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.domain.AppUser;
import com.project.workout.domain.AppUserRepository;
import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@RestController
@RequestMapping("/users/me")
public class UserController {
	
	@Autowired
	private WorkoutRepository workoutRepository;
	
	@Autowired
	private AppUserRepository userRepository;
	
	
	@GetMapping("/workouts")
	public ResponseEntity<List<Workout>> getUserWorkouts(Authentication authentication) {
//	    if (authentication == null || !authentication.isAuthenticated()) {
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthenticated");
//	    }

	    String username = authentication.getName(); // Extract username from Principal


	    List<Workout> workouts = workoutRepository.findByUserUsername(username);
	    return ResponseEntity.ok(workouts);
	}
	
	@PostMapping("/workouts")
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout, Authentication authentication) {
        String username = authentication.getName(); // Get the username from the Authentication

        // Find the logged-in user using the username
        Optional<AppUser> userOptional = userRepository.findByUsername(username);
        if (userOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
        }
        
        AppUser user = userOptional.get();

        // Set the user to the workout (to associate the workout with the logged-in user)
        workout.setUser(user);

        // Save the new workout to the database
        Workout savedWorkout = workoutRepository.save(workout);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedWorkout); // Return the created workout
    }

}
