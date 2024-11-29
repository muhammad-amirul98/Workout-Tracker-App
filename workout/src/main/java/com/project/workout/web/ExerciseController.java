package com.project.workout.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.domain.Exercise;
import com.project.workout.domain.ExerciseRepository;

@RestController
public class ExerciseController {
	private final ExerciseRepository erepository;
	
	public ExerciseController(ExerciseRepository erepository ) {
		this.erepository = erepository;
	}
	
	@GetMapping("/exercises")
	public Iterable<Exercise> getExercises() {
		return erepository.findAll();
	}

}
