import { Flex, Heading, Box, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSingleTopic } from "../../services/ApiTopicsClientService";
import moment from "moment";

export default function SingleTopicPage(props) {
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    getSingleTopic(props.id)
      .then((res) => setTopic(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {topic ? (
        <Flex flexDir="column" alignItems="center" mt="50px">
          <Heading textDecor="underline">{topic.title}</Heading>
          <Box
            mt="30px"
            width="70%"
            border="1px solid black"
            borderRadius="10px"
            p="10px"
            pos="relative"
          >
            <Text>{topic.content}</Text>
            <Button
              px="15px"
              float="right"
              mt="15px"
              lineHeight="40px"
              borderRadius="10px"
            >
              Comment
            </Button>
          </Box>
          <Box mt="15px">
            <Text fontWeight="bold" display="inline" mr="5px">
              Author:
            </Text>{" "}
            {topic.author.name}
          </Box>
          <Box mt="15px">
            <Text fontWeight="bold" display="inline" mr="5px">
              Date:
            </Text>{" "}
            {moment(topic.date).format("MMMM Do YYYY")}
          </Box>
          <Box mt="15px">
            <Text fontWeight="bold" display="inline" mr="5px">
              Likes:
            </Text>{" "}
            {topic.likes}
          </Box>
          <Box mt="15px">
            <Text fontWeight="bold" display="inline" mr="5px">
              Replies:
            </Text>{" "}
            {topic.replies}
          </Box>
        </Flex>
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Heading>Sorry, I couldn't find the topic... 😔</Heading>
        </Flex>
      )}
    </>
  );
}
