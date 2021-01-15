import { Heading, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/ApiTopicsClientService";
import TopicCardProfile from "../TopicCard/TopicCardProfile";

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
        <Grid
          templateRows="repeat(5, 1fr)"
          gap={6}
          mt="20px"
          mx="30px"
          px="30px"
          justifyContent="center"
        >
          {posts &&
            posts.map((post) => (
              <TopicCardProfile
                topic={post}
                setPosts={setPosts}
                posts={posts}
              />
            ))}
        </Grid>
      </Flex>
    </>
  );
}
