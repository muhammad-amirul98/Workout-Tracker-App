package com.project.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.model.ExerciseLog;
import com.project.workout.service.ExerciseLogService;

@RestController
@RequestMapping("/exerciseLog")
public class ExerciseLogController {
	
	
    private final ExerciseLogService exerciseLogService;
    
    @Autowired
    public ExerciseLogController(ExerciseLogService exerciseLogService) {
    	this.exerciseLogService = exerciseLogService; 
    }
    
    @PostMapping 
    public ResponseEntity<ExerciseLog> createExerciseLog(
    		@RequestParam Long workoutLogId, // workoutLogId from query params
            @RequestParam Long exerciseId   // exerciseId from query params
            ) {
    	try {
    		ExerciseLog createdExerciseLog = exerciseLogService.createExerciseLog(workoutLogId, exerciseId);
            return new ResponseEntity<>(createdExerciseLog, HttpStatus.CREATED);
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
    }

}
