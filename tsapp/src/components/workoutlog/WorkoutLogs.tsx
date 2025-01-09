import { useQuery } from "@tanstack/react-query";
import { getWorkoutLogs } from "../../api/workoutLogapi";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

function WorkoutLogs() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workoutLogs"],
    queryFn: getWorkoutLogs,
  });

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
        <Box></Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow className="table-head">
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
              {data.map((workoutLog) => {
                return (
                  <React.Fragment>
                    <TableRow>
                      <TableCell className="buttonText">
                        {workoutLog.workout.name}
                      </TableCell>
                      <TableCell className="buttonText">
                        {workoutLog.workout.type}
                      </TableCell>
                      <TableCell>
                        <Button>
                          <ArrowDownwardIcon />
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
