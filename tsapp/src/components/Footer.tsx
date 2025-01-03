import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000000",
        color: "#3A7BFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        bottom: 0,
        width: "100%",
        zIndex: 1,
        marginTop: "auto",
      }}
    >
      <Button className="buttonText buttonHover">About</Button>
      <Button className="buttonText buttonHover">Features</Button>
      <Button className="buttonText buttonHover">Contact</Button>
    </Box>
  );
}

export default Footer;
