import { useForm } from 'react-hook-form';
import React, {useState} from 'react';
import './Login.css';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  ThemeProvider,
  VStack,
  Box,
  Heading
} from "@chakra-ui/react";
import customTheme from '../../customTheme';
import {getToken} from '../../ApiClientService';

async function setToken (userToken) {
  await sessionStorage.setItem('token', userToken);
}

export default function Login () {

  const { handleSubmit, errors, register, formState } = useForm();
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const [error, setError] = useState('');

  async function loginUser (credentials) {
  await getToken(credentials)
    .then(res => res.data)
    .catch(error => setError(error.response.data));
}

  async function submitHandle(e) {
    // e.preventDefault();
    const userToken = await loginUser(userDetails);
    setToken(userToken);
  }

  function validateName(value) {
    if (!value) return "Field is required";
  }

  return (
    <ThemeProvider theme={customTheme}>
      <VStack m={20}>
        <Heading size="lg">
          Login
        </Heading>
        <Box padding={5} rounded="lg">
          <form onSubmit={handleSubmit(submitHandle)}>
            <FormControl isInvalid={errors.message}>
              <FormLabel htmlFor="email">Email</FormLabel>
                <Input 
                  type="email" 
                  id="email_field"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  ref={register({ validate: validateName })}
                  onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                  />
                  <FormErrorMessage>
                   { (errors.name && errors.name.message) || error}
                  </FormErrorMessage>

                <FormLabel htmlFor="password">Password </FormLabel>
                <Input 
                  type="password" 
                  id="password_field"
                  name="password"
                  placeholder="Password"
                  ref={register({ validate: validateName })}
                  onChange={e => setUserDetails({...userDetails, password: e.target.value})}
                  />
                  <FormErrorMessage>
                   { (errors.name && errors.name.message) || error}
                  </FormErrorMessage>
            </FormControl>
            <Button mt={4} isLoading={formState.isSubmitting} type="submit" size="md" variant="outline" width="100px" bgColor="primary.100">
            Submit
            </Button>
    </form>
        </Box>
      </VStack>
      
    </ThemeProvider>
    
  )
}
