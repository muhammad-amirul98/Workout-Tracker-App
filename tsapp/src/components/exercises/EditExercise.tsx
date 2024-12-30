import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ExerciseResponse, Exercise, ExerciseEntry } from "../../types";
import ExerciseDialogContent from "./ExerciseDialogContent";
import { useQueryClient } from "@tanstack/react-query";
import { updateExercise } from "../../api/exerciseapi";
import { useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

type FormProps = {
  exercisedata: ExerciseResponse;
  onExerciseUpdated: () => void;
};

function EditExercise({ exercisedata, onExerciseUpdated }: FormProps) {
  const [open, setOpen] = useState(false);

  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    bodyPart: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });

  const handleClickOpen = () => {
    setExercise({
      name: exercisedata.name,
      bodyPart: exercisedata.bodyPart,
      sets: exercisedata.sets,
      reps: exercisedata.reps,
      weight: exercisedata.weight,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      onExerciseUpdated();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    const url = exercisedata._links.self.href;
    const exerciseEntry: ExerciseEntry = { exercise, url };
    mutate(exerciseEntry);
    setExercise({ name: "", bodyPart: "", sets: 0, reps: 0, weight: 0 });
    setOpen(false);
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

export default EditExercise;
