import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LinearProgress } from "@mui/material";
import zxcvbn from "zxcvbn";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { register } from "../Redux/reducers/AuthReducer";
import { useSelector } from "react-redux";
import AuthErrorAlert from "./ErrorComponents/AuthError";
import KeySafeLogo from "./KeySafeLogo.png";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
const SignUp = ({ setIsLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(51);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    calculatePwStrength(password);
    calculatePwValidness(password);
  }, [password]);

  const calculatePwStrength = (pw) => {
    const result = zxcvbn(pw);
    // zxcvbn gives a pw score between 0 and 4
    setPasswordStrength(result.score * 25);
  };
  const createPasswordLabel = (result) => {
    if (passwordStrength < 25) return "Insufficient";
    if (passwordStrength < 51) return "Weak";
    if (passwordStrength < 76) return "Fair";
    return "Secure";
  };
  const passwordStrengthMeterColor = () => {
    if (passwordStrength < 51) return "error";
    if (passwordStrength < 76) return "warning";
    return "success";
  };
  const calculatePwValidness = (password) => {
    setHasLowerCase(/[a-z]/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasDigit(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setIsLengthValid(password.length >= 8);
  };

  const isPwValid = () => {
    return (
      hasLowerCase &&
      hasUpperCase &&
      hasDigit &&
      hasSpecialChar &&
      isLengthValid
    );
  };

  const handleSignUp = () => {
    dispatch(register({ username: username, password: password }));
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
            src={KeySafeLogo} //replace with your logo image path
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
            Sign Up
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Typography sx={{ mt: 2, fontSize: 12, textAlign: "left" }}>
              Password should contain at least:
            </Typography>

            <List sx={{ fontSize: 13 }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasLowerCase && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 13 } }}
                  primary="One lowercase letter"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasUpperCase && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 13 } }}
                  primary="One uppercase letter"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasDigit && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 13 } }}
                  primary="One digit"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasSpecialChar && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 13 } }}
                  primary="One special character"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLengthValid && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 13 } }}
                  primary="And is at least 8 characters long"
                />
              </ListItem>
            </List>
            <LinearProgress
              sx={{ mt: 2 }}
              variant="determinate"
              value={passwordStrength}
              color={passwordStrengthMeterColor()}
            />
            <Typography sx={{ mt: 2 }}>
              <strong>Password strength: </strong>
              {createPasswordLabel(passwordStrength)}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isPwValid() || !username}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  component="button"
                  onClick={() => {
                    setIsLoginHandler(true);
                  }}
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <AuthErrorAlert></AuthErrorAlert>
    </>
  );
};

export default SignUp;
