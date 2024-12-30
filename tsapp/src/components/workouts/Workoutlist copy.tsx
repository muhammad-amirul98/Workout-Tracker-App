import * as React from "react";
import { getWorkouts } from "../../api/workoutapi";
import {
  // Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Collapse,
  Paper,
  // Typography,
  TableHead,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useQuery } from "@tanstack/react-query";
import Exerciselist from "../exercises/Exerciselist";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Workoutlistcopy() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  const handleRowClick = (id: string) => {
    setExpandedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const renderExpandedRow = (id: string) => {
    return (
      <Collapse
        in={expandedRows.includes(id)}
        timeout="auto"
        unmountOnExit
        sx={{
          paddingBottom: 10,
        }}
      >
        <Exerciselist workoutId={id} />
      </Collapse>
    );
  };

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching workouts</span>;
  } else {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              // backgroundColor: "#1976d2", // Background color for the entire header
              fontWeight: "bold",
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Link
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row._links.self.href}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRowClick(row._links.self.href)}
                    >
                      {expandedRows.includes(row._links.self.href) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row._links.workout.href}</TableCell>
                  <TableCell>
                    <EditIcon />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    {renderExpandedRow(row._links.self.href)}
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

export default Workoutlistcopy;

// <Collapse in={expandedRows.includes(id)} timeout="auto" unmountOnExit>
//       //   <Box sx={{ margin: 1 }}>
//       //     <Typography variant="body2" component="div">
//       //       Exercise: Push-up
//       //     </Typography>
//       //     <Typography variant="body2" component="div">
//       //       Reps: 20
//       //     </Typography>
//       //   </Box>
//       // </Collapse>
