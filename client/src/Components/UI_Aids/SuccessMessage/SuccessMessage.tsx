import { useDisclosure, Button, ScaleFade, Box } from "@chakra-ui/react";
import React from "react";

export default function SuccessMessage() {
  
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
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
    </>
  );
}
