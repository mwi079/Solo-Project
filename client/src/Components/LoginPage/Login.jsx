import { useForm } from 'react-hook-form';
import React, {useState} from 'react';
// import './Login.css';
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
import customTheme from '../../customTheme';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {getToken} from '../../services/ApiClientService';

async function setToken (userToken) {
  await sessionStorage.setItem('token', userToken);
}

export default function Login () {

  const { errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const [error, setError] = useState('');

  async function loginUser (credentials) {
    await getToken(credentials)
      .then(res => res.data)
      .catch(error => setError(error.response.data));
}

  async function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const userToken = await loginUser(userDetails);
      console.log(userToken);
      setIsLoading(false)
      setToken(userToken);
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
          {error && <ErrorMessage message={error}/>}
          <form onSubmit={submitHandle}>
            <FormControl isInvalid={errors.message} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
            </FormControl>
            <FormControl isInvalid={errors.message} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={e => setUserDetails({...userDetails, password: e.target.value})}/>
            </FormControl>
            <Button width="full" mt={4} type="submit" colorScheme="teal" variant="outline" boxShadow="sm" _hover={{boxShadow: "md"}} _active={{boxShadow: "lg"}}> 
              {isLoading 
                ? (<CircularProgress isIndeterminate size="24px" color="teal" />) 
                : ('Sign In')}
            </Button>
          </form>
        </Box>
      </Flex>
    </ThemeProvider>
    
  )
}
