import axios from "axios";
const apiUrl = "http://localhost:3500";

// authentication api
export async function login({ email, password }) {
  return axios.post(`${apiUrl}/api/user/login`, { email, password });
}

export async function registerUser({ name, surname, email, password }) {
  return axios.post(`${apiUrl}/api/user/register`, {
    name,
    surname,
    email,
    password,
  });
}

export async function registerUserGithub({
  name,
  surname,
  email,
  avatar_url,
  gists_url,
  html_url,
  location,
}) {
  return axios.post(`${apiUrl}/api/user/register_github`, {
    name,
    surname,
    email,
    avatar_url,
    gists_url,
    html_url,
    location,
  });
}

export async function getProfile(accessToken) {
  return axios.get(`${apiUrl}/api/user/profile`, {
    headers: { Authorization: accessToken },
  });
}

export async function getGithubProfile(accessToken) {
  return axios.get(`${apiUrl}/api/user/github_profile`, {
    headers: { Authorization: accessToken },
  });
}

export async function completeAuthentication(token) {
  localStorage.setItem("token", token);
}

export async function logOut() {
  localStorage.clear();
}

// github auth
export async function githubSignIn(code) {
  return axios
    .post(`${apiUrl}/api/user/github`, { code })
    .then((res) => res.data)
    .catch((error) => console.error(error));
}
