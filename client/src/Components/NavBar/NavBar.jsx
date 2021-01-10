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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import "./NavBar.css";
import { Flex } from "@chakra-ui/react";
import UserForm from "../UserForm/UserForm";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = (e) => {
    console.log(e.target.classList);
    if (
      e.target.classList.contains("form.wrapper") ||
      e.target.classList.contains("show")
    ) {
      document.querySelector(".form-wrapper").classList.remove("show");
    }
  };

  return (
    <>
      <div className="form-wrapper" onClick={(e) => handleClick(e)}>
        <UserForm />
      </div>
      <Flex p={3} className="nav-wrapper">
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h2" size="md">
            Codagora
          </Heading>
        </Flex>
        <Flex>
          <Box>
            <Link to="/">
              <Button p={3} boxShadow="lg" mx={2} colorScheme="primary">
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
        </Flex>
      </Flex>
    </>
  );
}
