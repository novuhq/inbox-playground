"use client";

import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";
import NotificationFeed from "../NotificationFeed";
import NotionTheme from "../inbox-themes/NotionTheme";
import LinearTheme from "../inbox-themes/LinearTheme";
import { NotionIcon } from "../icons/Notion";
import { HackerNewsIcon } from "../icons/HackerNews";
import { useState } from "react";
import { LinearIcon } from "../icons/Linear";

export interface Workflow {
  id: string;
  title: string;
}

const themes = [
  {
    id: "notion",
    title: "Notion",
    icon: <NotionIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
  {
    id: "linear",
    title: "Linear",
    icon: <LinearIcon />,
    workflows: [
      {
        id: "1",
        title: "Mention in a Comment",
      },
      {
        id: "2",
        title: "Project Updates",
      },
      {
        id: "3",
        title: "Status Change",
      },
    ],
  },

  {
    id: "reddit",
    title: "Reddit",
    icon: <NotionIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
  {
    id: "hn",
    title: "Hacker News",
    icon: <HackerNewsIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
];

const AppContainer = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <Box height="100vh" bg="gray.100">
      <Navbar />
      <Flex
        height="calc(100vh - 72px)"
        padding={8}
        alignItems="flex-start"
        gap={4}
      >
        <PlaygroundFormContainer
          themes={themes}
          onThemeChange={(index) => {
            setSelectedTheme(themes[index]);
          }}
        />
        {selectedTheme && selectedTheme.id === "notion" && <NotionTheme />}
        {selectedTheme && selectedTheme.id === "linear" && <LinearTheme />}
      </Flex>
    </Box>
  );
};

export default AppContainer;
