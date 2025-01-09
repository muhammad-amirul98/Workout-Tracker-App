package com.project.workout.dto;

import java.time.LocalDateTime;

import com.project.workout.model.WorkoutLogStatus;

public class WorkoutLogStatusDTO {
	
	private Long workoutLogId;
	private WorkoutLogStatus status;
	private LocalDateTime endTime;
	
	
	
	public WorkoutLogStatusDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorkoutLogStatusDTO(Long workoutLogId, WorkoutLogStatus status, LocalDateTime endTime) {
		super();
		this.workoutLogId = workoutLogId;
		this.status = status;
		this.endTime = endTime;
	}

	public Long getWorkoutLogId() {
		return workoutLogId;
	}

	public void setWorkoutLogId(Long workoutLogId) {
		this.workoutLogId = workoutLogId;
	}

	public WorkoutLogStatus getStatus() {
		return status;
	}

	public void setStatus(WorkoutLogStatus status) {
		this.status = status;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	
	
	
	
}
