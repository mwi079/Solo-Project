import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  FormLabel,
  FormControl,
  Input,
  InputRightElement,
  Button,
  Flex,
  InputGroup,
  ThemeProvider,
} from "@chakra-ui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Login.css";
import { login, completeAuthentication } from "../../services/ApiClientService";
import { Redirect } from "@reach/router";
import customTheme from "../../theme/";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  async function loginUser(credentials) {
    await login(credentials)
      .then((res) => res.data)
      .then((token) => completeAuthentication(token))
      .catch((error) => setError(error.response.data));
  }

  function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      loginUser(userDetails);
      setIsLoading(false);
      setLoggedIn(true);
      setUserDetails({ email: "", password: "" });
    } catch (error) {
      setIsLoading(false);
      setError("");
    }
  }

  return (
    <>
      {loggedIn ? (
        <Redirect from="/api/user/login" to="/home" noThrow />
      ) : (
        <ThemeProvider theme={customTheme}>
          <Flex width="full" align="center" justifyContent="center" mt={10}>
            <Box p={2}>
              {error && <ErrorMessage message={error} />}
              <form onSubmit={submitHandle}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    textOverflow="ellipsis"
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    value={userDetails.email}
                  />
                </FormControl>
                <FormControl isRequired my={3}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      value={userDetails.password}
                      textOverflow="ellipsis"
                      type={show ? "text" : "password"}
                      placeholder="*******"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  onClick={submitHandle}
                  width="full"
                  mt={4}
                  type="submit"
                  colorScheme="primary"
                  variant="outline"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Box>
          </Flex>
        </ThemeProvider>
      )}
    </>
  );
}
