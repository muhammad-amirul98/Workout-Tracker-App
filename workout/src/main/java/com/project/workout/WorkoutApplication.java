package com.project.workout;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.workout.domain.Exercise;
import com.project.workout.domain.ExerciseRepository;
import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@SpringBootApplication
public class WorkoutApplication implements CommandLineRunner {
	private static final Logger logger = LoggerFactory.getLogger(WorkoutApplication.class);
	
	private final ExerciseRepository exerciseRepository;
	private final WorkoutRepository workoutRepository;
	
	public WorkoutApplication(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository) {
		this.exerciseRepository = exerciseRepository;
		this.workoutRepository = workoutRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(WorkoutApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		Workout workout1 = new Workout("My Workout", "Push");
		Workout workout2 = new Workout("My Second Workout", "Pull");
		this.workoutRepository.saveAll(Arrays.asList(workout1, workout2));
		
		
		this.exerciseRepository.save(new Exercise("tricep pulldown", "tricep", 3, 8, 12.5));
		this.exerciseRepository.save(new Exercise("bicep curl", "bicep", 4, 8, 15));
		this.exerciseRepository.save(new Exercise("bench press", "chest", 5, 5, 40));
		this.exerciseRepository.save(new Exercise("tricep pulldown", "tricep", 3, 8, 12.5, workout1));
		this.exerciseRepository.save(new Exercise("bicep curl", "bicep", 4, 8, 15, workout2));
		this.exerciseRepository.save(new Exercise("bench press", "chest", 5, 5, 40, workout1));
		
		for (Exercise exercise: exerciseRepository.findAll()) {
			logger.info("name: {}, sets: {}, reps: {}", 
					exercise.getName(), exercise.getSets(), exercise.getReps());
		}
		
	}

}
