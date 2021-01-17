import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function Comments({ topic }) {
  return (
    <>
      <Heading size="md" mb="10px">
        Comments:
      </Heading>
      {topic.comments.length !== 0 ? (
        topic.comments.map((comment) => (
          <>
            <Flex flexDir="column" alignItems="center">
              <Flex
                px="50px"
                mb="20px"
                shadow="md"
                borderRadius="10px"
                w="100%"
                py="30px"
                wrap="wrap"
              >
                <Text>Author: {comment.author.name}</Text>
                <Heading size="md">{comment.comment}</Heading>
              </Flex>
            </Flex>
          </>
        ))
      ) : (
        <>
          <Flex
            px="30px"
            shadow="md"
            p="10px"
            justify="center"
            borderRadius="10px"
          >
            <Text>No comments yet.. 😕</Text>
          </Flex>
        </>
      )}
    </>
  );
}
