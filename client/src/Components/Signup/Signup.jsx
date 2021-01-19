import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../global.context/globalStore.reducer";
import { validateSignupForm } from "../../utils/validation.helper";
import GitHubLogin from "react-github-login";
import onSuccess from "../../utils/auth.helpers";
import {
  registerUser,
  completeAuthentication,
  getProfile,
  getGithubProfile,
  registerUserGithub,
  githubSignIn,
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
  Text,
} from "@chakra-ui/react";
import ErrorMessage from "../UI_Aids/ErrorMessage/ErrorMessage";
import customTheme from "../../theme/";
// import ImageUploader from "react-images-upload";
import "./Signup.css";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  // const [image, setImage] = useState({ pictures: [] });
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    state.isAuth &&
      document.querySelector(".form-wrapper").classList.remove("show");
  }, [state.isAuth]);

  async function submitHandle(e) {
    e.preventDefault();
    try {
      await registerUser(userDetails).then((res) => {
        completeAuthentication(res.data);
        getProfile(res.data).then((res) =>
          dispatch({ type: "user", payload: res.data })
        );
      });
      setIsLoading(false);
      dispatch({ type: "isAuth", payload: true });
      setUserDetails({ name: "", email: "", surname: "", password: "" });
    } catch (error) {
      setIsLoading(false);
      error.response.data
        ? setError(error.response.data)
        : console.error(error);
    }
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Flex
          width="full"
          align="center"
          justifyContent="center"
          mt={10}
          p="10px"
        >
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
              <FormControl isRequired>
                <FormLabel>Surname</FormLabel>
                <Input
                  autoFocus={false}
                  value={userDetails.surname}
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, surname: e.target.value })
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
              {/* <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              /> */}

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
                  disabled={validateSignupForm(
                    userDetails.email,
                    userDetails.password,
                    userDetails.name,
                    userDetails.surname
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
                    "Register"
                  )}
                </Button>
                <Text mb="10px" fontWeight="bold">
                  -OR-
                </Text>
              </Flex>
            </form>
            <GitHubLogin
              redirectUri="http://localhost:3000/"
              clientId="1ccd653c63ee11bfbc36"
              className="github_btn"
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
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
}
