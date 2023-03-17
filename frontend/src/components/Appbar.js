import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";

export default function ButtonAppBar({ colorMode, changeColorMode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"error"}>
        <Toolbar>
          <Typography>Logout</Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              changeColorMode(!colorMode);
            }}
          >
            {colorMode ? <LightModeIcon /> : <DarkModeIcon></DarkModeIcon>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
