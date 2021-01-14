import axios from "axios";
const apiUrl = "http://localhost:3500";

// topics api
export async function postTopic({ title, author, content }) {
  return axios.post(`${apiUrl}/forum/posts`, { title, author, content });
}

export async function getAllTopics() {
  return axios.get(`${apiUrl}/forum/allTopics`);
}
