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
import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "./components/Footer";
import WorkoutLog from "./components/workoutlog/WorkoutLogs";
import HistoryIcon from "@mui/icons-material/History";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CurrentWorkout from "./components/workouts/CurrentWorkout";
import ProtectedLayout from "./components/utilities/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const CustomToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = sessionStorage.getItem("isLoggedIn");
    return storedValue === "true"; // Convert string to boolean
  });

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    navigate("/");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("workoutStartTime");
    sessionStorage.removeItem("currentWorkout");
    setIsLoggedIn(false);
  };

  return (
    <>
      <ToastContainer />
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#000000", // Background color for the entire page
          minHeight: "100vh", // Ensure the background covers the full height of the viewport
        }}
      >
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
          <CustomToolbar sx={{ color: "#3A7BFF" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography variant="h6" className="logoText">
                  Workout Tracker
                </Typography>
              </Link>
            </Box>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              {location.pathname !== "/signup" && !isLoggedIn && (
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="buttonText buttonHover"
                >
                  Sign Up
                </Button>
              )}
              {isLoggedIn && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "5rem" }}>
                    <Button
                      className="buttonText buttonHover"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => navigate("/currentworkout")}
                    >
                      <FitnessCenterIcon />
                      Current Workout
                    </Button>
                    <Button
                      className="buttonText buttonHover"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => navigate("/workoutlogs")}
                    >
                      <HistoryIcon />
                      Logs
                    </Button>
                    <Button
                      className="buttonText buttonHover"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <ShowChartIcon />
                      Progress
                    </Button>
                    <IconButton className="buttonText iconButtonHover">
                      <SearchIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      // gap: "10rem",
                      marginLeft: 45,
                      display: "flex",
                    }}
                  >
                    <Button className="buttonText buttonHover" onClick={logOut}>
                      Log Out
                    </Button>
                  </Box>
                </Box>
              )}
            </div>
          </CustomToolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route
              path="/"
              element={<Login isAuthenticated={isLoggedIn} onLogin={logIn} />}
            />
            <Route path="/signup" element={<SignUp />} />

            {/* PRIVATE ROUTES */}
            <Route element={<ProtectedLayout />}>
              <Route path="/workoutlogs" element={<WorkoutLog />} />
              <Route path="/currentworkout" element={<CurrentWorkout />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </Container>
      <Footer />
    </>
  );
}

export default App;
