import React from "react";
import { Router } from "@reach/router";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Fonts } from "./theme/Fonts";
import AddTopic from "./Components/AddTopic/AddTopic";
import { Store, StateContext } from "./global.context/globalStore.reducer";
import Profile from "./Components/Profile/Profile";

function App() {
  const [state, dispatch] = Store();

  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <StateContext.Provider value={{ state, dispatch }}>
            <NavBar />
            <Router>
              <LandingPage path="/" />
              <AddTopic path="/add_topic" />
              <Profile path="/profile" />
            </Router>
          </StateContext.Provider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export { StateContext, App };
