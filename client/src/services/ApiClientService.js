import { isTokenExpired } from "./jwtHelpers";
import axios from "axios";
const apiUrl = "http://localhost:3500";

// authentication api
export async function login({ email, password }) {
  return axios.post(`${apiUrl}/api/user/login`, { email, password });
}

export async function registerUser({ name, email, password }) {
  return axios.post(`${apiUrl}/api/user/register`, { name, email, password });
}

export async function completeAuthentication(token) {
  localStorage.setItem("token", token);
}

export async function isAuthenticated() {
  // Checks if there is a saved token and it's still valid
  const token = localStorage.getItem("token");
  if (token) {
    return !isTokenExpired(token);
  } else {
    return false;
  }
}

export async function logOut() {
  localStorage.clear();
}

// topics api
export async function postTopic({ title, author, content }) {
  return axios.post(`${apiUrl}/forum/posts`, { title, author, content });
}
