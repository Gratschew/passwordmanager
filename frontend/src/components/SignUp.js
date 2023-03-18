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
const SignUp = ({ setIsLoginHandler }) => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(51);

  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={null} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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

            <List sx={{ fontSize: 12 }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasLowerCase && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 12 } }}
                  primary="one lowercase letter"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasUpperCase && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 12 } }}
                  primary="one uppercase letter"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasDigit && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 12 } }}
                  primary="one digit"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {hasSpecialChar && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 12 } }}
                  primary="one special character"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLengthValid && <CheckIcon color="success" />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontSize: 12 } }}
                  primary="and is at least 8 characters long"
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
              disabled={!isPwValid()}
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
    </>
  );
};

export default SignUp;
