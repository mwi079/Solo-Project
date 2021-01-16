import React, { useContext } from "react";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";
import { Link } from "@reach/router";

export default function TopicCard({ topic }) {
  const { state } = useContext(StateContext);

  return (
    <>
      {topic ? (
        <Link to={`single_topic/${topic._id}`}>
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
              <Flex mt="10px">
                {topic.tags.map((tag) => (
                  <Box
                    key={tag.name}
                    px="12px"
                    py="4px"
                    mx="10px"
                    fontSize="12px"
                    bg={tag.color}
                    color="white"
                    opacity="0.8"
                    fontWeight="bold"
                    borderRadius="lg"
                  >
                    {tag.language}
                  </Box>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column-reverse">
              {state.isAuth && (
                <Button colorScheme="primary" size="sm" w="100px">
                  Reply
                </Button>
              )}
            </Flex>
          </Flex>
        </Link>
      ) : (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #3333"
          py="40px"
          px="20px"
          borderRadius="lg"
        >
          <Text fontWeight="500" fontSize="20px">
            Sorry, there are no quesitons yet. Hurry, and be the first one to
            begin the conversation! 🗣️
          </Text>
        </Flex>
      )}
    </>
  );
}
