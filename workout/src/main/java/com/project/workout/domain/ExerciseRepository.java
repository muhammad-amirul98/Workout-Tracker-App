package com.project.workout.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
	
	List<Exercise> findByNameIgnoreCaseContaining(String name);
	
	List<Exercise> findByBodyPartIgnoreCaseContaining(String bodyPart);
	
	List<Exercise> findByNameOrBodyPartIgnoreCaseContaining(String name, String bodyPart);
}
