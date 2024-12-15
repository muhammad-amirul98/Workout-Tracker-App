// import { ExerciseResponse } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteExercise, getExercises } from "../api/exerciseapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddExercise from "./AddExercise";
import EditExercise from "./EditExercise";
// import { ExerciseResponse } from "../types";

function Exerciselist() {
  const [open, setOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  const handleExerciseUpdated = () => {
    setUpdateOpen(true);
  };

  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "bodyPart", headerName: "Body Part", width: 200 },
    { field: "sets", headerName: "Sets", width: 200 },
    { field: "reps", headerName: "Reps", width: 200 },
    { field: "weight", headerName: "Weight", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditExercise
          exercisedata={params.row}
          onExerciseUpdated={handleExerciseUpdated}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.name}?`
              )
            ) {
              mutate(params.row._links.exercise.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  const { mutate } = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      setOpen(true);
      //invalidate queries to refresh updated data
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  if (!isSuccess) {
    console.log(data);
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching cars</span>;
  } else {
    return (
      <>
        <AddExercise />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Exercise deleted"
        />

        <Snackbar
          open={updateOpen}
          autoHideDuration={2000}
          onClose={() => setUpdateOpen(false)}
          message="Exercise Updated"
        />
      </>
    );
  }
}

export default Exerciselist;

// <table>
//   <tbody>
//     {data.map((exercise: ExerciseResponse) => (
//       <tr key={exercise._links.self.href}>
//         <td>{exercise.name}</td>
//         <td>{exercise.bodyPart}</td>
//         <td>{exercise.sets}</td>
//         <td>{exercise.reps}</td>
//         <td>{exercise.weight} kg</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
