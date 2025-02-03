// import { useLocation } from "react-router-dom";
// import { Exercise } from "../../types";
import "../../styles/styles.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ActualValues, Exercise, ExerciseLog, Workout } from "../../types";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  createExerciseLog,
  createSetLog,
  workoutCancelled,
  workoutCompleted,
} from "../../api/workoutLogapi";
import { useLocation } from "react-router-dom";
// import { workoutCompleted } from "../../api/workoutLogapi";

function CurrentWorkout() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [actualValues, setActualValues] = useState<ActualValues>({});
  const [completedSets, setCompletedSets] = useState<{
    [exerciseId: number]: { [setIndex: number]: boolean };
  }>({});

  const [exerciseLogs, setExerciseLogs] = useState<Record<number, ExerciseLog>>(
    {}
  );

  const location = useLocation();
  // const workoutLogId = location.state?.workoutLogId;
  const workoutLogId =
    location.state?.workoutLogId || sessionStorage.getItem("workoutLogId");

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

      const storedStartTime = sessionStorage.getItem("workoutStartTime");
      const startTime = storedStartTime
        ? parseInt(storedStartTime)
        : Date.now();
      if (!storedStartTime) {
        sessionStorage.setItem("workoutStartTime", startTime.toString());
      }

      const timer = setInterval(() => {
        setSecondsElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(timer);
    }
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

  //SET COMPLETED
  const handleSetCompleted = async (exerciseId: number, setIndex: number) => {
    setCompletedSets((prev) => ({
      ...prev,
      [exerciseId]: {
        ...(prev[exerciseId] || {}),
        [setIndex]: !prev[exerciseId]?.[setIndex],
      },
    }));

    const exerciseLog = exerciseLogs[exerciseId];
    const reps = actualValues[exerciseId]?.[setIndex]?.reps;
    const weight = actualValues[exerciseId]?.[setIndex]?.weight;

    if (!exerciseLog) {
      try {
        const createdExerciseLog = await createExerciseLog(
          Number(workoutLogId),
          exerciseId
        );

        setExerciseLogs({
          ...exerciseLogs,
          [exerciseId]: createdExerciseLog,
        });
        await createSetLog(createdExerciseLog.id, setIndex, reps, weight);
      } catch (error) {
        console.error("Exercise Log Created, Set Log Creation Error: " + error);
      }
    } else {
      try {
        await createSetLog(exerciseLog.id, setIndex, reps, weight);
      } catch (error) {
        console.error("Set Log Creation Error: " + error);
      }
    }
  };

  //WORKOUT COMPLETED
  const handleWorkoutFinished = async () => {
    if (!currentWorkout) {
      console.error("No workout is currently active.");
      return;
    }
    // Check if all sets are completed
    const allSetsCompleted = currentWorkout.exercises.every((exercise) =>
      Array.from({ length: exercise.sets }).every(
        (_, setIndex) => completedSets[exercise.id]?.[setIndex]
      )
    );

    const status = allSetsCompleted ? "COMPLETED" : "CANCELLED";
    const endTime = new Date().toISOString();

    try {
      if (allSetsCompleted) {
        await workoutCompleted({ workoutLogId, status, endTime });
        console.log("Workout marked as completed.");
      } else {
        console.log(workoutLogId);
        await workoutCancelled({ workoutLogId, status, endTime });
        console.log("Workout marked as cancelled.");
      }
      sessionStorage.removeItem("currentWorkout");
      alert(`Workout ${status.toLowerCase()}.`);
      window.location.reload();
    } catch (error) {
      console.error("Error finishing the workout:", error);
      alert(
        "There was an error updating the workout status. Please try again."
      );
    }
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
              <TableCell colSpan={1} className="cellText">
                Timer: {formatTime(secondsElapsed)}
              </TableCell>
              <TableCell>
                <Button
                  onClick={handleWorkoutFinished}
                  className="cellText buttonHover"
                >
                  Finish
                </Button>
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
                        disabled={
                          completedSets[exercise.id]?.[setIndex] || false
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
                        disabled={
                          completedSets[exercise.id]?.[setIndex] || false
                        }
                      ></TextField>
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() =>
                          handleSetCompleted(exercise.id, setIndex)
                        }
                      >
                        {completedSets[exercise.id]?.[setIndex] ? (
                          <CancelIcon />
                        ) : (
                          <DoneIcon />
                        )}
                      </Button>
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
