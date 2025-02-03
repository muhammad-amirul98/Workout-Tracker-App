import { useQuery } from "@tanstack/react-query";
import { getWorkoutLogs } from "../../api/workoutLogapi";
// import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { WorkoutLog } from "../../types";

function WorkoutLogs() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workoutLogs"],
    queryFn: getWorkoutLogs,
  });

  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const toggleCollapse = (workoutLog: WorkoutLog) => {
    console.log(JSON.stringify(workoutLog));
    setCollapsed((prev) => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(workoutLog.id)) {
        newCollapsed.delete(workoutLog.id);
      } else {
        newCollapsed.add(workoutLog.id);
      }
      return newCollapsed;
    });
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "PPpp"); // Formats as "Jan 9, 2025, 4:17:00 AM"
  };

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching workout logs</span>;
  } else {
    return (
      <>
        <TableContainer>
          <Table>
            {/* <TableHead sx={{ backgroundColor: "#1976d2" }}> */}
            <TableHead>
              <TableRow className="table-head">
                <TableCell className="cellText">No.</TableCell>
                <TableCell className="cellText">Workout Name</TableCell>
                <TableCell className="cellText">Type</TableCell>
                <TableCell className="cellText">Exercises</TableCell>
                <TableCell className="cellText">Start Time</TableCell>
                <TableCell className="cellText">End Time</TableCell>
                <TableCell className="cellText">Status</TableCell>
                <TableCell className="cellText">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((workoutLog, index) => {
                return (
                  <React.Fragment key={workoutLog.id}>
                    <TableRow>
                      <TableCell className="buttonText">{index + 1}</TableCell>
                      <TableCell className="buttonText">
                        {workoutLog.workout.name}
                      </TableCell>
                      <TableCell className="buttonText">
                        {workoutLog.workout.type}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => toggleCollapse(workoutLog)}>
                          {collapsed.has(workoutLog.id) ? (
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
                      <TableCell className="buttonText">
                        {formatDateTime(workoutLog.startTime)}
                      </TableCell>
                      <TableCell className="buttonText">
                        {workoutLog.endTime &&
                          formatDateTime(workoutLog.endTime)}
                      </TableCell>
                      <TableCell className="buttonText">
                        {workoutLog.status}
                      </TableCell>
                      <TableCell>
                        <Button>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={8} sx={{ padding: "0px" }}>
                        <Collapse in={collapsed.has(workoutLog.id)}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell className="buttonText">
                                  Exercise
                                </TableCell>
                                <TableCell className="buttonText">
                                  Set
                                </TableCell>
                                <TableCell className="buttonText">
                                  Reps
                                </TableCell>
                                <TableCell className="buttonText">
                                  Weight (kg)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {workoutLog.exerciseLogs?.length > 0 ? (
                                workoutLog.exerciseLogs.map((exerciseLog) => (
                                  <React.Fragment key={exerciseLog.id}>
                                    {/* Exercise Name Row */}
                                    <TableRow>
                                      <TableCell
                                        className="buttonText"
                                        colSpan={4}
                                      >
                                        {exerciseLog.exercise.name}
                                      </TableCell>
                                    </TableRow>

                                    {/* Set Logs */}
                                    {exerciseLog.setLogs?.map((setLog) => (
                                      <TableRow key={setLog.id}>
                                        <TableCell></TableCell>{" "}
                                        {/* Empty Cell for alignment */}
                                        <TableCell className="buttonText">
                                          Set {setLog.setNumber}
                                        </TableCell>
                                        <TableCell className="buttonText">
                                          {setLog.reps}
                                        </TableCell>
                                        <TableCell className="buttonText">
                                          {setLog.weight} kg
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </React.Fragment>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={4}
                                    className="buttonText"
                                    align="center"
                                  >
                                    No exercises logged
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default WorkoutLogs;
