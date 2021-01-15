import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import TopicsGrid from "../TopicsGrid/TopicsGrid";
import "./Dashboard.css";
import Js from "../../assets/Icons/javascript.svg";
import Css from "../../assets/Icons/css3.svg";
import Node from "../../assets/Icons/node-js.svg";
import Python from "../../assets/Icons/python.svg";
import TypeScript from "../../assets/Icons/typescript.svg";
import { getAllTopics } from "../../services/ApiTopicsClientService";
import { Link } from "@reach/router";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function Dashboard() {
  const iconArray = [
    { lang: Js, name: "JavaScript" },
    { lang: Node, name: "NodeJS" },
    { lang: Python, name: "Python" },
    { lang: TypeScript, name: "TypeScript" },
    { lang: Css, name: "CSS" },
  ];
  const { state } = useContext(StateContext);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    getAllTopics()
      .then((res) => setTopics(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Flex
        mx="50px"
        pb="20px"
        boxShadow="0 0 5px #3333"
        px="20px"
        pos="relative"
        mb="30px"
        _before={{
          content: `""`,
          display: "block",
          position: "absolute",
          width: "1px",
          backgroundColor: "#90e0ef",
          top: "5%",
          bottom: "5%",
          left: "33%",
        }}
      >
        <Flex
          flexDir="column"
          flex="2"
          position="sticky"
          alignSelf="flex-start"
          top="40px"
          py="40px"
        >
          <Flex pt="20px" pb="30px">
            <Heading>Categories</Heading>
          </Flex>

          <ul className="icons-list">
            {iconArray &&
              iconArray.map((icon) => (
                <li key={icon.name}>
                  <figure
                    style={{ backgroundImage: `url(${icon.lang})` }}
                  ></figure>
                  <Text fontSize="md">{icon.name}</Text>
                </li>
              ))}
          </ul>
        </Flex>

        <Flex flex="4" flexDir="column">
          <Flex
            w="100%"
            ml="10px"
            px="30px"
            py="60px"
            flexDir="column"
            pos="sticky"
            top="40px"
            zIndex="1"
            bg="white"
            className="order_by"
          >
            <Flex ml="10px">
              <Heading>Order By</Heading>
            </Flex>
            <Flex justify="space-between">
              <Flex my="20px">
                <Button mx="10px" variant="solid" bg="#03045e" color="white">
                  Latest
                </Button>
                <Button mx="10px" variant="outline" colorScheme="primary">
                  Relevant
                </Button>
                <Button mx="10px" variant="outline" colorScheme="primary">
                  Discussed
                </Button>
              </Flex>
              <Flex my="20px">
                {state.isAuth && (
                  <Link to="/add_topic">
                    <Button colorScheme="primary">Add your topic +</Button>
                  </Link>
                )}
              </Flex>
            </Flex>
          </Flex>
          <TopicsGrid topics={topics} isAuth={state.isAuth} />
        </Flex>
      </Flex>
    </>
  );
}
