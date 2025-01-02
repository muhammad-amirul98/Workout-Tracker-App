import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import WorkoutDialogContent from "./WorkoutDialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Workout } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkout } from "../../api/workoutapi";

type Props = {
  workoutData: Workout;
  onWorkoutUpdated: () => void;
};

function UpdateWorkout({ workoutData, onWorkoutUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [workout, setWorkout] = useState<Workout>({
    workoutId: 0,
    name: "",
    type: "",
    exercises: [],
  });

  const handleClickOpen = () => {
    setWorkout({
      workoutId: workoutData.workoutId,
      name: workoutData.name,
      type: workoutData.type,
      exercises: workoutData.exercises,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      onWorkoutUpdated();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Tooltip title="Edit workout">
        <IconButton size="small" onClick={handleClickOpen}>
          <EditIcon aria-label="edit" fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Workout</DialogTitle>
        <WorkoutDialogContent workout={workout} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateWorkout;
