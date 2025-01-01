//package com.project.workout.web;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.project.workout.domain.AppUser;
//import com.project.workout.domain.AppUserRepository;
//import com.project.workout.domain.Workout;
//import com.project.workout.domain.WorkoutRepository;
//import com.project.workout.service.WorkoutService;
//
//@RestController
//@RequestMapping("/workouts")
//public class WorkoutController {
//	
//	@Autowired
//	private WorkoutRepository workoutRepository;
//	
//	@Autowired
//	private AppUserRepository appUserRepository;
//	
//	@PostMapping
//	public ResponseEntity<?> createWorkout(@RequestBody Workout workoutRequest, Authentication authentication) {
//		String username = authentication.getName();
//		AppUser user = appUserRepository.findByUsername(username)
//				.orElseThrow(() -> new RuntimeException("User not found"));
//		Workout workout = new Workout(workoutRequest.getName(), workoutRequest.getType(), user);
//		Workout savedWorkout = workoutRepository.save(workout);
//		return ResponseEntity.status(HttpStatus.CREATED).body(savedWorkout);
//	}
//	
//}
