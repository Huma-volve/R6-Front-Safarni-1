import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function LogoutDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    console.log("User logged out!");
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
        startIcon={<LogoutRoundedIcon />}
      >
        Logout
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to log out already?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={handleConfirmLogout} variant="contained" color="error">
            Yes, Log Me Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
