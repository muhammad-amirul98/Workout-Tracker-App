import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Exercise } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExercise } from "../../api/exerciseapi";
import Button from "@mui/material/Button";
import ExerciseDialogContent from "./ExerciseDialogContent";

function AddExercise() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    mutate(exercise);
    setExercise({ name: "", bodyPart: "", sets: 0, reps: 0, weight: 0 });
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    bodyPart: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Exercise</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Exercise</DialogTitle>
        <ExerciseDialogContent
          exercise={exercise}
          handleChange={handleChange}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddExercise;
