import React, { useState } from "react";
import { Router } from "@reach/router";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Fonts } from "./theme/Fonts";
import { ScrollDirectionProvider } from "@hermanwikner/react-scroll-direction";

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(
    window.localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <ScrollDirectionProvider>
            <NavBar
              setIsAuth={setIsAuth}
              user={user}
              setUser={setUser}
              isAuth={isAuth}
            />
            <LandingPage />
            <Dashboard />
            <Router></Router>
          </ScrollDirectionProvider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
