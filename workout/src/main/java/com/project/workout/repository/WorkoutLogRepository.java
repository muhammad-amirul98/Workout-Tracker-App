package com.project.workout.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.workout.model.WorkoutLog;

public interface WorkoutLogRepository extends CrudRepository<WorkoutLog, Long> {
	
	List<WorkoutLog> findByUserUsername(String username);
}
