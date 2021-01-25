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
  Avatar,
} from "@chakra-ui/react";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";
import { Link } from "@reach/router";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Comments from "../Comments/Comments";
import { likePost, dislikePost } from "../../services/ApiTopicsClientService";
import "./TopicCard.css";

export default function TopicCard({topic, setTopics}) {
  // useEffect(() => {}, [props.topics, props.setTopics]);

  const { state } = useContext(StateContext);
  const { isOpen, onToggle } = useDisclosure();
  const [liked, setLiked] = useState(false);
  //const [topic, setTopic] = useState(props.topic);

  function clickedLike() {
    if (state.isAuth || state.isAuthWithGithub) {
      if (!liked) {
        likePost(topic._id)
          .then((res) => {
            setTopics(res.data);
          })
          .catch((error) => console.error(error));
      } else {
        dislikePost(topic._id)
          .then((res) => setTopics(res.data))
          .catch((error) => console.error(error));
      }
      setLiked(!liked);
    } else {
      document.querySelector(".form-wrapper").classList.add("show");
    }
  }
  return (
    <>
      {topic ? (
        <div 
          data-testid="topic-cards" className="topic-card">
          <Flex
            w="40vw"
            boxShadow="0 0 10px #3333"
            py="40px"
            px="20px"
            borderRadius="lg"
            flexDir="column"
          >
            <Flex alignItems="center" justify="space-between">
              <Flex justify="center">
                <Heading data-testid="topic-title" size="lg">{topic.title}</Heading>
              </Flex>
              <Flex>
                <Avatar
                  mr="20px"
                  name={
                    topic.author
                      ? `${topic.author.name} ${topic.author.name.surname}`
                      : ""
                  }
                  src={
                    topic.author && topic.author.avatar_url
                      ? topic.author.avatar_url
                      : `https://tse4.mm.bing.net/th?id=OIP.PV6MZaUPyuN_H7kCfPeSVAHaE7&pid=Api`
                  }
                ></Avatar>
                <Text 
                  data-testid="topic-author" 
                  display="inline">
                  {topic.author.name}
                </Text>
              </Flex>
            </Flex>

            <Flex mt="30px" justify="space-around">
              <Box pl={2} fontStyle="italic">
                {moment(topic.date).format("MMMM Do YYYY")}
              </Box>
              <Flex alignItems="center">
                {topic.likes}
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
              <Flex>
                {(state.isAuth || state.isAuthWithGithub) && (
                  <Link to={`single_topic/${topic._id}`}>
                    <Button colorScheme="primary" size="sm" mr="10px">
                      Reply
                    </Button>
                  </Link>
                )}
                <Button
                  colorScheme="button"
                  size="sm"
                  onClick={onToggle}
                  mr="10px"
                >
                  Comments
                </Button>
              </Flex>
            </Flex>
            {topic.tags.map((tag, index) => (
                <Flex mt="20px" key={index}>
                  <Box
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
                </Flex>
              ))}
          </Flex>
          <Collapse className="comment_area" in={isOpen} animateOpacity>
            <Flex my="20px" maxH="200px" w="40vw" px="10px" flexDir="column">
              <Comments topic={topic} />
            </Flex>
          </Collapse>
        </div>
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
