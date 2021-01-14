import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TopicsGrid from "../TopicsGrid/TopicsGrid";
import "./Dashboard.css";
import { getAllTopics } from "../../services/ApiTopicsClientService";

export default function Dashboard() {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    getAllTopics()
      .then((res) => setTopics(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Flex mx="50px" pb="20px" border="1px solid black" pt="30px" px="20px">
        <Flex
          flexDir="column"
          flex="2"
          position="sticky"
          top="30px"
          alignSelf="flex-start"
        >
          <Heading>Hello</Heading>
          <Heading>Hey</Heading>
          <Heading>Figa</Heading>
        </Flex>

        <Flex flex="4" flexDir="column">
          <Flex
            w="100%"
            ml="10px"
            px="30px"
            py="20px"
            border="1px solid black"
            flexDir="column"
          >
            <Flex ml="10px">
              <Heading>Order By</Heading>
            </Flex>
            <Flex justify="space-between">
              <Flex my="20px">
                <Button mx="10px">Latest</Button>
                <Button mx="10px">Relevant</Button>
                <Button mx="10px">Discussed</Button>
              </Flex>
              <Flex my="20px">
                <Button>Click Me</Button>
              </Flex>
            </Flex>
          </Flex>
          <TopicsGrid topics={topics} />
        </Flex>
      </Flex>
    </>
  );
}
