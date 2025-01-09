package com.project.workout.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.dto.WorkoutLogStatusDTO;
import com.project.workout.model.WorkoutLog;
import com.project.workout.model.WorkoutLogStatus;
import com.project.workout.repository.AppUserRepository;
import com.project.workout.repository.ExerciseRepository;
import com.project.workout.repository.WorkoutLogRepository;
import com.project.workout.repository.WorkoutRepository;
import com.project.workout.service.WorkoutLogService;

@RestController
@RequestMapping("/workoutLog/me")
public class WorkoutLogController {
	
//	private static final Logger logger = LoggerFactory.getLogger(WorkoutLogController.class);
	
	private final WorkoutLogService workoutLogService;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository userRepository;

    @Autowired
    public WorkoutLogController(
            WorkoutLogService workoutLogService,
            ExerciseRepository exerciseRepository,
            WorkoutRepository workoutRepository,
            AppUserRepository userRepository) {
        this.workoutLogService = workoutLogService;
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }
	
	@PostMapping
	public ResponseEntity<WorkoutLog> createWorkoutLog(@RequestBody WorkoutLog workoutLog) {
		 
		try {
            WorkoutLog createdLog = workoutLogService.createWorkoutLog(workoutLog);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdLog);
        } catch (Exception e) {
        	System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
	}
	
	
	@GetMapping
	public ResponseEntity<List<WorkoutLog>> getUserWorkoutLogs(Authentication authentication){
			
		String username = authentication.getName();
		
		List<WorkoutLog> workoutLogs = workoutLogService.getWorkoutLogsByUserUsername(username);
		
		return ResponseEntity.ok(workoutLogs);
	}
	
	
	//COMPLETED
	@PutMapping("/completed")
    public ResponseEntity<WorkoutLogStatusDTO> markWorkoutAsCompleted(@RequestBody WorkoutLogStatusDTO workoutLogStatusDTO) {
		WorkoutLogStatusDTO updatedWorkoutLog = workoutLogService.updateWorkoutStatus(
				workoutLogStatusDTO.getWorkoutLogId(), WorkoutLogStatus.COMPLETED, workoutLogStatusDTO.getEndTime());
        return ResponseEntity.ok(updatedWorkoutLog);
    }
	
	
	//CANCELLED
    @PutMapping("/cancelled")
    public ResponseEntity<WorkoutLogStatusDTO> markWorkoutAsCancelled(@RequestBody WorkoutLogStatusDTO workoutLogStatusDTO) {
    	WorkoutLogStatusDTO updatedWorkoutLog = workoutLogService.updateWorkoutStatus(
    			workoutLogStatusDTO.getWorkoutLogId(), WorkoutLogStatus.CANCELLED, workoutLogStatusDTO.getEndTime());
        return ResponseEntity.ok(updatedWorkoutLog);
    }
	

}
