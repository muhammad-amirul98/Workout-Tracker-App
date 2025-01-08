package com.project.workout.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.project.workout.model.AppUser;
import com.project.workout.model.Exercise;
import com.project.workout.model.Workout;
import com.project.workout.repository.AppUserRepository;
import com.project.workout.repository.ExerciseRepository;
import com.project.workout.repository.WorkoutRepository;

@RestController
@RequestMapping("/workouts/me")
public class WorkoutController {
	
	@Autowired
	private final ExerciseRepository exerciseRepository;
	@Autowired
	private final WorkoutRepository workoutRepository;
	@Autowired
	private final AppUserRepository userRepository;
	private static final Logger logger = LoggerFactory.getLogger(WorkoutController.class);
	
	public WorkoutController(ExerciseRepository exerciseRepository, 
			WorkoutRepository workoutRepository, AppUserRepository userRepository ) {
		this.exerciseRepository = exerciseRepository;
		this.userRepository = userRepository;
		this.workoutRepository = workoutRepository;
	}
	
	@GetMapping()
	public ResponseEntity<List<Workout>> getUserWorkouts(Authentication authentication) {
//	    if (authentication == null || !authentication.isAuthenticated()) {
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthenticated");
//	    }

	    String username = authentication.getName(); // Extract username from Principal


	    List<Workout> workouts = workoutRepository.findByUserUsername(username);
	    return ResponseEntity.ok(workouts);
	}
	
	@PostMapping()
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout, Authentication authentication) {
        String username = authentication.getName(); // Get the username from the Authentication

        // Find the logged-in user using the username
        AppUser user = userRepository.findByUsername(username)
        	    .orElseThrow(() -> new ResourceNotFoundException("User not found for username: " + username));


        // Set the user to the workout (to associate the workout with the logged-in user)
        workout.setUser(user);

        // Save the new workout to the database
        Workout savedWorkout = workoutRepository.save(workout);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedWorkout); // Return the created workout
    }
	
	@PutMapping()
	public ResponseEntity<?> updateWorkout(@RequestBody Workout updatedWorkout, Authentication authentication) {
		String username = authentication.getName();
		
		Optional<AppUser> userOptional = userRepository.findByUsername(username);
		if (userOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
		}
		
		AppUser user = userOptional.get();
		
		
		
		Long workoutId = updatedWorkout.getWorkoutId();
		Workout existingWorkout = workoutRepository.findByWorkoutId(workoutId);
		
		if (!existingWorkout.getUser().getId().equals(user.getId())) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this workout");
	    }
		
		existingWorkout.setName(updatedWorkout.getName());
		existingWorkout.setType(updatedWorkout.getType());
		
		Workout savedWorkout = workoutRepository.save(existingWorkout);
		
		return ResponseEntity.ok(savedWorkout);
		
	}
	
	@DeleteMapping()
	public ResponseEntity<String> deleteWorkout(@RequestBody Workout workout, Authentication authentication) {
		String username = authentication.getName();
		
		Optional<AppUser> userOptional = userRepository.findByUsername(username);
		if (userOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
		}
		

		AppUser user = userOptional.get();
		
		
		workoutRepository.delete(workout);
		
		return ResponseEntity.ok("Workout deleted successfully");
		
	}
	
	@PostMapping("/{workoutId}") 
	public ResponseEntity<?> addExercise(@PathVariable("workoutId") Long workoutId, @RequestBody Exercise exercise, 
			Authentication authentication) {
		String username = authentication.getName();
//		logger.info("Attempting to add exercise. Username: {}", username);
//		
		Optional<AppUser> userOptional = userRepository.findByUsername(username);
		if (userOptional.isEmpty()) {
//			logger.warn("User not found: {}", username);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
		}
		
		AppUser user = userOptional.get();
//		logger.debug("User details received: {}", user.getUsername());
		
		Workout workout = workoutRepository.findByWorkoutId(workoutId);
//		logger.debug("Workout details received: {}", workout.getName());
		
		if (!workout.getUser().getId().equals(user.getId())) {
//			logger.warn("not authenticated");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authenticated");  // Forbidden if user is not the owner
        }
		
		exercise.setWorkout(workout);
		Exercise savedExercise = exerciseRepository.save(exercise);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(savedExercise);
	}
	
	@PutMapping("/exercise")
	public ResponseEntity<?> updateExercise(@RequestBody Exercise updatedExercise, 
			Authentication authentication) {
		String username = authentication.getName();
		
		Optional<AppUser> userOptional = userRepository.findByUsername(username);
		if(userOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		AppUser user = userOptional.get();
		
		Optional<Exercise> exerciseOptional = exerciseRepository.findById(updatedExercise.getId());
		if (exerciseOptional.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exercise not found");
	    }
		Exercise actualExercise = exerciseOptional.get();
		
		
		Workout workout = workoutRepository.findByWorkoutId(actualExercise.getWorkout().getWorkoutId());
		if (!workout.getUser().getId().equals(user.getId())) {
//			logger.warn("not authenticated");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authenticated");  // Forbidden if user is not the owner
        }
		
		actualExercise.setName(updatedExercise.getName());
		actualExercise.setBodyPart(updatedExercise.getBodyPart());
		actualExercise.setSets(updatedExercise.getSets());
		actualExercise.setReps(updatedExercise.getReps());
		actualExercise.setWeight(updatedExercise.getWeight());
		
		Exercise savedExercise = exerciseRepository.save(actualExercise);
		
		
		return ResponseEntity.status(HttpStatus.OK).body(savedExercise);	
		
	}
	
	@DeleteMapping("/exercise")
	public ResponseEntity<?> deleteExercise(@RequestBody Exercise exercise, 
			Authentication authentication) {
		String username = authentication.getName();
		
		AppUser user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
		
		Exercise actualExercise = exerciseRepository.findById(exercise.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise not found"));
		
		
		Workout workout = actualExercise.getWorkout();
				
		if (!workout.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You do not have permission to delete this exercise");  // Forbidden if user is not the owner
        }
		
		exerciseRepository.delete(actualExercise);
		
		return ResponseEntity.status(HttpStatus.OK).build();	
		
	}
	

}
