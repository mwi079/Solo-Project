import React from "react";
import { Grid, Flex, Text } from "@chakra-ui/react";
import TopicCard from "../TopicCard/TopicCard";

export default function TopisCGrid({ topics }) {
  return (
    <>
      {topics ? (
        <Grid
          gap={6}
          mt="20px"
          mx="30px"
          px="30px"
          justifyContent="center"
          alignItems="center"
        >
          {topics.map((topic) => (
            <TopicCard topic={topic} />
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
