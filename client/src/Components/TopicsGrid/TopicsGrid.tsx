import React from "react";
import { Grid, Flex, Text } from "@chakra-ui/react";
import TopicCard from "../TopicCard/TopicCard";

import { Topic } from '../../interfaces/topic';

type Props = {
  topics: [Topic],
  setTopics: Function
}

export default function TopicsGrid({ topics, setTopics } : Props) {



<<<<<<< HEAD:client/src/Components/TopicsGrid/TopicsGrid.jsx
=======
  // console.log('setTopics', setTopics);

  //useEffect(() => {}, [topics, setTopics]);

>>>>>>> d69c9cbc464f3cfac498dd59528a70478ca81385:client/src/Components/TopicsGrid/TopicsGrid.tsx
  return (
    <>
      {topics ? (
        <Grid
          gap={6}
          mt="20px"
          mx="30px"
          pt="30px"
          justifyContent="center"
          alignItems="center"
          pb="120px"
        >
          {topics.map((topic, index) => (
            <TopicCard key={index} topic={topic} setTopics={setTopics}/>
          ))}
        </Grid>
      ) : (
        <Flex
          w="40vw"
          boxShadow="0 0 10px #3333"
          py="40px"
          px="20px"
          borderRadius="lg"
          alignItems="center"
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
