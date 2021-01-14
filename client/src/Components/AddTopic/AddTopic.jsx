import React, { useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import "./AddTopic.css";
import { postTopic } from "../../services/ApiTopicsClientService";

export default function AddTopic() {
  const [topicDetails, setTopicDetails] = useState({
    title: "",
    author: "",
    content: "",
  });

  function postOneTopic(topic) {
    const { title, author, content } = topic;
    postTopic({ title, author, content })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      postTopic(topicDetails);
      setTopicDetails({
        title: "",
        author: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Flex mt="40px" alignItems="center" py="20px" flexDir="column">
        <Heading>Submit your answer</Heading>
        <form onSubmit={handleSubmit} className="add-topic-form">
          <FormLabel>Title</FormLabel>
          <Input
            w="50%"
            value={topicDetails.title}
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, title: e.target.value })
            }
          ></Input>
          <FormLabel>Author</FormLabel>
          <Input
            w="50%"
            value={topicDetails.author}
            type="text"
            placeholder="Author"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, author: e.target.value })
            }
          ></Input>
          <FormLabel>Content</FormLabel>
          <Textarea
            h="20vh"
            textAlign="center"
            value={topicDetails.content}
            type="text"
            placeholder="Write your question here! 👨🏼‍💻"
            resize="none"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, content: e.target.value })
            }
          ></Textarea>
          <Flex justifyContent="center">
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              variant="outline"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
}
