package com.project.workout.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(path="test")
@RepositoryRestResource
public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
	
	//http://localhost:8080/api/exercises/search/findByNameIgnoreCaseContaining?name=tricep
	List<Exercise> findByNameIgnoreCaseContaining(@Param("name") String name);
	
	List<Exercise> findByBodyPartIgnoreCaseContaining(@Param("bodyPart") String bodyPart);
	
	//GET http://localhost:8080/api/exercises/search/findByNameOrBodyPartIgnoreCaseContaining?name=bench&bodyPart=chest
	List<Exercise> findByNameIgnoreCaseContainingOrBodyPartIgnoreCaseContaining(@Param("name") String name, 
			@Param("bodyPart") String bodyPart);
}

