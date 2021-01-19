import { Link, navigate } from "@reach/router";
import { logOut } from "../../services/ApiUserClientService";
import { MdHome } from "react-icons/md";
import UserIcon from "../../assets/user.svg";
import {
  useColorMode,
  Box,
  IconButton,
  Icon,
  Button,
  Heading,
  Tooltip,
  useColorModeValue,
  Spacer,
  ButtonGroup,
  Avatar,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Owl from "../../assets/Icons/owl.svg";

import React, { useContext } from "react";
import "./NavBar.css";
import { Flex } from "@chakra-ui/react";
import UserForm from "../UserForm/UserForm";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorScheme = useColorModeValue("button", "yellow");
  const { state, dispatch } = useContext(StateContext);

  const handleClick = (e) => {
    if (
      e.target.classList.contains("form.wrapper") ||
      e.target.classList.contains("show")
    ) {
      document.querySelector(".form-wrapper").classList.remove("show");
    }
  };

  window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".nav-wrapper");
    let title = document.querySelector(".app_title");
    let user = document.querySelector(".profile-name");
    if (window.scrollY > navbar.clientHeight) {
      navbar.classList.add("scrolled");
      title.classList.add("scrolled_title");
      user && user.classList.add("scrolled_profile");
    } else {
      navbar.classList.remove("scrolled");
      title.classList.remove("scrolled_title");
      user && user.classList.remove("scrolled_profile");
    }
  });

  const handleLogOut = () => {
    logOut();
    dispatch({ type: "isAuth", payload: false });
    dispatch({ type: "isAuthWithGithub", payload: false });
    dispatch({ type: "user", payload: null });
    navigate("/");
  };

  return (
    <>
      <div className="form-wrapper" onClick={handleClick}>
        <UserForm />
      </div>
      <Flex
        p={3}
        className="nav-wrapper"
        px="30px"
        top="0"
        pos="sticky"
        h="70px"
        alignSelf="flex-start"
      >
        <Flex justifyContent="center" className="app_title" alignItems="center">
          <figure style={{ backgroundImage: `url(${Owl})` }}></figure>
          <Heading as="h2" size="md">
            Codagora
          </Heading>
        </Flex>
        <Spacer />
        {state.isAuth || state.isAuthWithGithub ? (
          <>
            <ButtonGroup spacing="4">
              <Box>
                <Link to="/">
                  <Button p={3} boxShadow="lg" mx={2} colorScheme={colorScheme}>
                    <Icon as={MdHome} />
                  </Button>
                </Link>
              </Box>
              <Button onClick={handleLogOut}>Logout</Button>
              <Link to="/profile" className="profile-name">
                <Flex alignItems="center">
                  <Box fontWeight="bold">
                    {state.user ? state.user.name : ""}
                  </Box>
                  <Avatar
                    ml="10px"
                    name={
                      state.user
                        ? `${state.user.name} ${state.user.surname}`
                        : ""
                    }
                    src={
                      state.user && state.user.avatar_url
                        ? state.user.avatar_url
                        : `https://tse4.mm.bing.net/th?id=OIP.PV6MZaUPyuN_H7kCfPeSVAHaE7&pid=Api`
                    }
                  ></Avatar>
                </Flex>
              </Link>
            </ButtonGroup>
          </>
        ) : (
          <Flex>
            <Box>
              <Link to="/">
                <Button p={3} boxShadow="lg" mx={2} colorScheme={colorScheme}>
                  <Icon as={MdHome} />
                </Button>
              </Link>
            </Box>
            <Box textAlign="right" mr={3} ml={3}>
              {colorMode === "light" ? (
                <IconButton icon={<SunIcon />} onClick={toggleColorMode} />
              ) : (
                <IconButton icon={<MoonIcon />} onClick={toggleColorMode} />
              )}
            </Box>

            <Tooltip label="Register" arrowSize={3} hasArrow>
              <Button
                p={3}
                boxShadow="lg"
                mx={2}
                borderRadius="50%"
                onClick={() =>
                  document.querySelector(".form-wrapper").classList.add("show")
                }
              >
                <img src={UserIcon} alt="" />
              </Button>
            </Tooltip>
          </Flex>
        )}
      </Flex>
    </>
  );
}
