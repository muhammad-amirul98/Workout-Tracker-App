package com.project.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.workout.model.Exercise;
import com.project.workout.model.ExerciseLog;
import com.project.workout.model.SetLog;
import com.project.workout.model.WorkoutLog;
import com.project.workout.repository.ExerciseLogRepository;
import com.project.workout.repository.ExerciseRepository;
import com.project.workout.repository.WorkoutLogRepository;

@Service
public class ExerciseLogService {
	
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
	    WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
	            .orElseThrow(() -> new RuntimeException("WorkoutLog not found"));
	    
	    Exercise exercise = exerciseRepository.findById(exerciseId)
	            .orElseThrow(() -> new RuntimeException("Exercise not found"));
	    
	    ExerciseLog exerciseLog = new ExerciseLog();
	    exerciseLog.setWorkoutLog(workoutLog);
	    exerciseLog.setExercise(exercise); // Linking to the actual exercise

	    return exerciseLogRepository.save(exerciseLog); 
	}
	
	

}
