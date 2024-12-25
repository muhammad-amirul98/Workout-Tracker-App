import { useState } from "react";
// import axios from "axios";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

type User = {
  username: string;
  password: string;
  role: "USER";
  email: string;
};

function SignUp() {
  //   const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    role: "USER",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && confirmPassword !== userData.password) {
      setError("Passwords do not match!");
    } else {
      setError(""); // Clear error if passwords match
    }
  };

  //   const handleSignUp = () => {
  //     axios
  //       .post(import.meta.env.VITE_API_URL + "/signup", userData, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .catch(() => setOpen(true));
  //   };
  return (
    <>
      <DialogContent>
        <Stack spacing={2} alignItems="center" mt={1}>
          <TextField
            label="Name"
            name="username"
            value={userData.username}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Confirm Password"
            name="password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validateConfirmPassword}
          ></TextField>
          {error && ( // Render error message if it exists
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          ></TextField>
        </Stack>
      </DialogContent>
    </>
  );
}

export default SignUp;
