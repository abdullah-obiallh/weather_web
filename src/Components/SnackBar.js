import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ State, Massage }) {
  const horizontal = "center";
  const vertical = "top";

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={State}>
        <Alert variant="filled" severity="error" closeText="red">
          {Massage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
