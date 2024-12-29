// import { useQueryClient } from "@tanstack/react-query";
import { getWorkouts } from "../api/workoutapi";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { GridToolbar } from "@mui/x-data-grid";
// import { ExerciseResponse } from "../types";
import { useState } from "react";
// import { GridRowParams } from "@mui/x-data-grid";

function Workoutlist() {
  // const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

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
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "expand",
      headerName: "Show Exercises",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          // alignItems="center"
          height="100%"
        >
          <Button onClick={() => handleRowClick(params.id as string)}>
            {expandedRows.includes(params.id as string) ? "Collapse" : "Expand"}
          </Button>
        </Box>
      ),
    },
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
          checkboxSelection
          disableRowSelectionOnClick
          // components={{
          //   Row: (props: GridRowParams) => {
          //     return (
          //       <>
          //         <div {...props} />
          //         {renderExpandedRow(props.row._links.self.href as string)}
          //       </>
          //     );
          //   },
          // }}
        />
      </>
    );
  }
}

export default Workoutlist;

// {
//   field: "edit",
//   headerName: "",
//   width: 90,
//   sortable: false,
//   filterable: false,
//   disableColumnMenu: true,
// },
// {
//   field: "delete",
//   headerName: "",
//   width: 90,
//   sortable: false,
//   filterable: false,
//   disableColumnMenu: true,
// },
