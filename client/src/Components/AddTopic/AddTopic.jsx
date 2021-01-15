import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Text,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import "./AddTopic.css";
import { postTopic } from "../../services/ApiTopicsClientService";

export default function AddTopic() {
  const [topicDetails, setTopicDetails] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const [isChecked, setChecked] = useState(false);

  function postOneTopic(topic) {
    const { title, author, content, tags } = topic;
    postTopic({ title, author, content, tags })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  }

  function handleSubmit(e) {
    setChecked(false);
    e.preventDefault();
    try {
      postOneTopic(topicDetails);
      setTopicDetails({
        title: "",
        content: "",
        tags: [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddTag(e) {
    const tagsArray = topicDetails.tags;
    !tagsArray.includes(e.target.value) && tagsArray.push(e.target.value);
    setTopicDetails({ ...topicDetails, tags: tagsArray });
  }

  function handleRemoveTag(e) {
    const tagsArray = topicDetails.tags;
    const filteredArray = tagsArray.filter((el) => el !== e.target.value);
    setTopicDetails({ ...topicDetails, tags: filteredArray });
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
          <Flex justifyContent="center"></Flex>
          <Flex flexDir="column" justifyContent="center" mt="40px">
            <Text fontWeight="500" textAlign="center">
              You can add some categories to your question:
            </Text>
            <Box mt="20px">
              <CheckboxGroup colorScheme="green">
                <HStack spacing={5}>
                  <Checkbox
                    isChecked={isChecked}
                    value="JavaScript"
                    onChange={(e) =>
                      e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                    }
                  >
                    JavaScript
                  </Checkbox>
                  <Checkbox
                    value="CSS"
                    onChange={(e) =>
                      e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                    }
                  >
                    CSS
                  </Checkbox>
                  <Checkbox
                    isChecked={isChecked}
                    value="NodeJS"
                    onChange={(e) =>
                      e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                    }
                  >
                    NodeJS
                  </Checkbox>
                  <Checkbox
                    isChecked={isChecked}
                    value="Python"
                    onChange={(e) =>
                      e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                    }
                  >
                    Python
                  </Checkbox>
                  <Checkbox
                    isChecked={isChecked}
                    value="TypeScript"
                    onChange={(e) =>
                      e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                    }
                  >
                    TypeScript
                  </Checkbox>
                </HStack>
              </CheckboxGroup>
            </Box>
          </Flex>
          <Button
            mt={10}
            type="submit"
            colorScheme="teal"
            variant="outline"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            _active={{ boxShadow: "lg" }}
          >
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}
