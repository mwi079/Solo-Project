import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Footer() {
  return (
    <Flex
      w="100%"
      h="10vh"
      pt="10px"
      bg="#C1B098"
      px="30px"
      color="#0B2545"
      alignItems="center"
      flexDir="column"
      justify="center"
      fontWeight="500"
    >
      <Flex letterSpacing="1.2px">
        <Text mr="10px">Connect</Text>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiOutlineTwitter} />
        </Flex>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiOutlineGithub} />
        </Flex>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiFillLinkedin} />
        </Flex>
      </Flex>
      <Flex letterSpacing="1.2px">
        <Text>Proudly made in 🇩🇪 by Andrea Undecimo</Text>
      </Flex>
    </Flex>
  );
}
