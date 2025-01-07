package com.project.workout.model;

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
public class ExerciseLog {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;
	
	@ManyToOne
    @JoinColumn(name = "workout_log_id", nullable = false)
    private WorkoutLog workoutLog;
	
	@OneToMany(mappedBy = "exerciseLog", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SetLog> setLogs = new ArrayList<>();

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public WorkoutLog getWorkoutLog() {
		return workoutLog;
	}

	public void setWorkoutLog(WorkoutLog workoutLog) {
		this.workoutLog = workoutLog;
	}

	public List<SetLog> getSetLogs() {
		return setLogs;
	}

	public void setSetLogs(List<SetLog> setLogs) {
		this.setLogs = setLogs;
	}

	public Long getId() {
		return id;
	}

	public ExerciseLog() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ExerciseLog(Exercise exercise, List<SetLog> setLogs) {
		super();
		this.exercise = exercise;
		this.setLogs = setLogs;
	}
	
	

	
	
	
}
