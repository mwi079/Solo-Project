import { Heading, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/ApiTopicsClientService";
import TopicCard from "../TopicCard/TopicCard";

export default function Profile() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserPosts()
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Heading>Your topics:</Heading>
        <ul>{posts && posts.map((post) => <TopicCard topic={post} />)}</ul>
      </Flex>
    </>
  );
}
