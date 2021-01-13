import { Link } from "@reach/router";
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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import "./NavBar.css";
import { Flex } from "@chakra-ui/react";

export default function AuthorizedNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const colorScheme = useColorModeValue("button", "yellow");


  const changeBackground = () => {
    let nav = document.querySelector(".nav-wrapper");
    window.scrollY >= nav.clientHeight
      ? setIsScrolled(true)
      : setIsScrolled(false);
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <>
      <Flex
        p={3}
        className="nav-wrapper"
      >
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h2" size="md">
            Codagora
          </Heading>
        </Flex>
        <Flex>
          <Box>
            <Link to="/">
              <Button
                p={3}
                boxShadow="lg"
                mx={2}
                colorScheme={colorScheme}
                className={isScrolled ? "scrolled" : "button"}
              >
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
      </Flex>
    </>
  );
}