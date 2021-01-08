import axios from 'axios';
const apiUrl = 'http://localhost:3500';


export async function getToken ({email, password}) {
  return axios.post(`${apiUrl}/api/user/login`, {email, password})
}

export async function registerUser ({name, email, password}) {
  return axios.post(`${apiUrl}/api/user/register`, {name, email, password})
}