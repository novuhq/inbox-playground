"use client";
import { createId } from "@paralleldrive/cuid2";
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

const SendNotificationForm = () => {
  const [subscriberId, setSubscriberId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("inbox_demo_language") || "en");
  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "zh-CN", label: "Chinese (Simplified)" },
    { code: "ja", label: "Japanese" },
    { code: "ko", label: "Korean" },
    { code: "ru", label: "Russian" },
    { code: "pt", label: "Portuguese" },
    { code: "it", label: "Italian" },
    { code: "hi", label: "Hindi" },
  ];

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

  const [designFormState, setDesignFormState] = useState({
    colorPrimary: localStorage.getItem("inbox_demo_colorPrimary") || "#0081F1",
    colorPrimaryForeground: localStorage.getItem("inbox_demo_colorPrimaryForeground") || "white",
    colorSecondary: localStorage.getItem("inbox_demo_colorSecondary") || "#F3F3F3",
    colorSecondaryForeground: localStorage.getItem("inbox_demo_colorSecondaryForeground") || "#1A1523",
    colorCounter: localStorage.getItem("inbox_demo_colorCounter") || "#E5484D",
    colorCounterForeground: localStorage.getItem("inbox_demo_colorCounterForeground") || "white",
    colorBackground: localStorage.getItem("inbox_demo_colorBackground") || "#FCFCFC",
    colorForeground: localStorage.getItem("inbox_demo_colorForeground") || "#1A1523",
    colorNeutral: localStorage.getItem("inbox_demo_colorNeutral") || "black",
    fontSize: localStorage.getItem("inbox_demo_fontSize") || "inherit",
    borderRadius: localStorage.getItem("inbox_demo_borderRadius") || "0.375rem",
    open: localStorage.getItem("inbox_demo_open") === "true",
  });

  const [showDesignDashboard, setShowDesignDashboard] = useState(() => {
    const savedValue = localStorage.getItem("showDesignDashboard");
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });

  const handleToggleDesignDashboard = () => {
    setShowDesignDashboard((prevValue: any) => {
      const newValue = !prevValue;
      localStorage.setItem("showDesignDashboard", JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleLanguageChange = (e: { target: { value: any; }; }) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    localStorage.setItem("inbox_demo_language", language);
  };

  useEffect(() => {
    const subscriberIdFromLocalStorage = localStorage.getItem("inbox_demo_subscriberId");
    const firstNameFromLocalStorage = localStorage.getItem("inbox_demo_firstName");
    const lastNameFromLocalStorage = localStorage.getItem("inbox_demo_lastName");

    if (subscriberIdFromLocalStorage) {
      setSubscriberId(subscriberIdFromLocalStorage);
    } else {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
    }

    if (firstNameFromLocalStorage || lastNameFromLocalStorage) {
      setNotificationFormState((prevState) => ({
        ...prevState,
        subscriberFirstName: firstNameFromLocalStorage || "",
        subscriberLastName: lastNameFromLocalStorage || "",
      }));
    }
  }, []);

  const toast = useToast();

  const handleNotificationFormChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setNotificationFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDesignFormChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDesignFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem(`inbox_demo_${name}`, value);
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
            ...designFormState,
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

  const handleShowCodeSnippet = () => {
    const configurations = { ...designFormState };
    const generatedCode = `
import { Inbox } from '@novu/react';

export const novuConfig = {
  applicationIdentifier: 'YOUR_APPLICATION_IDENTIFIER',
  subscriberId: 'YOUR_SUBSCRIBER_ID',
  appearance: {
    variables: {
      colorPrimary: '${configurations.colorPrimary}',
      colorPrimaryForeground: '${configurations.colorPrimaryForeground}',
      colorSecondary: '${configurations.colorSecondary}',
      colorSecondaryForeground: '${configurations.colorSecondaryForeground}',
      colorCounter: '${configurations.colorCounter}',
      colorCounterForeground: '${configurations.colorCounterForeground}',
      colorBackground: '${configurations.colorBackground}',
      colorForeground: '${configurations.colorForeground}',
      colorNeutral: '${configurations.colorNeutral}',
      fontSize: '${configurations.fontSize}',
      borderRadius: '${configurations.borderRadius}',
    }
  }
};

export default function App() {
  return (
    <div className="container">
      <h1>Novu Inbox React Component</h1>
      <Inbox {...novuConfig} />
    </div>
  );
}`;
    setCodeSnippet(generatedCode);
    onOpen();
  };

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
          <Switch
            isChecked={showDesignDashboard}
            onChange={handleToggleDesignDashboard}
            size="md"
          />
        </FormControl>

        {showDesignDashboard ? (
          <VStack spacing={4} alignItems="stretch">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Configure And Design Inbox Component
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Click on the &quot;Apply Changes&quot; button to see the changes in the Inbox component.
            </Text>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb="0">Keep Inbox Open</FormLabel>
              <Switch
                name="open"
                isChecked={designFormState.open}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setDesignFormState((prevState) => ({
                    ...prevState,
                    open: isChecked,
                  }));
                  localStorage.setItem("inbox_demo_open", isChecked.toString());
                }}
                size="md"
              />
            </FormControl>

            <SimpleGrid columns={1} spacing={4}>
              <FormLabel>Inbox Language</FormLabel>
              <Text fontSize="sm" color="gray.500">
                Select the language for your inbox notifications.
              </Text>
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </Select>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>Primary Color</FormLabel>
                <Input
                  name="colorPrimary"
                  value={designFormState.colorPrimary}
                  onChange={handleDesignFormChange}
                  placeholder="#0081F1"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Primary Foreground</FormLabel>
                <Input
                  name="colorPrimaryForeground"
                  value={designFormState.colorPrimaryForeground}
                  onChange={handleDesignFormChange}
                  placeholder="white"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Secondary Color</FormLabel>
                <Input
                  name="colorSecondary"
                  value={designFormState.colorSecondary}
                  onChange={handleDesignFormChange}
                  placeholder="#F3F3F3"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Secondary Foreground</FormLabel>
                <Input
                  name="colorSecondaryForeground"
                  value={designFormState.colorSecondaryForeground}
                  onChange={handleDesignFormChange}
                  placeholder="#1A1523"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Counter Color</FormLabel>
                <Input
                  name="colorCounter"
                  value={designFormState.colorCounter}
                  onChange={handleDesignFormChange}
                  placeholder="#E5484D"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Counter Foreground</FormLabel>
                <Input
                  name="colorCounterForeground"
                  value={designFormState.colorCounterForeground}
                  onChange={handleDesignFormChange}
                  placeholder="white"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <Input
                  name="colorBackground"
                  value={designFormState.colorBackground}
                  onChange={handleDesignFormChange}
                  placeholder="#FCFCFC"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Foreground Color</FormLabel>
                <Input
                  name="colorForeground"
                  value={designFormState.colorForeground}
                  onChange={handleDesignFormChange}
                  placeholder="#1A1523"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Neutral Color</FormLabel>
                <Input
                  name="colorNeutral"
                  value={designFormState.colorNeutral}
                  onChange={handleDesignFormChange}
                  placeholder="black"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Font Size</FormLabel>
                <Input
                  name="fontSize"
                  value={designFormState.fontSize}
                  onChange={handleDesignFormChange}
                  placeholder="inherit"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Border Radius</FormLabel>
                <Input
                  name="borderRadius"
                  value={designFormState.borderRadius}
                  onChange={handleDesignFormChange}
                  placeholder="0.375rem"
                  size="sm"
                />
              </FormControl>
            </SimpleGrid>

            <Button
              colorScheme="blue"
              size="md"
              width="full"
              onClick={() => window.location.reload()}
            >
              Apply Changes
            </Button>
            <Button
              colorScheme="green"
              size="md"
              width="full"
              onClick={handleShowCodeSnippet}
            >
              Export Inbox Configurations
            </Button>
          </VStack>
        ) : (
          <VStack spacing={4} alignItems="stretch">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Send In-App Notification
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
        )}
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
            <Box bg="gray.50" p={4} borderRadius="md" border="1px" borderColor="gray.200">
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
              <Button
                colorScheme="blue"
                onClick={handleCopy}
                size="lg"
              >
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
