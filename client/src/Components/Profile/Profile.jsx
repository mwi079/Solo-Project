import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/ApiTopicsClientService";

export default function Profile() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserPosts()
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Heading>Hello there!</Heading>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post._id}>
              {post.title} {post.content}
            </li>
          ))}
      </ul>
    </>
  );
}
