"use client";
import { VStack, Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import InboxDesignForm from "./InboxDesignForm";
import NotificationContentForm from "./NotificationContentForm";
import { useNotificationForm } from "../hooks/useNotificationForm";
import { useDesignDashboard } from "../hooks/useDesignDashboard";
import { useSubscriber } from "../hooks/useSubscriber";

const PlaygroundFormContainer = () => {
  const { notificationFormState, handleNotificationFormChange, handleSubmit } =
    useNotificationForm();
  const { showDesignDashboard, handleToggleDesignDashboard } =
    useDesignDashboard();
  useSubscriber();

  return (
    <Flex
      width="100%"
      maxW="500px"
      borderWidth="1px"
      borderRadius="lg"
      padding={6}
      boxShadow="lg"
      bg="white"
      height="100%"
      direction="column"
    >
      <VStack spacing={4} alignItems="stretch" flexGrow={1} overflowY="auto">
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0">Show Inbox Configurations</FormLabel>
          <Switch
            isChecked={showDesignDashboard}
            onChange={handleToggleDesignDashboard}
            size="md"
          />
        </FormControl>

        {showDesignDashboard ? (
          <InboxDesignForm />
        ) : (
          <NotificationContentForm
            notificationFormState={notificationFormState}
            handleNotificationFormChange={handleNotificationFormChange}
            handleSubmit={handleSubmit}
          />
        )}
      </VStack>
    </Flex>
  );
};

export default PlaygroundFormContainer;
