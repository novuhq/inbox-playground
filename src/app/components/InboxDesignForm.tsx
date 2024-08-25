"use client";

import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Select,
  Input,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

export function InboxDesignForm() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("inbox_demo_language") || "en"
  );
  const [designFormState, setDesignFormState] = useState({
    colorPrimary: localStorage.getItem("inbox_demo_colorPrimary") || "#0081F1",
    colorPrimaryForeground:
      localStorage.getItem("inbox_demo_colorPrimaryForeground") || "white",
    colorSecondary:
      localStorage.getItem("inbox_demo_colorSecondary") || "#F3F3F3",
    colorSecondaryForeground:
      localStorage.getItem("inbox_demo_colorSecondaryForeground") || "#1A1523",
    colorCounter: localStorage.getItem("inbox_demo_colorCounter") || "#E5484D",
    colorCounterForeground:
      localStorage.getItem("inbox_demo_colorCounterForeground") || "white",
    colorBackground:
      localStorage.getItem("inbox_demo_colorBackground") || "#FCFCFC",
    colorForeground:
      localStorage.getItem("inbox_demo_colorForeground") || "#1A1523",
    colorNeutral: localStorage.getItem("inbox_demo_colorNeutral") || "black",
    fontSize: localStorage.getItem("inbox_demo_fontSize") || "inherit",
    borderRadius: localStorage.getItem("inbox_demo_borderRadius") || "0.375rem",
    open: localStorage.getItem("inbox_demo_open") === "true",
  });

  const [codeSnippet, setCodeSnippet] = useState("");
  const [copied, setCopied] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    localStorage.setItem("inbox_demo_language", language);
  };

  const handleDesignFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDesignFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem(`inbox_demo_${name}`, value);
  };

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
    <VStack spacing={4} alignItems="stretch">
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        Configure And Design Inbox Component
      </Text>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Click on the &quot;Apply Changes&quot; button to see the changes in the
        Inbox component.
      </Text>

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
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
        <Select value={selectedLanguage} onChange={handleLanguageChange}>
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
  );
}

export default InboxDesignForm;
