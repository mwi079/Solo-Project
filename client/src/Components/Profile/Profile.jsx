import {
  Button,
  Heading,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/ApiTopicsClientService";
import TopicCardProfile from "../TopicCard/TopicCardProfile";
import { AiOutlineMenu } from "react-icons/ai";
import "./Profile.css";
import Footer from "../Footer/Footer";

export default function Profile() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    getUserPosts()
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Flex flexDir="column" alignItems="center" my="50px" className="page">
        <Box alignSelf="flex-start" ml="20px">
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
        </Box>
        <Heading>Your topics:</Heading>
        <Flex
          mx="30px"
          mb="50px"
          px="30px"
          py="50px"
          justifyContent="center"
          flexDir="column"
          overflowY="auto"
          maxH="80vh"
          className="profile_box"
        >
          {posts &&
            posts.map((post) => (
              <TopicCardProfile
                topic={post}
                setPosts={setPosts}
                posts={posts}
              />
            ))}
        </Flex>
      </Flex>
    </>
  );
}
