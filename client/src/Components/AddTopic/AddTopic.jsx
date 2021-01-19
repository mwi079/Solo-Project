import React, { useState, useContext } from "react";
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
  FormControl,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import "./AddTopic.css";

import { postTopic } from "../../services/ApiTopicsClientService";
import { validateForm } from "../../utils/validation.helper";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function AddTopic() {
  const { isOpen, onToggle } = useDisclosure();
  const { state } = useContext(StateContext);
  const [isTagChecked, setChecked] = useState(false);
  const [topicDetails, setTopicDetails] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const langs = [
    { name: "JavaScript", color: "#FFD700" },
    { name: "NodeJS", color: "#228B22" },
    { name: "Python", color: "#008080" },
    { name: "TypeScript", color: "#00008B" },
    { name: "CSS", color: "#6A5ACD" },
  ];

  function postOneTopic(topic) {
    const { title, author, content, tags } = topic;
    postTopic({ title, author, content, tags })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postOneTopic(topicDetails);
      setChecked(false);
      onToggle();
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
    const { color } = langs.find((lang) => lang.name === e.target.value);
    const newTag = { color, language: e.target.value };
    !tagsArray.some((tag) => tag.language === e.target.value) &&
      tagsArray.push(newTag);
    setTopicDetails({ ...topicDetails, tags: tagsArray });
  }

  function handleRemoveTag(e) {
    const tagsArray = topicDetails.tags;
    const filteredArray = tagsArray.filter(
      (el) => el.language !== e.target.value
    );
    setTopicDetails({ ...topicDetails, tags: filteredArray });
  }

  return (
    <>
      {state.isAuth || state.isAuthWithGithub ? (
        <Flex
          my="40px"
          alignItems="center"
          pt="20px"
          flexDir="column"
          className="page"
        >
          <Heading>Submit your answer</Heading>
          <form onSubmit={handleSubmit} className="add-topic-form">
            <FormControl
              // isRequired
              my="20px"
              display="flex"
              flexDir="column"
              alignItems="center"
            >
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
              <FormLabel htmlFor="code">Content</FormLabel>
              <Textarea
                id="textArea"
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
            </FormControl>

            <Flex flexDir="column" justifyContent="center" mt="80px">
              <Text fontWeight="500" textAlign="center">
                You can add some categories to your question:
              </Text>
              <Box mt="20px">
                <CheckboxGroup colorScheme="green" isChecked={isTagChecked}>
                  <HStack spacing={5}>
                    <Checkbox
                      isChecked={isTagChecked}
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
                      isChecked={isTagChecked}
                      value="NodeJS"
                      onChange={(e) =>
                        e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                      }
                    >
                      NodeJS
                    </Checkbox>
                    <Checkbox
                      isChecked={isTagChecked}
                      value="Python"
                      onChange={(e) =>
                        e.target.checked ? handleAddTag(e) : handleRemoveTag(e)
                      }
                    >
                      Python
                    </Checkbox>
                    <Checkbox
                      isChecked={isTagChecked}
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
              disabled={validateForm(topicDetails.title, topicDetails.content)}
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
            <ScaleFade initialScale={0.6} in={isOpen}>
              <Box
                p="40px"
                color="white"
                mt="4"
                bg="teal.500"
                rounded="md"
                shadow="md"
              >
                Your post has been created! ✅
              </Box>
            </ScaleFade>
          </form>
        </Flex>
      ) : (
        <Heading>Not auth</Heading>
      )}
    </>
  );
}
