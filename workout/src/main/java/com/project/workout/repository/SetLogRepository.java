package com.project.workout.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.workout.model.ExerciseLog;
import com.project.workout.model.SetLog;
import com.project.workout.model.WorkoutLog;

public interface SetLogRepository extends CrudRepository<SetLog, Long> {
	
	
}
