"use client";
import {
  VStack,
  Flex,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Box,
  Spinner,
} from "@chakra-ui/react";
import InboxDesignForm from "./InboxDesignForm";
import NotificationContentForm from "./NotificationContentForm";
import { useNotificationForm } from "../hooks/useNotificationForm";
import { useSubscriber } from "../hooks/useSubscriber";
import { useTheme } from "../contexts/ThemeContext";

const PlaygroundFormContainer = () => {
  const { themes, setSelectedTheme } = useTheme();

  const { handleSubmit, isLoading } = useNotificationForm();

  return (
    <Flex
      width="100%"
      maxW="600px"
      borderWidth="1px"
      borderColor="#6B7DB3"
      borderRadius="18px"
      padding={3}
      boxShadow="lg"
      bg="linear-gradient(180deg, #1B2137 -0.49%, #111522 48.7%)"
      height="100%"
      minHeight="400px"
      direction="column"
    >
      <VStack spacing={4} alignItems="stretch" flexGrow={1} height="100%">
        <Tabs
          height="calc(100% - 80px)"
          onChange={(index) => {
            setSelectedTheme(themes[index]);
          }}
        >
          <TabList borderBottom="1px solid #30385A">
            {themes.map((theme) => (
              <Tab
                key={theme.id}
                sx={{
                  svg: {
                    width: "20px",
                    height: "20px",
                  },
                }}
                fontWeight="400"
                color="#A8A9BD"
                _selected={{
                  color: "white",
                }}
                _hover={{
                  color: "white",
                }}
              >
                <span style={{ marginRight: "10px", display: "inline-block" }}>
                  {theme.icon}
                </span>
                {theme.title}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            borderRadius="1px"
            bg="white"
          />
          <TabPanels height="calc(100% - 30px)">
            {themes.map((theme) => (
              <TabPanel key={theme.id} height="100%" overflowY="auto">
                {theme.id === "default-theme" ? <InboxDesignForm /> : null}
                <NotificationContentForm workflows={theme.workflows} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        <Button
          variant="white-outline"
          size="md"
          width="full"
          marginTop={4}
          alignSelf="flex-end"
          color="white"
          fontWeight="500"
          lineHeight="1.2"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Send Notification
        </Button>
      </VStack>
    </Flex>
  );
};

export default PlaygroundFormContainer;
