import {
  Button,
  Heading,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/ApiTopicsClientService";
import TopicCardProfile from "../TopicCard/TopicCardProfile";
import { AiOutlineMenu } from "react-icons/ai";

export default function Profile() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserPosts()
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Flex ml="30px">
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            <Icon as={AiOutlineMenu}></Icon>
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Topics</MenuItem>
              <MenuItem>My gists</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      <Flex flexDir="column" alignItems="center" mt="50px">
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
