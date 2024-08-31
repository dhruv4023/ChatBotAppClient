// Import necessary dependencies and components
import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"; // Import theme settings
import { AllRoutes } from "./Components/AllRoutes";
import { getSession } from "./Pages/LoginPage/LoginRegisterChangePass";

const App = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode);
  useEffect(() => {
    dispatch(getSession())
  }, [dispatch])

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AllRoutes />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
