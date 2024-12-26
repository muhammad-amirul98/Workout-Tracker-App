import { useState } from "react";
// import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";

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

  const handleSignUp = () => {};

  //   const handleSignUp = () => {
  //     axios
  //       .post(import.meta.env.VITE_API_URL + "/signup", userData, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .catch(() => setOpen(true));
  //   };
  return (
    <>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        style={{ width: "100%" }}
      >
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
            type="email"
            value={userData.email}
            onChange={handleChange}
          ></TextField>
          <Button type="submit">Sign Up</Button>
        </Stack>
      </form>
      <br />
      <Stack
        alignItems="center"
        mt={1}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: 2,
          margin: "auto",
          width: "fit-content",
        }}
      >
        <Typography>
          Have an account?{" "}
          <Link href="/" underline="none">
            Log in
          </Link>
        </Typography>
      </Stack>
    </>
  );
}

export default SignUp;
