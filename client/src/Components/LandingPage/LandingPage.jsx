import React from "react";
import "./LandingPage.css";
import Philo from "../../assets/philo_icons.svg";
import { Flex } from "@chakra-ui/react";
import Dashboard from "../Dashboard/Dashboard";

export default function LandingPage() {
  return (
    <>
      <Flex
        my="70px"
        mx="50px"
        pos="relative"
        justify="space-around"
        border="1px solid black"
        py="50px"
        borderRadius="10px"
      >
        <div className="titles">
          <div className="main-title">Codagora,</div>
          <div className="subtitle">where code is debated.</div>
        </div>
        <div className="icons">
          <img src={Philo} alt="Philo" />
        </div>
      </Flex>
      <Dashboard />
    </>
  );
}
