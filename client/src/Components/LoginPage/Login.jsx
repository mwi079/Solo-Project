// React/services
import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../global.context/globalStore.reducer";
import {
  login,
  completeAuthentication,
  getProfile,
  getGithubProfile,
  registerUserGithub,
  githubSignIn,
} from "../../services/ApiUserClientService";
import onSuccess from "../../utils/auth.helpers";
import { validateLoginForm } from "../../utils/validation.helper";
import GitHubLogin from "react-github-login";

// UI/Components
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
  Text,
  Icon,
} from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
import ErrorMessage from "../UI_Aids/ErrorMessage/ErrorMessage";
import "./Login.css";
import customTheme from "../../theme/";

export default function Login() {
  // local states
  const { state, dispatch } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    (state.isAuth || state.isAuthWithGithub) &&
      !error &&
      document.querySelector(".form-wrapper").classList.remove("show");
  }, [state.isAuth, dispatch, error, state.isAuthWithGithub]);

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
      error.response.data
        ? setError(error.response.data)
        : console.error(error);
      setIsLoading(false);
    }
  }

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
              <Flex
                justifyContent="space-around"
                alignItems="center"
                mt="30px"
                flexDir="column"
              >
                <Button
                  mb="10px"
                  size="sm"
                  type="submit"
                  colorScheme="primary"
                  variant="outline"
                  boxShadow="sm"
                  disabled={validateLoginForm(
                    userDetails.email,
                    userDetails.password
                  )}
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
                    "Login"
                  )}
                </Button>
                <Text mb="10px" fontWeight="bold">
                  -OR-
                </Text>
              </Flex>
            </form>
            <Flex pr="20px" alignItems="center" justify="center">
              <Icon as={SiGithub} />
              <GitHubLogin
                redirectUri="http://localhost:3000/"
                clientId="1ccd653c63ee11bfbc36"
                className="github_btn"
                scope="user:email:gist"
                onSuccess={(response) =>
                  onSuccess(
                    response,
                    dispatch,
                    githubSignIn,
                    setError,
                    registerUserGithub,
                    completeAuthentication,
                    getGithubProfile
                  )
                }
                onFailure={(error) => console.error(error)}
              />
            </Flex>
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
}
