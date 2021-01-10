import React from "react";
import { Router } from "@reach/router";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import UserForm from "./Components/UserForm/UserForm";
import Home from "./Components/Home";
import { Fonts } from "./theme/Fonts";

function App() {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <NavBar />
          <Router>
            <LandingPage path="/" />
            <Home path="/home" />
          </Router>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
