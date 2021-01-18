import axios from "axios";
const apiUrl = "http://localhost:3500";

// topics api
export async function postTopic({ title, content, tags }) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${apiUrl}/forum/post_topic`,
    { title, content, tags },
    {
      headers: { Authorization: token },
    }
  );
}

export async function getAllTopics() {
  return axios.get(`${apiUrl}/forum/allTopics`);
}

export async function getUserPosts() {
  const token = localStorage.getItem("token");
  return axios.get(`${apiUrl}/forum/user_topics`, {
    headers: { Authorization: token },
  });
}

export async function deleteTopic(_id) {
  const token = localStorage.getItem("token");
  const config = {
    data: { _id },
    headers: { Authorization: token },
  };
  return axios.delete(`${apiUrl}/forum/delete`, config);
}

export async function getSingleTopic(id) {
  const token = localStorage.getItem("token");
  return axios.get(`${apiUrl}/forum/topic_comments/${id}`, {
    headers: { Authorization: token },
  });
}

export async function postComment(id, comment) {
  const token = localStorage.getItem("token");
  return axios.put(
    `${apiUrl}/forum/comment/${id}`,
    { comment },
    {
      headers: { Authorization: token },
    }
  );
}

export async function likePost(id) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${apiUrl}/forum/like_topic`,
    { id },
    {
      headers: { Authorization: token },
    }
  );
}

export async function dislikePost(id) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${apiUrl}/forum/dislike_topic`,
    { id },
    {
      headers: { Authorization: token },
    }
  );
}
