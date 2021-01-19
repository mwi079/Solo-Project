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
      h="70px"
      bg="#C1B098"
      color="#0B2545"
      alignItems="center"
      flexDir="column"
      justify="center"
      fontWeight="500"
      pos="absolute"
      bottom="-60px"
    >
      <Flex letterSpacing="1.2px">
        <Text mr="10px">Connect</Text>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiOutlineTwitter} boxSize={6} />
        </Flex>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiOutlineGithub} boxSize={6} />
        </Flex>
        <Flex alignItems="center" mr="10px">
          <Icon as={AiFillLinkedin} boxSize={6} />
        </Flex>
      </Flex>
      <Flex letterSpacing="1.2px" position="relative">
        <Text>Proudly made in 🇩🇪 by Andrea Undecimo</Text>
      </Flex>
    </Flex>
  );
}
