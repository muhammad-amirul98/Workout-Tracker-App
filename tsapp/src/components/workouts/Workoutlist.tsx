import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout, getWorkoutsByUser } from "../../api/workoutapi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  Snackbar,
  Box,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import "../../styles/styles.css";
import AddWorkout from "./AddWorkout";
import UpdateWorkout from "./UpdateWorkout";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddExercise from "../exercises/AddExercise";
import UpdateExercise from "../exercises/UpdateExercise";
import { deleteExercise } from "../../api/exerciseapi";
import { useNavigate } from "react-router-dom";
import { Workout } from "../../types";
import PlateWeightCalculator from "../utilities/PlateWeightCalculator";
import { createWorkoutLog } from "../../api/workoutLogapi";

function Workoutlist() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkoutsByUser,
  });

  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onWorkoutUpdated = () => {
    setOpen(true);
    setMessage("Workout Updated Successfully");
  };

  const onWorkoutDeleted = () => {
    setOpen(true);
    setMessage("Workout Deleted Successfully");
  };

  const onExerciseUpdated = () => {
    setOpen(true);
    setMessage("Exercise Updated Successfully");
  };

  const onExerciseDeleted = () => {
    setOpen(true);
    setMessage("Exercise Deleted Successfully");
  };

  const queryClient = useQueryClient();

  const { mutate: deleteWorkoutMutate } = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      onWorkoutDeleted();
    },
  });

  const { mutate: deleteExerciseMutate } = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      onExerciseDeleted();
    },
  });

  const toggleCollapse = (workoutId: number) => {
    setCollapsed((prev) => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(workoutId)) {
        newCollapsed.delete(workoutId);
      } else {
        newCollapsed.add(workoutId);
      }
      return newCollapsed;
    });
  };

  const startWorkout = async (workout: Workout) => {
    const storedWorkout = sessionStorage.getItem("currentWorkout");
    if (storedWorkout) {
      const parsedWorkout = JSON.parse(storedWorkout);
      if (parsedWorkout.workoutId !== workout.workoutId) {
        const shouldStartNewWorkout = window.confirm(
          "You have a workout currently going on. Do you want to start a new one?"
        );

        if (!shouldStartNewWorkout) {
          return; // Exit if the user cancels
        }
      }
    }

    sessionStorage.setItem("currentWorkout", JSON.stringify(workout));
    const newStartTime = Date.now();
    sessionStorage.setItem("workoutStartTime", newStartTime.toString());

    // Prepare the workout log data
    const workoutLog = {
      workout: workout, // Associate the workout
      startTime: new Date().toISOString(), // ISO 8601 format
      endTime: null, // Not ended yet
      status: "IN_PROGRESS" as const,
      exerciseLogs: [], // Empty list initially
    };

    console.log("WORKOUT ID: " + workoutLog.workout.workoutId);

    try {
      // Send the workout log to the backend
      const newWorkoutLog = await createWorkoutLog(workoutLog);
      console.log("Workout log created:", newWorkoutLog);

      navigate("/currentworkout");
    } catch (error) {
      console.error("Error starting workout:", error);
      alert("Failed to start the workout.");
    }
  };

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching workouts</span>;
  } else {
    return (
      <>
        <Box
          display="flex"
          // justifyContent="space-between"
          alignItems="flex-start"
          // gap={2}
        >
          <AddWorkout />
          <PlateWeightCalculator />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow className="table-head">
                <TableCell className="cellText">Workout Name</TableCell>
                <TableCell className="cellText">Type</TableCell>
                <TableCell className="cellText">Exercises</TableCell>
                <TableCell className="cellText">Edit</TableCell>
                <TableCell className="cellText">Delete</TableCell>
                <TableCell className="cellText">Start</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((workout) => (
                <React.Fragment key={workout.workoutId}>
                  <TableRow>
                    <TableCell className="buttonText">{workout.name}</TableCell>
                    <TableCell className="buttonText">{workout.type}</TableCell>
                    <TableCell>
                      <Button onClick={() => toggleCollapse(workout.workoutId)}>
                        {collapsed.has(workout.workoutId) ? (
                          <Tooltip title="Hide exercises">
                            <ArrowUpwardIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Show exercises">
                            <ArrowDownwardIcon />
                          </Tooltip>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <UpdateWorkout
                        workoutData={workout}
                        onWorkoutUpdated={onWorkoutUpdated}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete workout">
                        <IconButton
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${workout.name}?`
                              )
                            ) {
                              deleteWorkoutMutate(workout);
                            }
                          }}
                          aria-label="delete"
                          color="primary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Begin workout">
                        <IconButton
                          color="primary"
                          onClick={() => startWorkout(workout)}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ padding: "0px" }}>
                      <Collapse in={collapsed.has(workout.workoutId)}>
                        <AddExercise workoutId={workout.workoutId} />
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="buttonText">
                                Exercise Name
                              </TableCell>
                              <TableCell className="buttonText">
                                Body Part
                              </TableCell>
                              <TableCell className="buttonText">Sets</TableCell>
                              <TableCell className="buttonText">Reps</TableCell>
                              <TableCell className="buttonText">
                                Weight (kg)
                              </TableCell>
                              <TableCell className="buttonText">Edit</TableCell>
                              <TableCell className="buttonText">
                                Delete
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {workout.exercises.map((exercise) => (
                              <TableRow key={exercise.id}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.bodyPart}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                                <TableCell>{exercise.weight}</TableCell>
                                <TableCell>
                                  <UpdateExercise
                                    exerciseData={exercise}
                                    onExerciseUpdated={onExerciseUpdated}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Tooltip title="Delete exercise">
                                    <IconButton
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            `Are you sure you want to delete ${exercise.name}?`
                                          )
                                        ) {
                                          deleteExerciseMutate(exercise);
                                        }
                                      }}
                                      aria-label="delete"
                                      color="primary"
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={(_event, reason) => {
            if (reason === "clickaway") {
              // Prevent the Snackbar from closing when clicking outside
              return;
            }
            setOpen(false);
          }}
          message={message}
        ></Snackbar>
      </>
    );
  }
}

export default Workoutlist;
