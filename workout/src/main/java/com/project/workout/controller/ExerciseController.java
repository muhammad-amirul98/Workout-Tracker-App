//package com.project.workout.web;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.project.workout.domain.AppUser;
//import com.project.workout.domain.AppUserRepository;
//import com.project.workout.domain.Exercise;
//import com.project.workout.domain.ExerciseRepository;
//import com.project.workout.domain.WorkoutRepository;
//
//@RestController
//@RequestMapping("/exercises/me")
//public class ExerciseController {
//	
//	@Autowired
//	private final ExerciseRepository exerciseRepository;
//	@Autowired
//	private final WorkoutRepository workoutRepository;
//	@Autowired
//	private final AppUserRepository userRepository;
//	
//	public ExerciseController(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository, AppUserRepository userRepository  ) {
//		this.exerciseRepository = exerciseRepository;
//		this.userRepository = userRepository;
//		this.workoutRepository = workoutRepository;
//	}
//	
//	@PostMapping
//	public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise, Long workoutId, Authentication authentication) {
//		String username = authentication.getName();
//		
//		Optional<AppUser> userOptional = userRepository.findByUsername(username);
//        if (userOptional == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
//        }
//        
//        AppUser user = userOptional.get();
//        
//        return null;
//        
//	}
//	
//
//	
//
//}
//package com;


