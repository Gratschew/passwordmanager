import logo from "./logo.svg";
import "./App.css";
import ButtonAppBar from "./components/Appbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Container from "@mui/material/Container";
import LogInHandler from "./components/LogInHandler";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const changeColorMode = (isDarkMode) => {
    setDarkMode(isDarkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <ButtonAppBar changeColorMode={changeColorMode} colorMode={darkMode} />
        <LogInHandler></LogInHandler>
      </div>
    </ThemeProvider>
  );
}

export default App;
