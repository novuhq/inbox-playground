"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Switch,
  Text,
  VStack,
  Select,
  Flex,
  useToast,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Code,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SendNotificationForm = ({ subscriberId }: { subscriberId: string }) => {
  const [notificationFormState, setNotificationFormState] = useState({
    subscriberFirstName: "",
    subscriberLastName: "",
    inAppSubject: "In-App Notification Subject!",
    inAppBody: "In-App Notification Body!",
    inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
    showInAppAvatar: true,
    inAppPrimaryActionLabel: "Primary Action",
    enablePrimaryAction: true,
    inAppPrimaryActionUrl: "https://novu.com",
    inAppSecondaryActionLabel: "Secondary Action",
    enableSecondaryAction: false,
    inAppSecondaryActionUrl: "https://novu.com",
  });

  useEffect(() => {
    const subscriberIdFromLocalStorage = localStorage.getItem(
      "inbox_demo_subscriberId"
    );
    const firstNameFromLocalStorage = localStorage.getItem(
      "inbox_demo_firstName"
    );
    const lastNameFromLocalStorage = localStorage.getItem(
      "inbox_demo_lastName"
    );

    if (firstNameFromLocalStorage || lastNameFromLocalStorage) {
      setNotificationFormState((prevState) => ({
        ...prevState,
        subscriberFirstName: firstNameFromLocalStorage || "",
        subscriberLastName: lastNameFromLocalStorage || "",
      }));
    }
  }, []);

  const toast = useToast();

  const handleNotificationFormChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setNotificationFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { subscriberFirstName, subscriberLastName } = notificationFormState;

    if (!subscriberFirstName || !subscriberLastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your first and last name.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("inbox_demo_firstName", subscriberFirstName);
    localStorage.setItem("inbox_demo_lastName", subscriberLastName);

    try {
      const response = await fetch("/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberId,
          firstName: subscriberFirstName,
          lastName: subscriberLastName,
          payload: {
            ...notificationFormState,
            // ...designFormState,
          },
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [codeSnippet, setCodeSnippet] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
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
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0">Show Inbox Configurations</FormLabel>
          {/* <Switch
            isChecked={showDesignDashboard}
            onChange={handleToggleDesignDashboard}
            size="md"
          /> */}
        </FormControl>

        <VStack spacing={4} alignItems="stretch">
          <Text fontSize="lg" fontWeight="bold" textAlign="center">
            Send In-App Notification - subscriberId {subscriberId}
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Fill out all the fields below to send an in-app notification
          </Text>

          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              name="subscriberFirstName"
              value={notificationFormState.subscriberFirstName}
              onChange={handleNotificationFormChange}
              placeholder="First Name"
              size="sm"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="subscriberLastName"
              value={notificationFormState.subscriberLastName}
              onChange={handleNotificationFormChange}
              placeholder="Last Name"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Textarea
              name="inAppSubject"
              value={notificationFormState.inAppSubject}
              // @ts-ignore
              onChange={handleNotificationFormChange}
              placeholder="In-App Notification Subject"
              size="sm"
              resize="vertical"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Body</FormLabel>
            <Textarea
              name="inAppBody"
              value={notificationFormState.inAppBody}
              // @ts-ignore
              onChange={handleNotificationFormChange}
              placeholder="In-App Notification Body"
              size="sm"
              resize="vertical"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Avatar URL</FormLabel>
            <Input
              name="inAppAvatar"
              value={notificationFormState.inAppAvatar}
              onChange={handleNotificationFormChange}
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
              name="showInAppAvatar"
              isChecked={notificationFormState.showInAppAvatar}
              onChange={handleNotificationFormChange}
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Primary Action Label</FormLabel>
            <Input
              name="inAppPrimaryActionLabel"
              value={notificationFormState.inAppPrimaryActionLabel}
              onChange={handleNotificationFormChange}
              placeholder="Primary Action Label"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Primary Action URL</FormLabel>
            <Input
              name="inAppPrimaryActionUrl"
              value={notificationFormState.inAppPrimaryActionUrl}
              onChange={handleNotificationFormChange}
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
              name="enablePrimaryAction"
              isChecked={notificationFormState.enablePrimaryAction}
              onChange={handleNotificationFormChange}
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Secondary Action Label</FormLabel>
            <Input
              name="inAppSecondaryActionLabel"
              value={notificationFormState.inAppSecondaryActionLabel}
              onChange={handleNotificationFormChange}
              placeholder="Secondary Action Label"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Secondary Action URL</FormLabel>
            <Input
              name="inAppSecondaryActionUrl"
              value={notificationFormState.inAppSecondaryActionUrl}
              onChange={handleNotificationFormChange}
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
              name="enableSecondaryAction"
              isChecked={notificationFormState.enableSecondaryAction}
              onChange={handleNotificationFormChange}
              size="sm"
            />
          </FormControl>

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
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="xl" fontWeight="bold">
              Copy and Use the Code Snippet
            </Text>
            <Text fontSize="sm" color="gray.500">
              Below is the code for your Inbox React component configuration.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              bg="gray.50"
              p={4}
              borderRadius="md"
              border="1px"
              borderColor="gray.200"
            >
              <Code
                p={4}
                borderRadius="md"
                whiteSpace="pre-wrap"
                width="100%"
                bg="white"
                color="gray.800"
                fontSize="sm"
                overflowX="auto"
              >
                {codeSnippet}
              </Code>
            </Box>
            {copied && (
              <Text mt={2} color="green.500" fontWeight="medium">
                Code copied to clipboard!
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" width="100%">
              <Button colorScheme="blue" onClick={handleCopy} size="lg">
                Copy to Clipboard
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={onClose}
                size="lg"
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SendNotificationForm;
