import React, { useState } from "react";
import "./LandingPage.css";
import Philo from "../../assets/philo_icons.svg";
import { Button, Container, FormLabel, Input } from "@chakra-ui/react";

export default function LandingPage({ postTopic }) {
  const [topicDetails, setTopicDetails] = useState({
    title: "",
    author: "",
    content: "",
  });

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
      <div className="main-wrapper">
        <div className="titles">
          <div className="main-title">Codagora,</div>
          <div className="subtitle">where code is debated.</div>
        </div>
        <div className="icons">
          <img src={Philo} alt="Philo" />
        </div>
      </div>

      <Container>
        <form onSubmit={handleSubmit}>
          <FormLabel>Title</FormLabel>
          <Input
            value={topicDetails.title}
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, title: e.target.value })
            }
          ></Input>
          <FormLabel>Author</FormLabel>
          <Input
            value={topicDetails.author}
            type="text"
            placeholder="Author"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, author: e.target.value })
            }
          ></Input>
          <FormLabel>Content</FormLabel>
          <Input
            value={topicDetails.content}
            type="text"
            placeholder="Content"
            onChange={(e) =>
              setTopicDetails({ ...topicDetails, content: e.target.value })
            }
          ></Input>
          <Button
            width="full"
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
        </form>
      </Container>
    </>
  );
}
