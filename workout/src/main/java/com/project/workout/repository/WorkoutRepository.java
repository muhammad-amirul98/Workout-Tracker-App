package com.project.workout.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.project.workout.model.Workout;

public interface WorkoutRepository extends CrudRepository<Workout, Long> {
	
	Optional<Workout> findByName(String name);
	
	List<Workout> findByUserUsername(String username);
	
	Workout findByWorkoutId(Long id);
}
