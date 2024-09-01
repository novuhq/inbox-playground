"use client";

import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
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
import { useTheme } from "../contexts/ThemeContext";

interface Workflow {
  id: string;
  title: string;
}

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
  workflows: Workflow[];
  onSubmit?: (data: NotificationFormState) => void;
}

const NotificationContentForm: React.FC<NotificationContentFormProps> = ({
  workflows,
  onSubmit,
}) => {
  const {
    notificationForm: { control, watch, setValue },
    selectedTheme,
  } = useTheme();

  const formValues = watch();
  const selectedWorkflowId = watch("selectedWorkflow");

  useEffect(() => {
    if (onSubmit) {
      onSubmit(formValues as NotificationFormState);
    }
  }, [formValues, onSubmit]);

  useEffect(() => {
    const selectedWorkflow = selectedTheme.workflows.find(
      (workflow) => workflow.id === selectedWorkflowId
    );

    if (selectedWorkflow && selectedWorkflow.data) {
      const {
        inAppSubject,
        inAppBody,
        inAppPrimaryActionLabel,
        inAppPrimaryActionUrl,
        showInAppAvatar,
      } = selectedWorkflow.data;

      setValue("inAppSubject", inAppSubject as string);
      setValue("inAppBody", inAppBody as string);
      setValue("inAppPrimaryActionLabel", inAppPrimaryActionLabel as string);
      setValue("inAppPrimaryActionUrl", inAppPrimaryActionUrl as string);
      setValue("enablePrimaryAction", !!inAppPrimaryActionLabel);
      setValue("showInAppAvatar", !!showInAppAvatar);
    }
  }, [selectedWorkflowId, selectedTheme.workflows, setValue]);

  const enablePrimaryAction = watch("enablePrimaryAction");
  const enableSecondaryAction = watch("enableSecondaryAction");

  return (
    <form>
      <VStack spacing={4} alignItems="stretch">
        <div>
          <Heading size="sm">Subscriber</Heading>
          <Text fontSize="sm" color="gray.600" mb={2}>
            The recipient of the notification, change the details to customize.
          </Text>
        </div>

        <Flex gap={4}>
          <Controller
            name="subscriberFirstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl isRequired flex={1}>
                <FormLabel fontSize="sm">First Name</FormLabel>
                <Input {...field} placeholder="First Name" size="sm" />
              </FormControl>
            )}
          />

          <Controller
            name="subscriberLastName"
            control={control}
            render={({ field }) => (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Last Name</FormLabel>
                <Input {...field} placeholder="Last Name" size="sm" />
              </FormControl>
            )}
          />
        </Flex>

        <Divider />

        <Controller
          name="selectedWorkflow"
          control={control}
          defaultValue={workflows[0].id}
          render={({ field }) => (
            <FormControl>
              <Heading size="sm">Workflow</Heading>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Select a workflow to customize the notification content.
              </Text>
              <Select {...field} size="sm">
                {workflows.map((workflow) => (
                  <option key={workflow.id} value={workflow.id}>
                    {workflow.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="inAppSubject"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel fontSize="sm">Subject</FormLabel>
              <Input
                {...field}
                placeholder="In-App Notification Subject"
                size="sm"
              />
            </FormControl>
          )}
        />

        <Controller
          name="inAppBody"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel fontSize="sm">Body</FormLabel>
              <Textarea
                {...field}
                placeholder="In-App Notification Body"
                size="sm"
                resize="vertical"
              />
            </FormControl>
          )}
        />

        <Controller
          name="enablePrimaryAction"
          control={control}
          render={({ field }) => (
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel fontSize="sm" mb="0">
                Enable Primary Action
              </FormLabel>
              <Switch {...(field as any)} isChecked={field.value} size="sm" />
            </FormControl>
          )}
        />

        {enablePrimaryAction && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap={4}>
              <Controller
                name="inAppPrimaryActionLabel"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Primary Action Label</FormLabel>
                    <Input
                      {...field}
                      placeholder="Primary Action Label"
                      size="sm"
                    />
                  </FormControl>
                )}
              />

              <Controller
                name="inAppPrimaryActionUrl"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Primary Action URL</FormLabel>
                    <Input
                      {...field}
                      placeholder="Primary Action URL"
                      size="sm"
                    />
                  </FormControl>
                )}
              />
            </Flex>
          </>
        )}

        <Controller
          name="enableSecondaryAction"
          control={control}
          render={({ field }) => (
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel fontSize="sm" mb="0">
                Enable Secondary Action
              </FormLabel>
              <Switch {...(field as any)} isChecked={field.value} size="sm" />
            </FormControl>
          )}
        />

        {enableSecondaryAction && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap={4}>
              <Controller
                name="inAppSecondaryActionLabel"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Secondary Action Label</FormLabel>
                    <Input
                      {...field}
                      placeholder="Secondary Action Label"
                      size="sm"
                    />
                  </FormControl>
                )}
              />

              <Controller
                name="inAppSecondaryActionUrl"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Secondary Action URL</FormLabel>
                    <Input
                      {...field}
                      placeholder="Secondary Action URL"
                      size="sm"
                    />
                  </FormControl>
                )}
              />
            </Flex>
          </>
        )}
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Controller
            name="showInAppAvatar"
            control={control}
            render={({ field }) => {
              return (
                <FormControl display="flex" alignItems="center" width="auto">
                  <FormLabel fontSize="sm" mb="0" mr={2} whiteSpace="nowrap">
                    Show Avatar
                  </FormLabel>
                  <Switch
                    {...(field as any)}
                    isChecked={field.value}
                    size="sm"
                  />
                </FormControl>
              );
            }}
          />

          <Controller
            name="inAppAvatar"
            control={control}
            render={({ field }) => (
              <FormControl flex={1}>
                <Input
                  {...field}
                  placeholder="Avatar URL"
                  size="sm"
                  isDisabled={!watch("showInAppAvatar")}
                />
              </FormControl>
            )}
          />
        </Flex>
      </VStack>
    </form>
  );
};

export default NotificationContentForm;
