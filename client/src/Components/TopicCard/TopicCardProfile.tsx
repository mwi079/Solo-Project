import React, { useContext } from "react";
import { Button, Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";
import { deleteTopic } from "../../services/ApiTopicsClientService";
import "./TopicCardProfile.css";
import { Topic } from '../../interfaces/topic';
import { Post } from '../../interfaces/post'

type Props = {
  topic: Topic,
  setPosts: Function,
  posts: [Post]
}

export default function TopicCard({ topic, setPosts, posts } : Props ) {
  const { state } = useContext(StateContext);

  //function handleClick(event:any) {
  function handleClick() {
    const id = topic._id;
    deleteTopic(id)
      .then((res) => res.data)
      .catch((error) => console.error(error));

    const filteredPosts = posts.filter((post : Post) => post._id !== id);
    setPosts(filteredPosts);
  }

  return (
    <>
      {topic ? (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #caf0f8"
          py="40px"
          px="20px"
          borderRadius="lg"
          mt="30px"
          className="topic_card"
          key={topic._id}
        >
          <Flex flex="6" flexDir="column" key={topic._id}>
            <Box>
              <Heading size="md">{topic.title}</Heading>
            </Box>
            <Flex mt={5}>
              <Box pr={3}>
                <code>{topic.author.name}</code>
              </Box>
              <Flex mr="5px" h="2rem" alignItems="center">
                <Icon as={FcLike} ml="3px" size="sm" mr="5px" />
                <Text display="inline" alignSelf="center">
                  {topic.likes}
                </Text>
              </Flex>
              <Flex pl={2} fontStyle="italic" alignItems="center">
                {moment(topic.date).format("MMMM Do YYYY")}
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column-reverse">
            {(state.isAuth || state.isAuthWithGithub) && (
              <Button
                colorScheme="primary"
                size="sm"
                w="100px"
                //onClick={(event: any) => handleClick(event)}
                onClick={() => handleClick()}
              >
                Delete
              </Button>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #3333"
          py="40px"
          px="20px"
          borderRadius="lg"
        >
          <Text fontWeight="500" fontSize="20px">
            You have no topics yet...
          </Text>
        </Flex>
      )}
    </>
  );
}
