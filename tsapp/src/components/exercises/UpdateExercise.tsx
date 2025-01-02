import Tooltip from "@mui/material/Tooltip";
import { Exercise } from "../../types";
import ExerciseDialogContent from "./ExerciseDialogContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExercise } from "../../api/exerciseapi";

type Props = {
  exerciseData: Exercise;
  onExerciseUpdated: () => void;
};
function UpdateExercise({ exerciseData, onExerciseUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<Exercise>({
    id: 0,
    name: "",
    bodyPart: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setExercise({
      id: exerciseData.id,
      name: exerciseData.name,
      bodyPart: exerciseData.bodyPart,
      sets: exerciseData.sets,
      reps: exerciseData.reps,
      weight: exerciseData.weight,
    });
    setOpen(true);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      onExerciseUpdated();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    mutate(exercise);
    setExercise({ id: 0, name: "", bodyPart: "", sets: 0, reps: 0, weight: 0 });
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Tooltip title="Edit exercise">
        <IconButton size="small" onClick={handleClickOpen}>
          <EditIcon aria-label="edit" fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Exercise</DialogTitle>
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

export default UpdateExercise;
