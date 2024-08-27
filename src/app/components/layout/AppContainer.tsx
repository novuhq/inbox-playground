"use client";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";
import NotionTheme from "../inbox-themes/NotionTheme";
import LinearTheme from "../inbox-themes/LinearTheme";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

const ThemeRenderer = () => {
  const { selectedTheme } = useTheme();

  return (
    <>
      {selectedTheme.id === "notion" && <NotionTheme />}
      {selectedTheme.id === "linear" && <LinearTheme />}
    </>
  );
};

const AppContent = () => {
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
        <ThemeRenderer />
      </Flex>
    </Box>
  );
};

const AppContainer = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default AppContainer;
