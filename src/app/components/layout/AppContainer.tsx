"use client";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";
import NotificationFeed from "../NotificationFeed";
import NotionTheme from "../inbox-themes/NotionTheme";
import LinearTheme from "../inbox-themes/LinearTheme";


const AppContainer = () => {
  return (
    <Box height="100vh" bg="gray.100">
      <Navbar />
      <Flex
        height="calc(100vh - 72px)"
        padding={8}
        alignItems="flex-start"
        gap={4}
      >
        <PlaygroundFormContainer />
        <NotionTheme />
      </Flex>
    </Box>
  );
};

export default AppContainer;
