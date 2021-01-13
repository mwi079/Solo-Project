import React from "react";
import { Router } from "@reach/router";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home";
import { Fonts } from "./theme/Fonts";
import { postTopic } from "./services/ApiClientService";
import { ScrollDirectionProvider } from "@hermanwikner/react-scroll-direction";

function App() {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <ScrollDirectionProvider>
            <NavBar />
            <Router>
              <LandingPage path="/" postTopic={postTopic} />
              <Home path="/home" />
            </Router>
          </ScrollDirectionProvider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
