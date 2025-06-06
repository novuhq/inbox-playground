"use client";
import { Select, OptionBase } from "chakra-react-select";
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
  data?: {
    inAppSubject?: string;
    inAppBody?: string;
    enablePrimaryAction?: boolean;
    enableSecondaryAction?: boolean;
    inAppPrimaryActionLabel?: string;
    inAppSecondaryActionLabel?: string;
    inAppSecondaryActionUrl?: string;
    inAppPrimaryActionUrl?: string;
    showInAppAvatar?: boolean;
    inAppAvatar?: string;
  };
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
    notificationForm: { control, watch, setValue, reset },
    selectedTheme,
  } = useTheme();

  const workflowOptions: WorkflowOption[] = workflows.map((workflow) => ({
    label: workflow.title,
    value: workflow.id,
  }));

  const formValues = watch();
  const selectedWorkflowId = watch("selectedWorkflow");

  // Reset form when theme changes
  useEffect(() => {
    reset({
      subscriberFirstName: "John",
      subscriberLastName: "Doe",
      selectedWorkflow: workflows[0]?.id || "",
      inAppSubject: "",
      inAppBody: "",
      inAppAvatar: "",
      showInAppAvatar: false,
      inAppPrimaryActionLabel: "",
      enablePrimaryAction: false,
      inAppPrimaryActionUrl: "",
      inAppSecondaryActionLabel: "",
      enableSecondaryAction: false,
      inAppSecondaryActionUrl: "",
    });
  }, [selectedTheme.id, reset]);

  // Update form when workflow changes
  useEffect(() => {
    const selectedWorkflow = workflows.find((workflow) => workflow.id === selectedWorkflowId);
    if (selectedWorkflow?.data) {
      setValue("inAppSubject", selectedWorkflow.data.inAppSubject as string);
      setValue("inAppBody", selectedWorkflow.data.inAppBody as string);
      setValue("enablePrimaryAction", !!selectedWorkflow.data.enablePrimaryAction);
      setValue("inAppPrimaryActionLabel", selectedWorkflow.data.inAppPrimaryActionLabel as string);
      setValue("inAppPrimaryActionUrl", selectedWorkflow.data.inAppPrimaryActionUrl as string);
      setValue("enableSecondaryAction", !!selectedWorkflow.data.enableSecondaryAction);
      setValue(
        "inAppSecondaryActionLabel",
        selectedWorkflow.data.inAppSecondaryActionLabel as string,
      );
      setValue("inAppSecondaryActionUrl", selectedWorkflow.data.inAppSecondaryActionUrl as string);
      setValue("showInAppAvatar", !!selectedWorkflow.data.showInAppAvatar);
      setValue("inAppAvatar", selectedWorkflow.data.inAppAvatar as string);
    }
  }, [selectedWorkflowId, workflows, setValue]);

  useEffect(() => {
    if (onSubmit) {
      onSubmit(formValues as NotificationFormState);
    }
  }, [formValues, onSubmit]);

  const enablePrimaryAction = watch("enablePrimaryAction");
  const enableSecondaryAction = watch("enableSecondaryAction");

  return (
    <form>
      <VStack spacing={4} alignItems="stretch">
        <div>
          <Heading size="sm" fontSize="18px">
            Subscriber
          </Heading>
          <Text
            fontSize="15px"
            color="white"
            fontWeight={350}
            opacity={0.8}
            mt={1.5}
            lineHeight={1.4}
          >
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

        <Divider borderColor="#30385A" my={3} />
        <Flex flexDirection="column" gap={6}>
          <Controller
            name="selectedWorkflow"
            control={control}
            defaultValue={workflows[0].id}
            render={({ field }) => (
              <FormControl>
                <Heading size="sm" fontSize="18px">
                  Workflow
                </Heading>
                <FormLabel fontSize="sm" mt={5}>
                  Select a workflow to customize the notification content.
                </FormLabel>
                <Select
                  {...field}
                  size="sm"
                  options={workflowOptions}
                  value={workflowOptions.find((option) => option.value === field.value)}
                  defaultValue={workflowOptions[0]}
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
        </Flex>
        <Controller
          name="enablePrimaryAction"
          control={control}
          render={({ field }) => (
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={2.5}
              mt={2.5}
            >
              <FormLabel fontSize="sm" mb="0" mr={0}>
                Enable Primary Action
              </FormLabel>
              <Switch {...(field as any)} isChecked={field.value} size="sm" />
            </FormControl>
          )}
        />
        {enablePrimaryAction && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap={4} mt={1}>
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
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={2.5}
              mt={3}
            >
              <FormLabel fontSize="sm" mb="0" mr={0}>
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

        <Flex flexDirection="column" gap={5} mt={2.5}>
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
                <FormLabel fontSize="sm">Avatar URL</FormLabel>
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
