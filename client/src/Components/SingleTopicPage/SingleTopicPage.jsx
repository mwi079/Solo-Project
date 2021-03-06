import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Icon,
  useDisclosure,
  Collapse,
  Textarea,
  ScaleFade,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getSingleTopic,
  postComment,
} from "../../services/ApiTopicsClientService";
import moment from "moment";
import { FcLike } from "react-icons/fc";

export default function SingleTopicPage(props) {
  const [topic, setTopic] = useState(null);
  const [author, setAuthor] = useState(null);
  const { isOpen, onToggle } = useDisclosure();
  const [comment, setComment] = useState("");

  useEffect(() => {
    getSingleTopic(props.id)
      .then((res) => {
        const { author, topic } = res.data;
        setTopic(topic);
        setAuthor(author);
      })
      .catch((error) => console.error(error));
  }, [props.id]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      postComment(props.id, comment);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {topic ? (
        <>
          <Flex flexDir="column" alignItems="center" mt="50px" className="page">
            <Heading textDecor="underline">{topic.title}</Heading>
            <Box
              mt="30px"
              width="70%"
              border="1px solid black"
              borderRadius="10px"
              p="30px"
              pos="relative"
            >
              <Text>{topic.content}</Text>

              <Flex justify="space-between" alignItems="center" mt="15px">
                <Flex>
                  <Flex
                    px="15px"
                    mt="15px"
                    lineHeight="40px"
                    borderRadius="10px"
                    mr="5px"
                    bg="transparent"
                    alignItems="center"
                  >
                    {topic.likes}
                    <Icon as={FcLike} ml="3px" />
                  </Flex>
                  <Box alignSelf="center" mx="5px">
                    <Text fontWeight="bold" mr="5px" textAlign="center">
                      Author:
                    </Text>{" "}
                    {author && author.name}
                  </Box>
                  <Box alignSelf="center" mx="5px">
                    <Text fontWeight="bold" mr="5px" textAlign="center">
                      Date:
                    </Text>
                    {moment(topic.date).format("MMMM Do YYYY")}
                  </Box>
                  <Box alignSelf="center" mx="5px">
                    <Text fontWeight="bold" mr="5px">
                      Replies:
                    </Text>{" "}
                    <Text textAlign="center">{topic.replies}</Text>
                  </Box>
                </Flex>

                <Box>
                  <Button
                    px="15px"
                    lineHeight="40px"
                    borderRadius="10px"
                    onClick={onToggle}
                  >
                    Comment
                  </Button>
                </Box>
              </Flex>
            </Box>
            <form onSubmit={handleSubmit}>
              <Collapse in={isOpen} animateOpacity width="100%">
                <Flex flexDir="column">
                  <Textarea
                    placeholder="Write your comment here"
                    margin="10px auto"
                    border="1px solid black"
                    rounded="md"
                    shadow="md"
                    width="700px"
                    resize="none"
                    endingHeight="50%"
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                  <Button
                    display="block"
                    alignSelf="flex-end"
                    type="submit"
                    onClick={onToggle}
                  >
                    Submit
                  </Button>
                </Flex>
              </Collapse>
            </form>
          </Flex>
          <ScaleFade
            initialScale={0.3}
            in={isOpen}
            maxW="300px"
            margin="0 auto"
          >
            <Box
              p="40px"
              color="white"
              mt="4"
              bg="teal.500"
              rounded="md"
              shadow="md"
            >
              Your comment has been created! ✅
            </Box>
          </ScaleFade>
        </>
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Heading>Sorry, I couldn't find the topic... 😔</Heading>
        </Flex>
      )}
    </>
  );
}
