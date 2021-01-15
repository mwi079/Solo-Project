import React, { useContext } from "react";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";
import { deleteTopic } from "../../services/ApiTopicsClientService";

export default function TopicCard({ topic, setPosts, posts }) {
  const { state } = useContext(StateContext);

  function handleClick(e) {
    const title = e.target.parentElement.parentElement.parentElement.firstChild.innerText.split(
      "\n"
    )[0];

    deleteTopic({ title })
      .then((res) => res.data)
      .catch((error) => console.error(error));

    const filteredPosts = posts.filter((post) => post.title !== title);
    setPosts(filteredPosts);
  }

  return (
    <>
      {topic ? (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #3333"
          py="40px"
          px="20px"
          borderRadius="lg"
        >
          <Flex flex="6" flexDir="column" key={topic._id}>
            <Box>
              <Heading size="md">{topic.title}</Heading>
            </Box>
            <Flex my={3}>
              <Box pr={3}>
                <code>{topic.author.name}</code>
              </Box>
              <Box pl={2} fontStyle="italic">
                {moment(topic.date).format("MMMM Do YYYY")}
              </Box>
            </Flex>
            {/* <Flex>
              {topic.tags.map((tag) => (
                <Box border="1px solid black" p="5px" mx="10px">
                  {tag}
                </Box>
              ))}
            </Flex> */}
          </Flex>
          <Flex flexDir="column-reverse">
            {state.isAuth && (
              <Button
                colorScheme="primary"
                size="sm"
                w="100px"
                onClick={(e) => handleClick(e)}
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
