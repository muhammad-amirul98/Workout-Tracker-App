package com.project.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.workout.model.Exercise;
import com.project.workout.model.ExerciseLog;
import com.project.workout.model.SetLog;
import com.project.workout.model.WorkoutLog;
import com.project.workout.repository.ExerciseLogRepository;
import com.project.workout.repository.ExerciseRepository;
import com.project.workout.repository.WorkoutLogRepository;

@Service
public class ExerciseLogService {
	
	private static final Logger logger = LoggerFactory.getLogger(ExerciseLogService.class);
	
	private final WorkoutLogRepository workoutLogRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseLogRepository exerciseLogRepository;

    @Autowired
    public ExerciseLogService(
        WorkoutLogRepository workoutLogRepository, 
        ExerciseRepository exerciseRepository,
        ExerciseLogRepository exerciseLogRepository
    ) {
        this.workoutLogRepository = workoutLogRepository;
        this.exerciseRepository = exerciseRepository;
        this.exerciseLogRepository = exerciseLogRepository;
    }
	
	public ExerciseLog createExerciseLog(Long workoutLogId, Long exerciseId) {
		
		logger.info("Creating ExerciseLog for workoutLogId={} and exerciseId={}", workoutLogId, exerciseId);
		
	    
	    WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
	            .orElseThrow(() -> {
	                logger.error("WorkoutLog with id={} not found", workoutLogId);
	                return new ResourceNotFoundException("WorkoutLog not found with id: " + workoutLogId);
	            });
	    
	    Exercise exercise = exerciseRepository.findById(exerciseId)
	            .orElseThrow(() -> {
	                logger.error("Exercise with id={} not found", exerciseId);
	                return new ResourceNotFoundException("Exercise not found with id: " + exerciseId);
	            });

	    
	    ExerciseLog exerciseLog = new ExerciseLog();
	    exerciseLog.setWorkoutLog(workoutLog);
	    exerciseLog.setExercise(exercise); // Linking to the actual exercise
	    
	    ExerciseLog savedExerciseLog = exerciseLogRepository.save(exerciseLog);
	    logger.info("ExerciseLog created successfully with id={}", savedExerciseLog.getId());

	    return savedExerciseLog; 
	}
	
	

}
