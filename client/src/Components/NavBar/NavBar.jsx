import { Link } from "@reach/router";
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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
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
    if (window.scrollY > navbar.clientHeight) {
      navbar.classList.add("scrolled");
      title.classList.add("scrolled_title");
    } else {
      navbar.classList.remove("scrolled");
      title.classList.remove("scrolled_title");
    }
  });

  const handleLogOut = () => {
    logOut();
    dispatch({ type: "isAuth", payload: false });
    dispatch({ type: "user", payload: null });
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
      >
        <Flex flexDir="column" justifyContent="center" className="app_title">
          <Heading as="h2" size="md">
            Codagora
          </Heading>
        </Flex>
        <Spacer />
        {state.isAuth ? (
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
              <Tooltip
                label={state.user ? state.user.name : "Profile"}
                arrowSize={3}
                hasArrow
              >
                <Link to="/profile">
                  <Button p={3} boxShadow="lg" mx={2} borderRadius="50%">
                    <img src={UserIcon} alt="" />
                  </Button>
                </Link>
              </Tooltip>
            </ButtonGroup>
          </>
        ) : (
          <Flex>
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
