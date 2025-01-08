package com.project.workout.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

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
	
	@NotNull
	private LocalDateTime startTime;
	
	private LocalDateTime endTime;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	private WorkoutLogStatus status; //IN_PROGRESS, COMPLETED, CANCELLED
	
	@OneToMany(mappedBy = "workoutLog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseLog> exerciseLogs = new ArrayList<>();
	
	
	public WorkoutLog() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public WorkoutLog(Workout workout, @NotNull LocalDateTime startTime, LocalDateTime endTime,
			WorkoutLogStatus status) {
		super();
		this.workout = workout;
		this.startTime = startTime;
		this.endTime = endTime;
		this.status = status;
	}



	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}

	public Workout getWorkout() {
		return workout;
	}

	public void setWorkout(Workout workout) {
		this.workout = workout;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public WorkoutLogStatus getStatus() {
		return status;
	}

	public void setStatus(WorkoutLogStatus status) {
		this.status = status;
	}

	public List<ExerciseLog> getExerciseLogs() {
		return exerciseLogs;
	}

	public void setExerciseLogs(List<ExerciseLog> exerciseLogs) {
		this.exerciseLogs = exerciseLogs;
	}

	public Long getId() {
		return id;
	}

	
}
