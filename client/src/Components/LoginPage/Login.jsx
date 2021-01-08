import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  FormLabel,
  FormControl,
  Input,
  Button,
  ThemeProvider,
  Flex,
} from "@chakra-ui/react";
import customTheme from "../../customTheme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getToken } from "../../services/ApiClientService";

function setToken(userToken) {
  // console.log(userToken, "userToken");
  localStorage.setItem("token", userToken);
  console.log(localStorage.getItem("token"));
}

export default function Login() {
  const { errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function loginUser(credentials) {
    await getToken(credentials)
      .then((res) => res.data)
      .then((token) => setToken(token))
      .catch((error) => setError(error.response.data));
  }

  async function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(userDetails);
      setIsLoading(false);
      // setUserDetails({email: "", password:""})
    } catch (error) {
      setIsLoading(false);
      //  setUserDetails({email: "", password:""})
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Flex width="full" align="center" justifyContent="center" mt={10}>
        <Box p={2}>
          {error && <ErrorMessage message={error} />}
          <form onSubmit={submitHandle}>
            <FormControl isInvalid={errors.message} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl isInvalid={errors.message} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              colorScheme="teal"
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
  );
}
