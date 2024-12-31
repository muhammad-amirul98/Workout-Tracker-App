import { useState } from "react";
// import { getWorkouts } from "../../api/workoutapi";

import { useQuery } from "@tanstack/react-query";
import { getWorkoutsByUser } from "../../api/workoutapi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Button,
  Paper,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import "../../styles/styles.css";

function Workoutlist() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkoutsByUser,
  });

  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

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

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching workouts</span>;
  } else {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Show Exercises</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((workout) => (
              <React.Fragment key={workout.workoutId}>
                <TableRow>
                  <TableCell>{workout.name}</TableCell>
                  <TableCell>{workout.type}</TableCell>
                  <TableCell>
                    <Button onClick={() => toggleCollapse(workout.workoutId)}>
                      {collapsed.has(workout.workoutId) ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <EditIcon />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Collapse in={collapsed.has(workout.workoutId)}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Exercise Name</TableCell>
                            <TableCell>Body Part</TableCell>
                            <TableCell>Sets</TableCell>
                            <TableCell>Reps</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {workout.exercise.map((exercise) => (
                            <TableRow key={exercise.id}>
                              <TableCell>{exercise.name}</TableCell>
                              <TableCell>{exercise.bodyPart}</TableCell>
                              <TableCell>{exercise.sets}</TableCell>
                              <TableCell>{exercise.reps}</TableCell>
                              <TableCell>{exercise.weight}</TableCell>
                              <TableCell>
                                <EditIcon />
                              </TableCell>
                              <TableCell>
                                <DeleteIcon />
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
    );
  }
}

export default Workoutlist;
