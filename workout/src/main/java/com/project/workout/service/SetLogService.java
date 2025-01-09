package com.project.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.workout.model.ExerciseLog;
import com.project.workout.model.SetLog;
import com.project.workout.repository.ExerciseLogRepository;
import com.project.workout.repository.SetLogRepository;

@Service
public class SetLogService {
	
	private final ExerciseLogRepository exerciseLogRepository;
    private final SetLogRepository setLogRepository;

    @Autowired
    public SetLogService(
        ExerciseLogRepository exerciseLogRepository,
        SetLogRepository setLogRepository
    ) {
        this.exerciseLogRepository = exerciseLogRepository;
        this.setLogRepository = setLogRepository;
    }
    
    public SetLog createSetLog(Long exerciseLogId, int setNumber, int reps, double weight) {
        ExerciseLog exerciseLog = exerciseLogRepository.findById(exerciseLogId)
            .orElseThrow(() -> new IllegalArgumentException("ExerciseLog not found with ID: " + exerciseLogId));

        SetLog setLog = new SetLog(exerciseLog, setNumber, reps, weight);
        return setLogRepository.save(setLog);
    }
	
}
