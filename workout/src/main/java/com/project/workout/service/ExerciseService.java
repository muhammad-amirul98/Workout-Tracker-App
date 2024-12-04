package com.project.workout.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.project.workout.domain.Exercise;

@Service
public class ExerciseService {
	@PreAuthorize("hasRole('USER')")
	public void updateExercise(Exercise exercise) {
		
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteExercise(Exercise exercise) {
		
	}
}
