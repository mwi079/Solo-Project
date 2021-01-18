import React, { useContext, useState } from "react";
import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Collapse,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";
import { Link } from "@reach/router";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Comments from "../Comments/Comments";
import { likePost, dislikePost } from "../../services/ApiTopicsClientService";
import "./TopicCard.css";

export default function TopicCard(props) {
  const { state } = useContext(StateContext);
  const { isOpen, onToggle } = useDisclosure();
  const [liked, setLiked] = useState(false);
  const [topic, setTopic] = useState(props.topic);

  function clickedLike() {
    if (!liked) {
      likePost(topic._id)
        .then((res) => setTopic(res.data))
        .catch((error) => console.error(error));
    } else {
      dislikePost(topic._id)
        .then((res) => setTopic(res.data))
        .catch((error) => console.error(error));
    }
    setLiked(!liked);
  }

  return (
    <>
      {topic ? (
        <>
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
            <Flex flexDir="row-reverse" alignItems="flex-end">
              {state.isAuth && (
                <Link to={`single_topic/${topic._id}`}>
                  <Button colorScheme="primary" size="sm" w="100px">
                    Reply
                  </Button>
                </Link>
              )}
              <Button
                colorScheme="button"
                size="sm"
                w="100px"
                onClick={onToggle}
                mr="10px"
              >
                Comments
              </Button>
              <Flex h="2rem" mr="20px" alignItems="center">
                {topic.likes}
              </Flex>
              <Box mr="5px" h="2rem">
                {!liked ? (
                  <IconButton
                    icon={<FcLikePlaceholder />}
                    ml="3px"
                    className="like_btn"
                    size="sm"
                    isRound
                    onClick={clickedLike}
                  />
                ) : (
                  <IconButton
                    icon={<FcLike />}
                    ml="3px"
                    className="like_btn"
                    size="sm"
                    isRound
                    onClick={clickedLike}
                  />
                )}
              </Box>
            </Flex>
          </Flex>
          <Collapse className="comment_area" in={isOpen} animateOpacity>
            <Flex my="20px" maxH="200px" w="40vw" px="10px" flexDir="column">
              <Comments topic={topic} />
            </Flex>
          </Collapse>
        </>
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
