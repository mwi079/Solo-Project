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
    { lang: Js, name: "JavaScript", JS_color: "yellow" },
    { lang: Node, name: "NodeJS", Node_color: "green" },
    { lang: Python, name: "Python", color: "teal" },
    { lang: TypeScript, name: "TypeScript", color: "blue" },
    { lang: Css, name: "CSS", color: "purple" },
  ];

  const { state } = useContext(StateContext);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    getAllTopics()
      .then((res) => {
        setTopics(
          res.data.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((error) => console.error(error));
  }, []);

  function filterByCategory(e) {
    if (e.target.innerText.includes("All")) {
      getAllTopics()
        .then((res) => setTopics(res.data))
        .catch((error) => console.error(error));
    } else {
      getAllTopics()
        .then((res) => {
          const filteredTopics = res.data.filter((topic) =>
            topic.tags.some((tag) => tag.language === e.target.innerText)
          );
          setTopics(filteredTopics);
        })
        .catch((error) => console.error(error));
    }
  }

  function filterByDate() {
    getAllTopics()
      .then((res) => {
        setTopics(
          res.data.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Flex
        mx="50px"
        pb="20px"
        boxShadow="0 0 5px #3333"
        px="20px"
        pos="relative"
        mb="60px"
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
        <Flex flexDir="column" flex="2" position="sticky" top="40px" py="40px">
          <Flex pt="20px" pb="30px" alignSelf="flex-start">
            <Heading>Categories</Heading>
          </Flex>

          <ul className="icons-list">
            {iconArray &&
              iconArray.map((icon) => (
                <li key={icon.name}>
                  <button onClick={(e) => filterByCategory(e)}>
                    <figure
                      style={{ backgroundImage: `url(${icon.lang})` }}
                    ></figure>
                    <Text fontSize="md" fontWeight="500">
                      {icon.name}
                    </Text>
                  </button>
                </li>
              ))}
            <Button id="all-categories" onClick={(e) => filterByCategory(e)}>
              <Text fontSize="md" fontWeight="500">
                All categories
              </Text>
            </Button>
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
                <Button
                  mx="10px"
                  variant="solid"
                  bg="#03045e"
                  color="white"
                  onClick={() => filterByDate()}
                >
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
