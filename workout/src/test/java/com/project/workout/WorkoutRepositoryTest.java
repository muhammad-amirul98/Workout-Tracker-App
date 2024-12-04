package com.project.workout;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.project.workout.domain.Workout;
import com.project.workout.domain.WorkoutRepository;

@DataJpaTest
public class WorkoutRepositoryTest {
	@Autowired
	private WorkoutRepository workoutRepository;
	
	@Test
	void saveWorkout() {
		workoutRepository.save(new Workout("Triceps", "Push"));
		assertThat(workoutRepository.findByName("Triceps").isPresent()).isTrue();
	}
	
	@Test
	void deleteWorkouts() {
		workoutRepository.save(new Workout("Biceps", "Pull"));
		workoutRepository.deleteAll();
		assertThat(workoutRepository.count()).isEqualTo(0);
	}
}
