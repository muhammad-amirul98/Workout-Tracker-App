package com.project.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@Service
public class WorkoutService {
	
	@Autowired
	private WorkoutRepository workoutRepository;
	
	public Workout saveWorkout (Workout workout) {
		return workoutRepository.save(workout);
	}

}
