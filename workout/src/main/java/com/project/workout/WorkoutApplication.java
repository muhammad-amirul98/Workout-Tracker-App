package com.project.workout;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import com.project.workout.domain.AppUser;
import com.project.workout.domain.AppUserRepository;
import com.project.workout.domain.Exercise;
import com.project.workout.domain.ExerciseRepository;
import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@SpringBootApplication
@EnableMethodSecurity
public class WorkoutApplication implements CommandLineRunner {
	private static final Logger logger = LoggerFactory.getLogger(WorkoutApplication.class);
	
	private final ExerciseRepository exerciseRepository;
	private final WorkoutRepository workoutRepository;
	private final AppUserRepository appUserRepository;
	
	public WorkoutApplication(ExerciseRepository exerciseRepository, 
			WorkoutRepository workoutRepository, AppUserRepository appUserRepository) {
		this.exerciseRepository = exerciseRepository;
		this.workoutRepository = workoutRepository;
		this.appUserRepository = appUserRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(WorkoutApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		
//		user: user, pass: user	
		AppUser user = new AppUser("user",
				"$2a$12$A8erCOL2GtJ8.qZlnXFYjuCLBjU34z6Och.oXnQ8CowweXmG87c/G",
				"USER", 
				"user@gmail.com");
		appUserRepository.save(user);
		
//		user: admin, pass: admin	
		AppUser admin = new AppUser("admin",
				"$2a$12$AjGhq1O2CW9Qqzysx.4xSupPZdJ/Bt94Pjm2af8w22UDC0wFhKcFu",
				"ADMIN","admin@gmail.com");
		appUserRepository.save(admin);
		
		Workout workout1 = new Workout("Push Workout", "Push", user);
		Workout workout2 = new Workout("Pull Workout", "Pull", admin);
		this.workoutRepository.saveAll(Arrays.asList(workout1, workout2));
		
		
		this.exerciseRepository.save(new Exercise("Tricep Pulldown", "Triceps", 3, 8, 12.5, workout1));
		this.exerciseRepository.save(new Exercise("Shoulder Press", "Shoulders", 4, 8, 15, workout1));
		this.exerciseRepository.save(new Exercise("Bench Press", "Chest", 5, 5, 40, workout1));
		this.exerciseRepository.save(new Exercise("Pull Ups", "Back", 3, 8, 12.5, workout2));
		this.exerciseRepository.save(new Exercise("Deadlift", "Back", 4, 8, 15, workout2));
		this.exerciseRepository.save(new Exercise("Bicep Curls", "Biceps", 5, 5, 40, workout2));
		
		for (Exercise exercise: exerciseRepository.findAll()) {
			logger.info("name: {}, sets: {}, reps: {}", 
					exercise.getName(), exercise.getSets(), exercise.getReps());
		}
		

		
	}

}
