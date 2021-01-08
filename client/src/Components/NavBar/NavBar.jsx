import { Link } from "@reach/router";
import {
  useColorMode,
  Box,
  IconButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import "./NavBar.css";
import { Flex } from "@chakra-ui/react";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex p={3} className="nav-wrapper">
        <Flex flexDir="column" justifyContent="center">
          <Heading size="md">Codagora</Heading>
        </Flex>
        <Flex>
          <Box textAlign="right">
            <Link to="/user/register">
              <Button p={3} boxShadow="lg" mx={2}>
                Register
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
        </Flex>
      </Flex>
    </>
  );
}
