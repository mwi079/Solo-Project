import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Signup from "../Signup/Signup";
import "./UserForm.css";
import Login from "../LoginPage/Login";

export default function UserForm() {
  const { colorMode } = useColorMode();
  return (
    <Flex justifyContent="center" mt={5}>
      <Box
        bg={colorMode === "light" ? "#fff" : "gray.700"}
        p={6}
        boxShadow="lg"
        rounded="lg"
        w="350px"
      >
        <Tabs variant="enclosed-colored" align="center" isFitted>
          <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Signup />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
