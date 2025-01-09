package com.project.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.model.SetLog;
import com.project.workout.service.SetLogService;

@RestController
@RequestMapping("/setLog")
public class SetLogController {
	
	private final SetLogService setLogService;

    @Autowired
    public SetLogController(SetLogService setLogService) {
        this.setLogService = setLogService;
    }

    @PostMapping
    public ResponseEntity<SetLog> createSetLog(
        @RequestParam Long exerciseLogId,
        @RequestParam int setNumber,
        @RequestParam int reps,
        @RequestParam double weight
    ) {
        SetLog setLog = setLogService.createSetLog(exerciseLogId, setNumber, reps, weight);
        return ResponseEntity.ok(setLog); 
    }
}
