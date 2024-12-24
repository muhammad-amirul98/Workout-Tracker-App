import { useState } from "react";
// import axios from "axios";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type User = {
  username: string;
  password: string;
  role: "USER";
  email: string;
  number: string;
};

function SignUp() {
  //   const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    role: "USER",
    email: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="username"
            value={userData.username}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Password"
            name="password"
            value={userData.username}
            onChange={handleChange}
          ></TextField>
        </Stack>
      </DialogContent>
    </>
  );
}

export default SignUp;
