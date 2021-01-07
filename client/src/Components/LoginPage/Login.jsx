import { useForm } from 'react-hook-form';
import React, {useState} from 'react';
import './Login.css';
import {AtSignIcon} from '@chakra-ui/icons';
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  ThemeProvider,
  Heading,
  Flex,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import customTheme from '../../customTheme';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {getToken} from '../../ApiClientService';

async function setToken (userToken) {
  await sessionStorage.setItem('token', userToken);
}

export default function Login () {

  const {errors, register, formState } = useForm();
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const [error, setError] = useState('');

  async function loginUser (credentials) {
    await getToken(credentials)
      .then(res => res.data)
      .catch(error => setError(error.response.data));
}

  async function submitHandle(e) {
      e.preventDefault();
      const userToken = await loginUser(userDetails);
      setToken(userToken);
      setUserDetails({email: "", password:""})
  }


  return (
    <ThemeProvider theme={customTheme}>
      <Flex width="full" align="center" justifyContent="center" mt={10}>
        <Box p={2}>
          <Box textAlign="center">
            <Heading size="lg">Login</Heading>
          </Box>

          <Box my={4} textAlign="left" p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          {error && <ErrorMessage message={error}/>}
          <form onSubmit={submitHandle}>
            <FormControl isInvalid={errors.message} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
            </FormControl>
            <FormControl mt={6} isInvalid={errors.message} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={e => setUserDetails({...userDetails, password: e.target.value})}/>
            </FormControl>
            <Button width="full" mt={4} type="submit" variantcolor="teal" variant="outline" >
              Sign In
            </Button>
          </form>
        </Box>
        </Box>
      </Flex>
      
    </ThemeProvider>
    
  )
}
