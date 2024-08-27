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
  Select,
} from "@chakra-ui/react";
import InboxDesignForm from "./InboxDesignForm";
import NotificationContentForm from "./NotificationContentForm";
import { useNotificationForm } from "../hooks/useNotificationForm";
import { useDesignDashboard } from "../hooks/useDesignDashboard";
import { useSubscriber } from "../hooks/useSubscriber";
import { useTheme } from "../contexts/ThemeContext";

const PlaygroundFormContainer = () => {
  const { themes, setSelectedTheme } = useTheme();

  const { notificationFormState, handleNotificationFormChange, handleSubmit } =
    useNotificationForm();
  const { showDesignDashboard } = useDesignDashboard();
  useSubscriber();

  return (
    <Flex
      width="100%"
      maxW="600px"
      borderWidth="1px"
      borderRadius="lg"
      padding={3}
      boxShadow="lg"
      bg="white"
      height="100%"
      minHeight="400px"
      direction="column"
    >
      <VStack spacing={4} alignItems="stretch" flexGrow={1} height="100%">
        {showDesignDashboard ? (
          <InboxDesignForm />
        ) : (
          <Tabs
            height="calc(100% - 80px)"
            onChange={(index) => setSelectedTheme(themes[index])}
          >
            <TabList>
              {themes.map((theme) => (
                <Tab
                  key={theme.id}
                  sx={{
                    svg: {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                >
                  <span
                    style={{ marginRight: "10px", display: "inline-block" }}
                  >
                    {theme.icon}
                  </span>
                  {theme.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels height="calc(100% - 30px)">
              {themes.map((theme) => (
                <TabPanel key={theme.id} height="100%" overflowY="auto">
                  <NotificationContentForm
                    workflows={theme.workflows}
                    notificationFormState={notificationFormState}
                    handleNotificationFormChange={handleNotificationFormChange}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}

        <Button
          colorScheme="blue"
          size="md"
          width="full"
          marginTop={4}
          onClick={handleSubmit}
          alignSelf="flex-end"
        >
          Send Notification
        </Button>
      </VStack>
    </Flex>
  );
};

export default PlaygroundFormContainer;
