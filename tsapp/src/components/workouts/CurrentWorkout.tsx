// import { useLocation } from "react-router-dom";
// import { Exercise } from "../../types";
import "../../styles/styles.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ActualValues, Exercise, Workout } from "../../types";
import DoneIcon from "@mui/icons-material/Done";

function CurrentWorkout() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [actualValues, setActualValues] = useState<ActualValues>({});
  //USE EFFECT
  useEffect(() => {
    const storedWorkout = sessionStorage.getItem("currentWorkout");
    if (storedWorkout) {
      const parsedWorkout = JSON.parse(storedWorkout);
      setCurrentWorkout(parsedWorkout);

      const initialActualValues = parsedWorkout.exercises.reduce(
        (acc: ActualValues, exercise: Exercise) => ({
          ...acc,
          [exercise.id]: Array.from({ length: exercise.sets }, () => ({
            reps: exercise.reps,
            weight: exercise.weight,
          })),
        }),
        {}
      );
      setActualValues(initialActualValues);
    }

    const storedStartTime = sessionStorage.getItem("workoutStartTime");
    const startTime = storedStartTime ? parseInt(storedStartTime) : Date.now();
    if (!storedStartTime) {
      sessionStorage.setItem("workoutStartTime", startTime.toString());
    }

    const timer = setInterval(() => {
      setSecondsElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //HANDLE INPUT CHANGE

  const handleInputChange = (
    exerciseId: number,
    setIndex: number,
    field: "reps" | "weight",
    value: number
  ) => {
    setActualValues((prevValues) => {
      const updatedValues = { ...prevValues };

      updatedValues[exerciseId][setIndex] = {
        ...updatedValues[exerciseId][setIndex],
        [field]: value,
      };

      return updatedValues;
    });
  };

  //FORMAT TIME

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentWorkout) {
    return <div className="buttonText">No workout currently selected</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <React.Fragment key={currentWorkout.workoutId}>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell colSpan={1} className="cellText">
                Workout: {currentWorkout.name}
              </TableCell>
              <TableCell colSpan={1} className="cellText">
                Type: {currentWorkout.type}
              </TableCell>
              <TableCell colSpan={2} className="cellText">
                Timer: {formatTime(secondsElapsed)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="buttonText">Set</TableCell>

              <TableCell className="buttonText">Reps</TableCell>
              <TableCell className="buttonText">Weight (kg)</TableCell>
            </TableRow>
            {currentWorkout.exercises.map((exercise) => (
              <React.Fragment key={`exercise-${exercise.id}`}>
                {/* Exercise Name Row */}
                <TableRow>
                  <TableCell
                    colSpan={4}
                    style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
                  >
                    {exercise.name}
                  </TableCell>
                </TableRow>

                {/* Sets Rows */}
                {Array.from({ length: exercise.sets }, (_, setIndex) => (
                  <TableRow key={`${exercise.id}-set-${setIndex}`}>
                    {/* <TableCell>{exercise.name}</TableCell> */}
                    <TableCell>{setIndex + 1}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={actualValues[exercise.id]?.[setIndex]?.reps || 0}
                        onChange={(e) =>
                          handleInputChange(
                            exercise.id,
                            setIndex,
                            "reps",
                            parseInt(e.target.value) || 0
                          )
                        }
                      ></TextField>
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        value={
                          actualValues[exercise.id]?.[setIndex]?.weight || 0
                        }
                        onChange={(e) =>
                          handleInputChange(
                            exercise.id,
                            setIndex,
                            "weight",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      ></TextField>
                    </TableCell>

                    <TableCell>
                      <DoneIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrentWorkout;
