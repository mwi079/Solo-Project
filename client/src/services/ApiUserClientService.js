import axios from "axios";
const apiUrl = "http://localhost:3500";

// authentication api
export async function login({ email, password }) {
  return axios.post(`${apiUrl}/api/user/login`, { email, password });
}

export async function registerUser({ name, email, password }) {
  return axios.post(`${apiUrl}/api/user/register`, { name, email, password });
}

export async function getProfile(accessToken) {
  return axios.get(`${apiUrl}/api/user/profile`, {
    headers: { Authorization: accessToken },
  });
}

export async function completeAuthentication(token) {
  localStorage.setItem("token", token);
}

export async function logOut() {
  localStorage.clear();
}
