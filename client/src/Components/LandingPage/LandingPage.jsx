import React, { useEffect } from "react";
import "./LandingPage.css";
import Philo from "../../assets/philo_icons.svg";
import { Flex } from "@chakra-ui/react";
import Dashboard from "../Dashboard/Dashboard";
import { useDencrypt } from "use-dencrypt-effect";
import Subtitle from "../Subtitle";

const title = "Codagora,";

export default function LandingPage() {
  const { result, dencrypt } = useDencrypt();

  useEffect(() => {
    const action = setInterval(() => {
      dencrypt(title);
    }, 200);

    return () => {
      clearInterval(action);
    };
  }, [dencrypt]);

  return (
    <>
      <Flex
        my="70px"
        mx="50px"
        pos="relative"
        justify="flex-end"
        p="50px"
        borderRadius="10px"
        className="banner"
      >
        <Flex className="titles" flexDir="column" ml="100px">
          <div className="main-title">{result}</div>
          <Subtitle />
        </Flex>
        <Flex w="350px" mr="50px">
          <img src={Philo} alt="Philo" style={{ width: "100%" }} />
        </Flex>
      </Flex>
      <Dashboard />
    </>
  );
}
