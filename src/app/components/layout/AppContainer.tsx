"use client";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";
import NotionTheme from "../inbox-themes/NotionTheme";
import LinearTheme from "../inbox-themes/LinearTheme";
import RedditTheme from "../inbox-themes/RedditTheme";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import CustomTheme from "../inbox-themes/CustomTheme";
import { useSubscriber } from "../../hooks/useSubscriber";

const ThemeRenderer = () => {
  const { subscriberId } = useSubscriber();
  const { selectedTheme } = useTheme();

  if (!subscriberId) return null;

  return (
    <>
      {selectedTheme.id === "notion" && (
        <NotionTheme subscriberId={subscriberId + "_" + selectedTheme.id} />
      )}
      {selectedTheme.id === "linear" && (
        <LinearTheme subscriberId={subscriberId + "_" + selectedTheme.id} />
      )}
      {selectedTheme.id === "reddit" && (
        <RedditTheme subscriberId={subscriberId + "_" + selectedTheme.id} />
      )}
      {selectedTheme.id === "default-theme" && (
        <CustomTheme subscriberId={subscriberId + "_" + selectedTheme.id} />
      )}
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
