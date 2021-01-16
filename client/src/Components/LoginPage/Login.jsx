import React, { useState, useEffect, useContext } from "react";
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
import ErrorMessage from "../UI_Aids/ErrorMessage/ErrorMessage";
import "./Login.css";
import {
  login,
  completeAuthentication,
  getProfile,
} from "../../services/ApiUserClientService";
import customTheme from "../../theme/";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function Login() {
  const { state, dispatch } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    state.isAuth &&
      !error &&
      document.querySelector(".form-wrapper").classList.remove("show");
  }, [state.isAuth, dispatch, error]);

  function loginUser(credentials) {
    return login(credentials)
      .then((token) => {
        getProfile(token.data).then((user) =>
          dispatch({ type: "user", payload: user.data })
        );
        completeAuthentication(token.data);
        return { error: null };
      })
      .catch((error) => ({ error: error.response.data }));
  }

  async function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError("");
      const result = await loginUser(userDetails);
      setIsLoading(false);
      if (!result.error) {
        dispatch({ type: "isAuth", payload: true });
      } else {
        setError(result.error);
      }
      setUserDetails({ email: "", password: "" });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const validateForm = () => {
    return !userDetails.email || !userDetails.password;
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Flex width="full" align="center" justifyContent="center" mt={10}>
          <Box p={2}>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={submitHandle}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  autoFocus={false}
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
                    autoFocus={false}
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
                disabled={validateForm()}
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
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
}
