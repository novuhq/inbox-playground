"use client";

import {
    Box,
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
import { useState } from "react";

const SendNotificationForm = () => {
    const [formState, setFormState] = useState({
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

    const toast = useToast();

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            const response = await fetch('http://localhost:3030/api/trigger-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscriberId: '66ab924daa4218d126f9ba68', // Replace this with dynamic subscriber ID if needed
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
            console.error('Error:', error);
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
                    This is an example application to show in-app notifications powered by Novu.
                </Text>

                <FormControl>
                    <FormLabel>Subject</FormLabel>
                    <Input
                        name="inAppSubject"
                        value={formState.inAppSubject}
                        onChange={handleChange}
                        placeholder="In-App Notification Subject"
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Body</FormLabel>
                    <Input
                        name="inAppBody"
                        value={formState.inAppBody}
                        onChange={handleChange}
                        placeholder="In-App Notification Body"
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Avatar URL</FormLabel>
                    <Input
                        name="inAppAvatar"
                        value={formState.inAppAvatar}
                        onChange={handleChange}
                        placeholder="URL for the avatar image"
                        size="sm"
                    />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Show Avatar</FormLabel>
                    <Switch
                        name="showInAppAvatar"
                        isChecked={formState.showInAppAvatar}
                        onChange={handleChange}
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Primary Action Label</FormLabel>
                    <Input
                        name="inAppPrimaryActionLabel"
                        value={formState.inAppPrimaryActionLabel}
                        onChange={handleChange}
                        placeholder="Primary Action Label"
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Primary Action URL</FormLabel>
                    <Input
                        name="inAppPrimaryActionUrl"
                        value={formState.inAppPrimaryActionUrl}
                        onChange={handleChange}
                        placeholder="Primary Action URL"
                        size="sm"
                    />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Enable Primary Action</FormLabel>
                    <Switch
                        name="enablePrimaryAction"
                        isChecked={formState.enablePrimaryAction}
                        onChange={handleChange}
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Secondary Action Label</FormLabel>
                    <Input
                        name="inAppSecondaryActionLabel"
                        value={formState.inAppSecondaryActionLabel}
                        onChange={handleChange}
                        placeholder="Secondary Action Label"
                        size="sm"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Secondary Action URL</FormLabel>
                    <Input
                        name="inAppSecondaryActionUrl"
                        value={formState.inAppSecondaryActionUrl}
                        onChange={handleChange}
                        placeholder="Secondary Action URL"
                        size="sm"
                    />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Enable Secondary Action</FormLabel>
                    <Switch
                        name="enableSecondaryAction"
                        isChecked={formState.enableSecondaryAction}
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
