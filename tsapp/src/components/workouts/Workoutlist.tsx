// import { useQueryClient } from "@tanstack/react-query";
import { getWorkouts } from "../../api/workoutapi";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Typography } from "@mui/material";

function Workoutlist() {
  // const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  //useEffect function to see updated expandedRows value when it changes
  // useEffect(() => {
  //   console.log("Expanded Rows:", expandedRows);
  // }, [expandedRows]);

  const handleRowClick = (id: string) => {
    setExpandedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const workoutColumns: GridColDef[] = [
    {
      field: "expand",
      headerName: "Show Exercises",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        // console.log(params);
        return (
          <Box
            display="flex"
            justifyContent="center"
            // alignItems="center"
            height="100%"
          >
            <Button onClick={() => handleRowClick(params.id as string)}>
              {expandedRows.includes(params.id as string) ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </Box>
        );
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
  ];

  // const renderExpandedRow = (id: string) => {
  //   if (expandedRows.includes(id)) {
  //     return (
  //       <div style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
  //         <strong>Expanded Content for {id}</strong>
  //         <ul>
  //           <li>Exercise 1</li>
  //           <li>Exercise 2</li>
  //           <li>Exercise 3</li>
  //         </ul>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const renderExpandedRow = (id: string) => {
    return (
      <Collapse in={expandedRows.includes(id)} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="body2" component="div">
            Exercise: Push-up
          </Typography>
          <Typography variant="body2" component="div">
            Reps: 20
          </Typography>
        </Box>
      </Collapse>
    );
  };

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching workouts</span>;
  } else {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
        <DataGrid
          rows={data}
          columns={workoutColumns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
          // checkboxSelection
          disableRowSelectionOnClick
        />
        {data.map((row) => (
          <div key={row._links.self.href}>
            {renderExpandedRow(row._links.self.href)}
          </div>
        ))}
      </>
    );
  }
}

export default Workoutlist;
