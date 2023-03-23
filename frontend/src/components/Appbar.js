import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import KeySafeLogo from "./KeySafeLogo.png";

export default function ButtonAppBar({ colorMode, changeColorMode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            alt="Logo"
            src={KeySafeLogo} //replace with your logo image path
            width={"100px"}
            style={{ filter: "invert(100%)", marginLeft: "20px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="div" sx={{ mr: 2 }}>
              Logout
            </Typography>
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
