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
} from "@chakra-ui/react";

interface NotificationFormState {
  subscriberFirstName: string;
  subscriberLastName: string;
  inAppSubject: string;
  inAppBody: string;
  inAppAvatar: string;
  showInAppAvatar: boolean;
  inAppPrimaryActionLabel: string;
  enablePrimaryAction: boolean;
  inAppPrimaryActionUrl: string;
  inAppSecondaryActionLabel: string;
  enableSecondaryAction: boolean;
  inAppSecondaryActionUrl: string;
}

interface NotificationContentFormProps {
  notificationFormState: NotificationFormState;
  handleNotificationFormChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: () => Promise<void>;
}

const NotificationContentForm: React.FC<NotificationContentFormProps> = ({
  notificationFormState,
  handleNotificationFormChange,
  handleSubmit,
}) => {
  return (
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
        <FormLabel>Subject</FormLabel>
        <Textarea
          name="inAppSubject"
          value={notificationFormState.inAppSubject}
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
  );
};

export default NotificationContentForm;
