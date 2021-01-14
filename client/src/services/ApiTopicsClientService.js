import axios from "axios";
const apiUrl = "http://localhost:3500";

// topics api
export async function postTopic({ title, author, content }) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${apiUrl}/forum/post_topic`,
    { title, author, content },
    {
      headers: { Authorization: token },
    }
  );
}

export async function getAllTopics() {
  return axios.get(`${apiUrl}/forum/allTopics`);
}
