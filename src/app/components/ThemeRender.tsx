"use client";

import CustomTheme from "./inbox-themes/CustomTheme";
import { useSubscriber } from "../hooks/useSubscriber";
import NotionTheme from "./inbox-themes/NotionTheme";
import LinearTheme from "./inbox-themes/LinearTheme";
import RedditTheme from "./inbox-themes/RedditTheme";
import { useTheme } from "../contexts/ThemeContext";
import { Box, Flex } from "@chakra-ui/react";
const ThemeRenderer = () => {
  const { subscriberId } = useSubscriber();
  const { selectedTheme } = useTheme();
  const inboxSubscriberId = subscriberId ? subscriberId + "_" + selectedTheme.id : null;

  return (
    <Flex
      position="relative"
      zIndex={10}
      width="100%"
      maxW="1200px"
      height="100%"
      minHeight="400px"
      flexGrow={1}
      borderRadius="12px"
      overflow="hidden"
    >
      {selectedTheme.id === "notion" ? <NotionTheme subscriberId={inboxSubscriberId} /> : null}
      {selectedTheme.id === "linear" ? <LinearTheme subscriberId={inboxSubscriberId} /> : null}
      {selectedTheme.id === "reddit" ? <RedditTheme subscriberId={inboxSubscriberId} /> : null}
      {selectedTheme.id === "default-theme" ? (
        <CustomTheme subscriberId={inboxSubscriberId} />
      ) : null}
    </Flex>
  );
};

export default ThemeRenderer;
