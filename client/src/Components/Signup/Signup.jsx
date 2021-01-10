import React, { useState } from "react";
import { registerUser } from "../../services/ApiClientService";
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
} from "@chakra-ui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useForm } from "react-hook-form";
// import SuccessMessage from "../SuccessMessage";

export default function Signup() {
  async function registerNewUser({ name, email, password }) {
    registerUser({ name, email, password })
      .then((res) => res.data)
      .then((user) => setUserDetails(user))
      .catch((error) => setError(error.response.data));
  }

  const { errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  function submitHandle(e) {
    e.preventDefault();
    try {
      registerNewUser(userDetails);
      setIsLoading(false);
      setUserDetails({ name: "", email: "", password: "" });
      setError("");
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt={10}>
        <Box>
          {error && <ErrorMessage message={error} />}
          <form onSubmit={submitHandle}>
            <FormControl isInvalid={errors.message} isRequired>
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
            <FormControl mt={3} isInvalid={errors.message} isRequired>
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
            <FormControl my={3} isInvalid={errors.message} isRequired>
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
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                "Register"
              )}
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
