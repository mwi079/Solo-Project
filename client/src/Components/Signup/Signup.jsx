import React, { useState, useEffect } from "react";
import {
  registerUser,
  completeAuthentication,
  getProfile,
} from "../../services/ApiUserClientService";
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

export default function Signup({ isAuth, setUser, setIsAuth }) {
  async function registerNewUser({ name, email, password }) {
    registerUser({ name, email, password })
      .then((res) => {
        completeAuthentication(res.data);
        getProfile(res.data)
          .then((res) => setUser(res.data))
          .catch((error) => setError(error.response.data));
      })
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

  useEffect(() => {
    isAuth && document.querySelector(".form-wrapper").classList.remove("show");
  }, [isAuth, setIsAuth]);

  function submitHandle(e) {
    e.preventDefault();
    try {
      registerNewUser(userDetails);
      setIsLoading(false);
      if (!error) {
        setIsAuth(true);
      }
      setUserDetails({ name: "", email: "", password: "" });
    } catch (error) {
      setIsLoading(false);
    }
  }

  const validateForm = () => {
    return !userDetails.email || !userDetails.password || !userDetails.name;
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Flex width="full" align="center" justifyContent="center" mt={10}>
          <Box>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={submitHandle}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus={false}
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
                  autoFocus={false}
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
                    autoFocus={false}
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
                disabled={validateForm()}
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
    </>
  );
}
