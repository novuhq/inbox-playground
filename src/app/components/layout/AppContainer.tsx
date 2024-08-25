"use client";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";
import NotificationFeed from "../NotificationFeed";

const AppContainer = () => {
  return (
    <Box height="100vh" bg="gray.100">
      <Navbar />
      <Flex
        height="calc(100vh - 72px)"
        padding={8}
        alignItems="flex-start"
        gap={6}
      >
        <PlaygroundFormContainer />
        <NotificationFeed />
      </Flex>
    </Box>
  );
};

export default AppContainer;
