"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "../contexts/ThemeContext";
import { Select } from "chakra-react-select";
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const ColorPickerField = dynamic(() => import("./ColorPickerField"), {
  ssr: false,
});

const DynamicSelect = dynamic(() => Promise.resolve(Select), {
  ssr: false,
});

const items = [
  {
    label: "Primary Color",
    name: "colorPrimary",
    placeholder: "#0081F1",
  },
  {
    label: "Primary Foreground",
    name: "colorPrimaryForeground",
    placeholder: "white",
  },
  {
    label: "Secondary Color",
    name: "colorSecondary",
    placeholder: "#F3F3F3",
  },
  {
    label: "Secondary Foreground",
    name: "colorSecondaryForeground",
    placeholder: "#1A1523",
  },
  {
    label: "Background Color",
    name: "colorBackground",
    placeholder: "#FCFCFC",
  },
  {
    label: "Foreground Color",
    name: "colorForeground",
    placeholder: "#1A1523",
  },
];

const advancedItems = [
  {
    label: "Counter Color",
    name: "colorCounter",
    placeholder: "#E5484D",
  },
  {
    label: "Counter Foreground",
    name: "colorCounterForeground",
    placeholder: "white",
  },
  {
    label: "Neutral Color",
    name: "colorNeutral",
    placeholder: "black",
  },
];

export function InboxDesignForm() {
  const {
    inboxThemeForm: {
      handleSubmit,
      register,
      setValue,
      control,
      formState: { errors, isSubmitting },
      getValues,
      watch,
    },
  } = useTheme();
  const enableAdvancedSettings = watch("enableAdvancedSettings");

  function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2));
  }

  function handleFormChange(values: any) {
    const val = getValues();
  }

  const availableLanguages: { code: string; label: string }[] = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "ja", label: "Japanese" },
    { code: "de", label: "German" },
    { code: "ru", label: "Russian" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
      <VStack spacing={4} alignItems="stretch">
        <Flex flexDirection="column" gap={1}>
          <Text fontSize="xl" fontWeight="medium" lineHeight={1}>
            Configure And Design Inbox Component
          </Text>
          <Text fontSize="15px" color="white" opacity={0.8} lineHeight={1.4} maxW="408px">
            Click on the &quot;Apply Changes&quot; button to see the changes in the Inbox component.
          </Text>
        </Flex>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2.5}
          mt={3}
        >
          <FormLabel mb="0" htmlFor="open" fontSize="sm" mr={0}>
            Keep Inbox Open
          </FormLabel>
          <Switch {...register("open")} size="sm" />
        </FormControl>

        <SimpleGrid columns={1} mt={1.5}>
          <FormLabel fontSize="sm" color="white" opacity={0.6}>
            Select the language for your inbox notifications.
          </FormLabel>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <DynamicSelect
                {...field}
                instanceId="language-select"
                options={availableLanguages}
                defaultValue={availableLanguages[0]}
                onChange={(newValue, _actionMeta) =>
                  field.onChange((newValue as { code: string } | null)?.code)
                }
                value={availableLanguages.find((lang) => lang.code === field.value) || null}
                chakraStyles={{
                  singleValue: (provided) => ({
                    ...provided,
                    overflow: "visible",
                  }),
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
            )}
          />
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4}>
          {items.map((item) => (
            <ColorPickerField key={item.name} {...item} register={register} setValue={setValue} />
          ))}
        </SimpleGrid>
        <Controller
          name="enableAdvancedSettings"
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

        {enableAdvancedSettings && (
          <SimpleGrid columns={2} spacing={4}>
            {advancedItems.map((item) => (
              <ColorPickerField key={item.name} {...item} register={register} setValue={setValue} />
            ))}
            <FormControl>
              <FormLabel fontSize="sm" color="white" opacity={0.6}>
                Font Size
              </FormLabel>
              <Input {...register("fontSize")} placeholder="inherit" size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="white" opacity={0.6}>
                Border Radius
              </FormLabel>
              <Input {...register("borderRadius")} placeholder="0.375rem" size="sm" />
            </FormControl>
          </SimpleGrid>
        )}
      </VStack>
    </form>
  );
}

export default InboxDesignForm;
