import React from "react";
import { Router } from "@reach/router";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./customTheme";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserForm from "./Components/UserForm/UserForm";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <NavBar />
          <Router>
            <LandingPage path="/" />
            <Home path="/home" />
            <UserForm path="user/register" />
            <Dashboard path="application/dashboard" />
          </Router>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
