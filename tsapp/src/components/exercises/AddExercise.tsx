import { useState } from "react";
import { Exercise } from "../../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ExerciseDialogContent from "./ExerciseDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExercise } from "../../api/exerciseapi";

type Props = {
  workoutId: number;
};

function AddExercise({ workoutId }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<Exercise>({
    id: 0,
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
    setExercise({
      id: 0,
      name: "",
      bodyPart: "",
      sets: 0,
      reps: 0,
      weight: 0,
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: ({
      workoutId,
      exercise,
    }: {
      workoutId: number;
      exercise: Exercise;
    }) => addExercise(workoutId, exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (err) => {
      console.error("Add Exercise : " + err);
    },
  });

  const handleSave = () => {
    mutate({ workoutId, exercise });
    handleClose();
  };

  return (
    <>
      <>
        <div style={{ marginLeft: "7px" }}>
          <Button onClick={handleClickOpen}>Add Exercise</Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Exercise</DialogTitle>
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
    </>
  );
}

export default AddExercise;
