"use client";
import { createId } from "@paralleldrive/cuid2";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  VStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SendNotificationForm = () => {
  const [subscriberId, setSubscriberId] = useState("");

  useEffect(() => {
    const subscriberIdFromLocalStorage = localStorage.getItem(
      "inbox_demo_subscriberId"
    );

    if (subscriberIdFromLocalStorage) {
      setSubscriberId(subscriberIdFromLocalStorage);
    } else {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
    }
  }, []);

  const [formState, setFormState] = useState({
    subject: "In-App Notification Subject!",
    body: "In-App Notification Body!",
    avatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
    showAvatar: true,
    primaryActionLabel: "Primary Action",
    showPrimaryAction: true,
    primaryActionUrl: "https://novu.com",
    secondaryActionLabel: "Secondary Action",
    showSecondaryAction: false,
    secondaryActionUrl: "https://novu.com",
  });

  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Type guard to check if the target is an input element of type checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormState({
        ...formState,
        [name]: e.target.checked,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberId: subscriberId,
          payload: formState,
        }),
      });

      if (response.ok) {
        toast({
          title: "Notification sent",
          description: "Your notification was sent successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to send notification",
          description: "Something went wrong while sending the notification.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          In-app Notification Feed Example
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          This is an example application to show in-app notifications powered by
          Novu.
        </Text>

        <FormControl>
          <FormLabel>Subject</FormLabel>
          <Input
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            placeholder="In-App Notification Subject"
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Body</FormLabel>
          <Input
            name="body"
            value={formState.body}
            onChange={handleChange}
            placeholder="In-App Notification Body"
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Avatar URL</FormLabel>
          <Input
            name="avatar"
            value={formState.avatar}
            onChange={handleChange}
            placeholder="URL for the avatar image"
            size="sm"
          />
        </FormControl>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0">Show Avatar</FormLabel>
          <Switch
            name="showAvatar"
            isChecked={formState.showAvatar}
            onChange={handleChange}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Primary Action Label</FormLabel>
          <Input
            name="primaryActionLabel"
            value={formState.primaryActionLabel}
            onChange={handleChange}
            placeholder="Primary Action Label"
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Primary Action URL</FormLabel>
          <Input
            name="primaryActionUrl"
            value={formState.primaryActionUrl}
            onChange={handleChange}
            placeholder="Primary Action URL"
            size="sm"
          />
        </FormControl>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0">Enable Primary Action</FormLabel>
          <Switch
            name="showPrimaryAction"
            isChecked={formState.showPrimaryAction}
            onChange={handleChange}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Secondary Action Label</FormLabel>
          <Input
            name="secondaryActionLabel"
            value={formState.secondaryActionLabel}
            onChange={handleChange}
            placeholder="Secondary Action Label"
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Secondary Action URL</FormLabel>
          <Input
            name="secondaryActionUrl"
            value={formState.secondaryActionUrl}
            onChange={handleChange}
            placeholder="Secondary Action URL"
            size="sm"
          />
        </FormControl>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0">Enable Secondary Action</FormLabel>
          <Switch
            name="showSecondaryAction"
            isChecked={formState.showSecondaryAction}
            onChange={handleChange}
            size="sm"
          />
        </FormControl>
      </VStack>

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
    </Flex>
  );
};

export default SendNotificationForm;
