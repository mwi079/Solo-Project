import React, { useEffect } from "react";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Fonts } from "./theme/Fonts";
import AddTopic from "./Components/AddTopic/AddTopic";
import { Store, StateContext } from "./global.context/globalStore.reducer";
import Profile from "./Components/Profile/Profile";
import { getProfile, getGithubProfile } from "./services/ApiUserClientService";
import PageNotFound from "./Components/UI_Aids/PageNotFound";
import SingleTopicPage from "./Components/SingleTopicPage/SingleTopicPage";
import TransitionRouter from "./Components/Router/Router";
import Footer from "./Components/Footer/Footer";

function App () {
  const [state, dispatch] = Store();

  function getUserProfile(token) {
    if (state.isAuthWithGithub) {
      return getGithubProfile(token)
        .then((res) => res.data)
        .catch((error) => console.error(error));
    } else if (state.isAuth) {
      return getProfile(token)
        .then((res) => res.data)
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    
    window.scroll(0, 0);
    const token = window.localStorage.getItem("token");
    token &&
      getUserProfile(token).then((user) => {
        dispatch({ type: "user", payload: user });
      });
  }, []);

  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <StateContext.Provider value={{ state, dispatch }}>
            <NavBar />
            <TransitionRouter>
              <LandingPage path="/" />
              <AddTopic path="/add_topic" />
              <Profile path="/profile" />
              <SingleTopicPage path="single_topic/:id" />
              <PageNotFound default />
            </TransitionRouter>
            <Footer />
          </StateContext.Provider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export { StateContext, App };
