import { Flex, Heading, Text, Avatar } from "@chakra-ui/react";
import React, { Fragment} from "react";

export default function Comments({ topic }) {
  return (
    <>
      <Heading size="md" mb="10px">
        Comments:
      </Heading>
      {topic.comments.length !== 0 ? (
        topic.comments.map((comment, index) => (
          <Fragment key={index}>
            <Flex flexDir="column" alignItems="center">
              <Flex
                px="50px"
                mb="20px"
                shadow="md"
                borderRadius="10px"
                w="100%"
                py="30px"
                wrap="wrap"
                flexDir="column"
              >
                <Flex alignItems="center" mb="20px">
                  <Avatar
                    mr="20px"
                    name={
                      comment.author
                        ? `${comment.author.name} ${comment.author.name.surname}`
                        : ""
                    }
                    src={
                      comment.author && comment.author.avatar_url
                        ? comment.author.avatar_url
                        : `https://tse4.mm.bing.net/th?id=OIP.PV6MZaUPyuN_H7kCfPeSVAHaE7&pid=Api`
                    }
                  ></Avatar>
                  <Text textDecor="underline">
                    {comment.author && comment.author.name}
                  </Text>
                </Flex>
                <Text fontSize="lg" fontWeight="500">
                  {comment.comment && comment.comment}
                </Text>
              </Flex>
            </Flex>
          </Fragment>
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
