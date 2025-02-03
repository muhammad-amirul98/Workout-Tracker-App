package com.project.workout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.workout.dto.SetLogDTO;
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
    public ResponseEntity<SetLog> createSetLog(@RequestBody SetLogDTO setLogDTO) {
    	try {
    	    SetLog setLog = setLogService.createSetLog(
    	        setLogDTO.getExerciseLogId(),
    	        setLogDTO.getSetNumber(),
    	        setLogDTO.getReps(),
    	        setLogDTO.getWeight()
    	    );
    	    return ResponseEntity.status(HttpStatus.CREATED).body(setLog);
    	} catch (Exception e) {
    	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    	        .body(null); 
    	}
    }
}
