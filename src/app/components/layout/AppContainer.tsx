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
  const inboxSubscriberId = subscriberId
    ? subscriberId + "_" + selectedTheme.id
    : null;

  return (
    <>
      {selectedTheme.id === "notion" ? (
        <NotionTheme subscriberId={inboxSubscriberId} />
      ) : null}
      {selectedTheme.id === "linear" ? (
        <LinearTheme subscriberId={inboxSubscriberId} />
      ) : null}
      {selectedTheme.id === "reddit" ? (
        <RedditTheme subscriberId={inboxSubscriberId} />
      ) : null}
      {selectedTheme.id === "default-theme" ? (
        <CustomTheme subscriberId={inboxSubscriberId} />
      ) : null}
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
