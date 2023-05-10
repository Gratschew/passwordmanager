import * as React from "react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeySafeLogo from "./KeySafeLogo.png";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { validateTwoFa } from "../Redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import AuthErrorAlert from "./ErrorComponents/AuthError";

const useAutoFocus = () => {
  const inputRefs = React.useRef([]);

  const handleRef = (index) => (ref) => {
    inputRefs.current[index] = ref;
  };

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return [handleRef, focusNextInput];
};

const AuthSetup = ({ username, password }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const auth = useSelector((state) => state.auth);

  const [handleRef, focusNextInput] = useAutoFocus();

  const handleInputChange = (event, index) => {
    const input = event.target;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value) {
      setCode((prevCode) => {
        // Update the specific digit at the given index
        const updatedCode = prevCode.split("");
        updatedCode[index] = value;
        return updatedCode.join("");
      });
      if (input.value) {
        focusNextInput(index);
      }
      if (value && index < 5) {
        input.nextElementSibling.focus(); // Move focus to the next input
      }
    }
  };

  const handleSubmit = () => {
    dispatch(
      validateTwoFa({
        secret: auth.twoFa.secret,
        twoFaToken: code,
        username: username,
        password: password,
      })
    );
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "0px solid #ccc",
            boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "24px",
          }}
        >
          <img
            alt="Logo"
            src={KeySafeLogo}
            width={"120px"}
            style={{
              filter:
                theme.palette.mode == "light"
                  ? "invert(55%) sepia(51%) saturate(5300%) hue-rotate(220deg) brightness(102%) contrast(94%)"
                  : "invert(100%)",
            }}
          />
          <Box sx={{ mt: 2, mb: 2, width: "80%", margin: "0 auto" }}>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Box>
          <Typography component="h1" variant="h5">
            Two-Factor Authentication Setup
          </Typography>

          <Typography component="p" variant="p" sx={{ mt: 2, mb: 2 }}>
            Add the application to your Authenticator application scanning the
            QR-image or copying the secret:
          </Typography>
          <img alt="QR" src={auth.twoFa.imageUrl} width={"120px"} />
          <Typography component="p" variant="p" sx={{ mt: 1 }}>
            {auth.twoFa.secret}
          </Typography>
          <Typography component="p" variant="p" sx={{ mt: 5 }}>
            Verify the setup by giving the six digit code from the Authenticator
            application:
          </Typography>

          <Box noValidate sx={{ mt: 1 }}>
            <Box display="flex" justifyContent="center">
              {[...Array(6)].map((_, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    style: { textAlign: "center" },
                  }}
                  inputRef={handleRef(index)}
                  onChange={(event) => handleInputChange(event, index)}
                />
              ))}
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={code.length < 6}
            >
              {auth.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Finish"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
      <AuthErrorAlert></AuthErrorAlert>
    </>
  );
};

export default AuthSetup;
