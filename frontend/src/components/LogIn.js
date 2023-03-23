/*import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const LogIn = ({ setIsLoginHandler }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
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
            autoComplete="current-password"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"></Link>
            </Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setIsLoginHandler(false);
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;*/
import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeySafeLogo from "./KeySafeLogo.png";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
const LogIn = ({ setIsLoginHandler }) => {
  const theme = useTheme();
  return (
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
          Sign In
        </Typography>

        <Box noValidate sx={{ mt: 1 }}>
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
            autoComplete="current-password"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"></Link>
            </Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setIsLoginHandler(false);
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;
