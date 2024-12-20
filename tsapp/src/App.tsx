// import "./App.css";
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

const queryClient = new QueryClient();

type ExerciselistProps = {
  logOut?: () => void;
};

function App({ logOut }: ExerciselistProps) {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Workout Tracker</Typography>
          </Box>
          <Button
            onClick={logOut}
            color="inherit"
            sx={{
              fontSize: "1.25rem", // Matches the font size of Typography variant="h6"
              fontWeight: "400", // Matches the default Typography font weight
              textTransform: "none", // Keeps the text case consistent with Typography
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
