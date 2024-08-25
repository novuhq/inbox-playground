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
  Heading,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { Workflow } from "./PlaygroundFormContainer";

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
  selectedWorkflow: string;
}

interface NotificationContentFormProps {
  notificationFormState: NotificationFormState;
  handleNotificationFormChange: (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  workflows: Workflow[];
}

const NotificationContentForm: React.FC<NotificationContentFormProps> = ({
  workflows,
  notificationFormState,
  handleNotificationFormChange,
}) => {
  return (
    <VStack spacing={4} alignItems="stretch">
      <div>
        <Heading size="sm">Subscriber</Heading>
        <Text fontSize="sm" color="gray.600" mb={2}>
          The recipient of the notification, change the details to customize.
        </Text>
      </div>

      <Flex gap={4}>
        <FormControl isRequired flex={1}>
          <FormLabel fontSize="sm">First Name</FormLabel>
          <Input
            name="subscriberFirstName"
            value={notificationFormState.subscriberFirstName}
            onChange={handleNotificationFormChange}
            placeholder="First Name"
            size="sm"
          />
        </FormControl>

        <FormControl flex={1}>
          <FormLabel fontSize="sm">Last Name</FormLabel>
          <Input
            name="subscriberLastName"
            value={notificationFormState.subscriberLastName}
            onChange={handleNotificationFormChange}
            placeholder="Last Name"
            size="sm"
          />
        </FormControl>
      </Flex>

      <Divider />
      <FormControl>
        <Heading size="sm">Workflow</Heading>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Select a workflow to customize the notification content.
        </Text>
        <Select
          name="selectedWorkflow"
          size="sm"
          value={notificationFormState.selectedWorkflow}
          onChange={handleNotificationFormChange}
        >
          {workflows.map((workflow) => (
            <option key={workflow.id} value={workflow.id}>
              {workflow.title}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm">Subject</FormLabel>
        <Input
          name="inAppSubject"
          value={notificationFormState.inAppSubject}
          onChange={handleNotificationFormChange}
          placeholder="In-App Notification Subject"
          size="sm"
          resize="vertical"
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm">Body</FormLabel>
        <Textarea
          name="inAppBody"
          value={notificationFormState.inAppBody}
          onChange={handleNotificationFormChange}
          placeholder="In-App Notification Body"
          size="sm"
          resize="vertical"
        />
      </FormControl>

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel fontSize="sm" mb="0">
          Show Avatar
        </FormLabel>
        <Switch
          name="showInAppAvatar"
          isChecked={notificationFormState.showInAppAvatar}
          onChange={handleNotificationFormChange}
          size="sm"
        />
      </FormControl>

      {notificationFormState.showInAppAvatar && (
        <FormControl>
          <FormLabel fontSize="sm">Avatar URL</FormLabel>
          <Input
            name="inAppAvatar"
            value={notificationFormState.inAppAvatar}
            onChange={handleNotificationFormChange}
            placeholder="URL for the avatar image"
            size="sm"
          />
        </FormControl>
      )}

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel fontSize="sm" mb="0">
          Enable Primary Action
        </FormLabel>
        <Switch
          name="enablePrimaryAction"
          isChecked={notificationFormState.enablePrimaryAction}
          onChange={handleNotificationFormChange}
          size="sm"
        />
      </FormControl>

      {notificationFormState.enablePrimaryAction && (
        <>
          <FormControl>
            <FormLabel fontSize="sm">Primary Action Label</FormLabel>
            <Input
              name="inAppPrimaryActionLabel"
              value={notificationFormState.inAppPrimaryActionLabel}
              onChange={handleNotificationFormChange}
              placeholder="Primary Action Label"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Primary Action URL</FormLabel>
            <Input
              name="inAppPrimaryActionUrl"
              value={notificationFormState.inAppPrimaryActionUrl}
              onChange={handleNotificationFormChange}
              placeholder="Primary Action URL"
              size="sm"
            />
          </FormControl>
        </>
      )}

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel fontSize="sm" mb="0">
          Enable Secondary Action
        </FormLabel>
        <Switch
          name="enableSecondaryAction"
          isChecked={notificationFormState.enableSecondaryAction}
          onChange={handleNotificationFormChange}
          size="sm"
        />
      </FormControl>

      {notificationFormState.enableSecondaryAction && (
        <FormControl>
          <FormLabel fontSize="sm">Secondary Action Label</FormLabel>
          <Input
            name="inAppSecondaryActionLabel"
            value={notificationFormState.inAppSecondaryActionLabel}
            onChange={handleNotificationFormChange}
            placeholder="Secondary Action Label"
            size="sm"
          />
        </FormControl>
      )}

      {notificationFormState.enableSecondaryAction && (
        <FormControl>
          <FormLabel fontSize="sm">Secondary Action URL</FormLabel>
          <Input
            name="inAppSecondaryActionUrl"
            value={notificationFormState.inAppSecondaryActionUrl}
            onChange={handleNotificationFormChange}
            placeholder="Secondary Action URL"
            size="sm"
          />
        </FormControl>
      )}
    </VStack>
  );
};

export default NotificationContentForm;
