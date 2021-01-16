import { Flex, Heading, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSingleTopic } from "../../services/ApiTopicsClientService";

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
        <Flex flexDir="column" alignItems="center">
          <Heading>{topic.title}</Heading>
          <Box>{topic.content}</Box>
        </Flex>
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Heading>Sorry, I couldn't find the topic... 😔</Heading>
        </Flex>
      )}
    </>
  );
}
