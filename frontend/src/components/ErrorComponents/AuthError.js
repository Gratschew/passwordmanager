import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { clearError } from "../../Redux/reducers/AuthReducer";
import { Snackbar } from "@mui/material";

const AuthErrorAlert = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
      const timer = setTimeout(() => {
        dispatch(clearError());
        setOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(clearError());
  };

  if (!error) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      sx={{ marginTop: 6 }}
    >
      <Alert severity="error" onClose={handleClose}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AuthErrorAlert;
