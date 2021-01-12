import React, { useState } from "react";
import { registerUser, login, completeAuthentication } from "../../services/ApiClientService";
import {
  Box,
  CircularProgress,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  ThemeProvider,
} from "@chakra-ui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import customTheme from "../../theme/";
import { Redirect } from "@reach/router";

export default function Signup() {
  async function registerNewUser({ name, email, password }) {
    registerUser({ name, email, password })
      .then((res) => res.data)
      .then(user => login(user))
      .then(token => completeAuthentication(token))
      .catch((error) => setError(error.response.data));
  }

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function submitHandle(e) {
    e.preventDefault();
    try {
      registerNewUser(userDetails);
      setIsLoading(false);
      setLoggedIn(true);
      setUserDetails({ name: "", email: "", password: "" });
    } catch (error) {
      setIsLoading(false);
      setError("");
    }
  }

  return (
    <>
    {loggedIn 
    ? <Redirect from="/api/user/register" to="/home" noThrow/>
  :<ThemeProvider theme={customTheme}>
        <Flex width="full" align="center" justifyContent="center" mt={10}>
          <Box>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={submitHandle}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={userDetails.name}
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={userDetails.email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl my={3} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    value={userDetails.password}
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
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Box>
        </Flex>
      </ThemeProvider>
  }
      
    </>
  );
}
