import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Exerciselist from "./components/Exerciselist";
import Login from "./components/Login";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signingUp = () => {
    setIsSigningUp(true);
  };

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    sessionStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Workout Tracker</Typography>
          </Box>
          {!isSigningUp && !isLoggedIn && (
            <Button
              onClick={() => {
                signingUp();
                navigate("/signup");
              }}
              color="inherit"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Sign Up
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={logOut}
              color="inherit"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={<Login isAuthenticated={isLoggedIn} onLogin={logIn} />}
          />
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </QueryClientProvider>
    </Container>
  );
}

export default App;

// return (
//   <Router>
//     <Container maxWidth="xl">
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="h6">Workout Tracker</Typography>
//           </Box>
//           {!isLoggedIn && (
//             <Button
//               onClick={() => navigate("/signup")}
//               color="inherit"
//               sx={{
//                 fontSize: "1.25rem",
//                 fontWeight: 400,
//                 textTransform: "none",
//               }}
//             >
//               Sign Up
//             </Button>
//           )}
//           {isLoggedIn && (
//             <Button
//               onClick={logOut}
//               color="inherit"
//               sx={{
//                 fontSize: "1.25rem",
//                 fontWeight: 400,
//                 textTransform: "none",
//               }}
//             >
//               Log Out
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <QueryClientProvider client={queryClient}>
//         <Routes>
//           <Route
//             path="/"
//             element={<Login isAuthenticated={isLoggedIn} onLogin={logIn} />}
//           ></Route>
// <Route path="/signup" element={<SignUp />}></Route>
//         </Routes>
//       </QueryClientProvider>
//     </Container>
//   </Router>
// );
