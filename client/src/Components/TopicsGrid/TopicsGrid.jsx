import React from "react";
import { Button, Flex, Box, Grid, Heading } from "@chakra-ui/react";

export default function TopisCGrid({ topics }) {
  return (
    <>
      <Grid templateRows="repeat(5, 1fr)" gap={6} mt="20px" mx="30px" px="30px">
        {topics &&
          topics.map((topic) => (
            <Flex w="100%" bg="tomato" py="40px" px="20px" key={topic._id}>
              <Flex flex="6" flexDir="column">
                <Box>
                  <Heading size="md">{topic.title}</Heading>
                </Box>
                <Box>
                  <code>{topic.author}</code>
                </Box>
                <Box>{topic.content}</Box>
              </Flex>
              <Flex flex="2" flexDir="column-reverse">
                <Button bg="white">Reply</Button>
              </Flex>
            </Flex>
          ))}
      </Grid>
    </>
  );
}
