package com.project.workout.domain;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface WorkoutRepository extends CrudRepository<Workout, Long> {
	
	Optional<Workout> findByName(String name);
}
