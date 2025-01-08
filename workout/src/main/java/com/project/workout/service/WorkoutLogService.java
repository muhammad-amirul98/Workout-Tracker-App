package com.project.workout.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.project.workout.model.Workout;
import com.project.workout.model.WorkoutLog;
import com.project.workout.repository.AppUserRepository;
import com.project.workout.repository.WorkoutLogRepository;
import com.project.workout.repository.WorkoutRepository;

@Service
public class WorkoutLogService {
	
	
	private final WorkoutLogRepository workoutLogRepository;
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository userRepository;

    @Autowired
    public WorkoutLogService(
        WorkoutLogRepository workoutLogRepository, 
        WorkoutRepository workoutRepository, 
        AppUserRepository userRepository
    ) {
        this.workoutLogRepository = workoutLogRepository;
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }
   
    // CREATE
    public WorkoutLog createWorkoutLog(WorkoutLog workoutLog) {
    	Workout workout = workoutRepository.findById(workoutLog.getWorkout().getWorkoutId())
    		    .orElseThrow(() -> new ResourceNotFoundException("Workout not found for ID: " + workoutLog.getWorkout().getWorkoutId()));

    	workoutLog.setUser(workout.getUser());
    	
        return workoutLogRepository.save(workoutLog);
    }

    // READ - Get by ID
    public WorkoutLog getWorkoutLogById(Long id) {
        return workoutLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WorkoutLog not found for id: " + id));
    }
    
    // READ - Get all
    public List<WorkoutLog> getAllWorkoutLogs() {
        return (List<WorkoutLog>) workoutLogRepository.findAll();
    }
    
    // UPDATE
    public WorkoutLog updateWorkoutLog(Long id, WorkoutLog updatedWorkoutLog) {
        WorkoutLog existingWorkoutLog = getWorkoutLogById(id); // Fetch and validate

        // Update fields
        existingWorkoutLog.setStartTime(updatedWorkoutLog.getStartTime());
        existingWorkoutLog.setEndTime(updatedWorkoutLog.getEndTime());
        existingWorkoutLog.setStatus(updatedWorkoutLog.getStatus());
        existingWorkoutLog.setExerciseLogs(updatedWorkoutLog.getExerciseLogs());

        return workoutLogRepository.save(existingWorkoutLog); // Save changes
    }
    
    // DELETE
    public void deleteWorkoutLog(Long id) {
        WorkoutLog workoutLog = getWorkoutLogById(id); // Validate if it exists
        workoutLogRepository.delete(workoutLog);
    }
    
    
    // FIND ALL BY USER ID
    public List<WorkoutLog> getWorkoutLogsByUserUsername(String username) {
        return workoutLogRepository.findByUserUsername(username);
    }
}
