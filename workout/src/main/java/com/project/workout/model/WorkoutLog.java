package com.project.workout.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class WorkoutLog {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	private AppUser user;
	
	@ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;
	
	private LocalDateTime datePerformed;
	
//	@OneToMany(mappedBy = "workoutLog", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ExerciseLog> exerciseLogs = new ArrayList<>();
	
	
	
}
