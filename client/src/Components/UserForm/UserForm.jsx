import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ThemeProvider,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Signup from "../Signup/Signup";
import "./UserForm.css";
import Login from "../LoginPage/Login";
import customTheme from "../../theme";

// type Props = {
//   isAuth: boolean,
//   setUser: any,
//   setIsAuth: boolean
// }

export default function UserForm ( props ) {

  const { isAuth, setUser, setIsAuth } = props;

  const { colorMode } = useColorMode();
  return (
    <ThemeProvider theme={customTheme}>
      <Flex justifyContent="center" mt={5}>
        <Box
          bg={colorMode === "light" ? "#fff" : "gray.700"}
          p={6}
          boxShadow="lg"
          rounded="lg"
          w="400px"
        >
          <Tabs variant="enclosed-colored" align="center" isFitted>
            <TabList>
              <Tab>Sign Up</Tab>
              <Tab>Login</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signup
                  setUser={setUser}
                  setIsAuth={setIsAuth}
                  isAuth={isAuth}
                />
              </TabPanel>
              <TabPanel>
                <Login
                  setUser={setUser}
                  setIsAuth={setIsAuth}
                  isAuth={isAuth}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}
