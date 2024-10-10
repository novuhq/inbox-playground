"use client";

import React from "react";
import { useTheme } from "../contexts/ThemeContext";

import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Select,
  Input,
} from "@chakra-ui/react";

export function InboxDesignForm() {
  const {
    inboxThemeForm: {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      getValues,
    },
  } = useTheme();

  function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2));
  }

  function handleFormChange(values: any) {
    const val = getValues();
  }

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "ja", label: "Japanese" },
    { code: "de", label: "German" },
    { code: "ru", label: "Russian" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
      <VStack spacing={4} alignItems="stretch" mb="20px">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Configure And Design Inbox Component
        </Text>
        <Text fontSize="15px" color="white" opacity={0.8} textAlign="center">
          Click on the &quot;Apply Changes&quot; button to see the changes in
          the Inbox component.
        </Text>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormLabel mb="0" htmlFor="open">
            Keep Inbox Open
          </FormLabel>
          <Switch {...register("open")} size="md" />
        </FormControl>

        <SimpleGrid columns={1} spacing={4}>
          <FormLabel>Inbox Language</FormLabel>
          <Text fontSize="15px" color="white" opacity={0.8}>
            Select the language for your inbox notifications.
          </Text>
          <Select {...register("language")}>
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
              {...register("colorPrimary")}
              placeholder="#0081F1"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Primary Foreground</FormLabel>
            <Input
              {...register("colorPrimaryForeground")}
              placeholder="white"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Secondary Color</FormLabel>
            <Input
              {...register("colorSecondary")}
              placeholder="#F3F3F3"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Secondary Foreground</FormLabel>
            <Input
              {...register("colorSecondaryForeground")}
              placeholder="#1A1523"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Counter Color</FormLabel>
            <Input
              {...register("colorCounter")}
              placeholder="#E5484D"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Counter Foreground</FormLabel>
            <Input
              {...register("colorCounterForeground")}
              placeholder="white"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Background Color</FormLabel>
            <Input
              {...register("colorBackground")}
              placeholder="#FCFCFC"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Foreground Color</FormLabel>
            <Input
              {...register("colorForeground")}
              placeholder="#1A1523"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Neutral Color</FormLabel>
            <Input
              {...register("colorNeutral")}
              placeholder="black"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Font Size</FormLabel>
            <Input {...register("fontSize")} placeholder="inherit" size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>Border Radius</FormLabel>
            <Input
              {...register("borderRadius")}
              placeholder="0.375rem"
              size="sm"
            />
          </FormControl>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default InboxDesignForm;
