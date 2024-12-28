// import { useQueryClient } from "@tanstack/react-query";
import { getWorkouts } from "../api/workoutapi";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { GridToolbar } from "@mui/x-data-grid";
// import { ExerciseResponse } from "../types";
// import { useState } from "react";

function Workoutlist() {
  // const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  // const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // const handleRowClick = async (params: GridRowParams) => {
  //   const workoutId = params.row._links.self.href.split("/").pop();
  //   if (workoutId) {
  //     // const exercises: ExerciseResponse[] = await getExercisesByWorkout(workoutId);
  //     setExpandedRows((prev) => {
  //       if (prev.includes(workoutId)) {
  //         return prev.filter((id) => id !== workoutId);
  //       } else {
  //         return [...prev, workoutId];
  //       }
  //     });
  //   }
  // };

  // const renderExercises = (workoutId: string): JSX.Element => {
  //   const exercises = expandedRows.includes(workoutId)
  //     ? getExercisesByWorkout(workoutId)
  //     : [];
  //   return (
  //     <ul>
  //       {exercises.map((exercise) => (
  //         <li key={exercise._links.self.href}>{exercise.name}</li>
  //       ))}
  //     </ul>
  //   );
  // };

  const workoutColumns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
  ];

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
