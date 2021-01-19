import React, { useEffect } from "react";
import { Grid, Flex, Text } from "@chakra-ui/react";
import TopicCard from "../TopicCard/TopicCard";

export default function TopisCGrid({ topics, setTopics }) {
  useEffect(() => {}, [topics, setTopics]);
  return (
    <>
      {topics ? (
        <Grid
          gap={6}
          mt="20px"
          mx="30px"
          pt="30px"
          justifyContent="center"
          alignItems="center"
          pb="120px"
        >
          {topics.map((topic) => (
            <TopicCard topic={topic} setTopics={setTopics} key={topic._id} />
          ))}
        </Grid>
      ) : (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #3333"
          py="40px"
          px="20px"
          borderRadius="lg"
          alignItems="center"
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
