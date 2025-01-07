package com.project.workout.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SetLog {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "exercise_log_id", nullable = false)
    private ExerciseLog exerciseLog;
	
	private int set_number;
	
	private int reps;
	
	private double weight;

	public SetLog() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SetLog(ExerciseLog exerciseLog, int set_number, int reps, double weight) {
		super();
		this.exerciseLog = exerciseLog;
		this.set_number = set_number;
		this.reps = reps;
		this.weight = weight;
	}

	public ExerciseLog getExerciseLog() {
		return exerciseLog;
	}

	public void setExerciseLog(ExerciseLog exerciseLog) {
		this.exerciseLog = exerciseLog;
	}

	public int getSet_number() {
		return set_number;
	}

	public void setSet_number(int set_number) {
		this.set_number = set_number;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public Long getId() {
		return id;
	}
	
	
	
}
