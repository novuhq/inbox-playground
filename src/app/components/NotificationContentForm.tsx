"use client";
import { Select, SingleValue, OptionBase } from "chakra-react-select";
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
  Heading,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useTheme } from "../contexts/ThemeContext";

interface Workflow {
  id: string;
  title: string;
}

interface WorkflowOption extends OptionBase {
  label: string;
  value: string;
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

  const workflowOptions: WorkflowOption[] = workflows.map((workflow) => ({
    label: workflow.title,
    value: workflow.id,
  }));

  const formValues = watch();
  const selectedWorkflowId = watch("selectedWorkflow");

  useEffect(() => {
    if (onSubmit) {
      onSubmit(formValues as NotificationFormState);
    }
  }, [formValues, onSubmit]);

  useEffect(() => {
    const selectedWorkflow = selectedTheme.workflows.find(
      (workflow) => workflow.id === selectedWorkflowId,
    );

    if (selectedWorkflow && selectedWorkflow.data) {
      const {
        inAppSubject,
        inAppBody,
        enablePrimaryAction,
        enableSecondaryAction,
        inAppPrimaryActionLabel,
        inAppSecondaryActionLabel,
        inAppSecondaryActionUrl,
        inAppPrimaryActionUrl,
        showInAppAvatar,
        inAppAvatar,
      } = selectedWorkflow.data;

      setValue("inAppSubject", inAppSubject as string);
      setValue("inAppBody", inAppBody as string);
      setValue("enablePrimaryAction", !!enablePrimaryAction);
      setValue("inAppPrimaryActionLabel", inAppPrimaryActionLabel as string);
      setValue("inAppPrimaryActionUrl", inAppPrimaryActionUrl as string);
      setValue("enableSecondaryAction", !!enableSecondaryAction);
      setValue("inAppSecondaryActionLabel", inAppSecondaryActionLabel as string);
      setValue("inAppSecondaryActionUrl", inAppSecondaryActionUrl as string);
      setValue("showInAppAvatar", !!showInAppAvatar);
      setValue("inAppAvatar", inAppAvatar as string);
    }
  }, [selectedWorkflowId, selectedTheme.workflows, setValue]);

  const enablePrimaryAction = watch("enablePrimaryAction");
  const enableSecondaryAction = watch("enableSecondaryAction");

  return (
    <form>
      <VStack spacing={4} alignItems="stretch">
        <div>
          <Heading size="sm" fontSize="18px">
            Subscriber
          </Heading>
          <Text fontSize="15px" color="white" fontWeight={350} opacity={0.8} mb={2}>
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

        <Divider borderColor="#30385A" />

        <Controller
          name="selectedWorkflow"
          control={control}
          defaultValue={workflows[0].id}
          render={({ field }) => (
            <FormControl>
              <Heading size="sm" fontSize="18px">
                Workflow
              </Heading>
              <Text fontSize="15px" color="white" opacity={0.8} mb={2}>
                Select a workflow to customize the notification content.
              </Text>
              <Select<WorkflowOption, false>
                {...field}
                size="sm"
                options={workflowOptions}
                value={workflowOptions.find(option => option.value === field.value)}
                onChange={(newValue) => field.onChange(newValue?.value)}
                chakraStyles={{
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    bg: "transparent",
                    px: 2,
                    cursor: "inherit",
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: "4px",
                    color: "white",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    bg: "#1A1E32",
                    border: "1px solid #30385A",
                  }),
                  option: (provided) => ({
                    ...provided,
                    bg: "#1A1E32",
                    _hover: {
                      bg: "rgba(48, 56, 90, 0.50)",
                    },
                  }),
                }}
              />
            </FormControl>
          )}
        />

        <Controller
          name="inAppSubject"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel fontSize="sm">Subject</FormLabel>
              <Input {...field} placeholder="In-App Notification Subject" size="sm" />
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
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
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
                    <Input {...field} placeholder="Primary Action Label" size="sm" />
                  </FormControl>
                )}
              />

              <Controller
                name="inAppPrimaryActionUrl"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Primary Action URL</FormLabel>
                    <Input {...field} placeholder="Primary Action URL" size="sm" />
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
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
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
                    <Input {...field} placeholder="Secondary Action Label" size="sm" />
                  </FormControl>
                )}
              />

              <Controller
                name="inAppSecondaryActionUrl"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel fontSize="sm">Secondary Action URL</FormLabel>
                    <Input {...field} placeholder="Secondary Action URL" size="sm" />
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
                  <Switch {...(field as any)} isChecked={field.value} size="sm" />
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
