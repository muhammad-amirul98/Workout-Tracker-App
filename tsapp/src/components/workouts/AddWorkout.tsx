import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Workout } from "../../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import WorkoutDialogContent from "./WorkoutDialogContent";
import { addWorkout } from "../../api/workoutapi";

function AddWorkout() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false); //show field for adding workout
  const [workout, setWorkout] = useState<Workout>({
    workoutId: 0,
    name: "",
    type: "",
    exercises: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: addWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("hello");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    mutate(workout);
    setWorkout({ workoutId: 0, name: "", type: "", exercises: [] });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Add Workout</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Workout</DialogTitle>
        <WorkoutDialogContent workout={workout} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddWorkout;
