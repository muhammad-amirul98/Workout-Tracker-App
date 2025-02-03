package com.project.workout.controller;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.dto.ExerciseLogDTO;
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
    		@RequestBody ExerciseLogDTO exerciseLogDTO
            ) {
    	try {
    		System.out.println("create exercise log");
    		ExerciseLog createdExerciseLog = exerciseLogService.createExerciseLog(exerciseLogDTO.getWorkoutLogId(), exerciseLogDTO.getExerciseId());
    		System.out.println("create exercise log successful");
            return new ResponseEntity<>(createdExerciseLog, HttpStatus.CREATED);
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
    }

}
