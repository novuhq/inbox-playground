"use client";
import { useState, useCallback, useEffect } from "react";
import { CodeBlock } from "react-code-block";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  VStack,
  useColorModeValue,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useCopyToClipboard } from "react-use";
import { useTheme } from "../contexts/ThemeContext";
import CopyIcon from "./icons/copy.inline.svg";
import CheckIcon from "./icons/check.inline.svg";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeSnippet = ({ code, language }: { code: string; language: string }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = useCallback(() => {
    copyToClipboard(code);
    setIsCopied(true);
  }, [copyToClipboard]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCopied) {
      timeoutId = setTimeout(() => setIsCopied(false), 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <Box position="relative">
      <CodeBlock code={code} language={"tsx"}>
        <CodeBlock.Code
          style={{
            background: "#0E101B",
            color: "#E2E8F0",
            padding: "16px",
            borderRadius: "6px",
            border: "1px solid #212640",
            boxShadow: "lg",
            maxHeight: "400px",
            overflow: "auto",
            fontSize: "13px",
          }}
        >
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
        <Button
          width="28px"
          height="28px"
          size="xs"
          borderRadius="4px"
          px={0}
          border="1px solid #212640"
          bg="#131625"
          color="#5F668C"
          _hover={{
            color: "#E2E8F0",
          }}
          onClick={copyCode}
          position="absolute"
          top={4}
          right={4}
          zIndex="1"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </CodeBlock>
    </Box>
  );
};

function CodeModal({ isOpen, onClose }: CodeModalProps) {
  const {
    selectedTheme,
    inboxThemeForm: {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      getValues,
    },
  } = useTheme();

  const formValues = getValues();
  const appearanceVariables = {
    colorBackground: formValues.colorBackground,
    colorForeground: formValues.colorForeground,
    colorPrimary: formValues.colorPrimary,
    colorPrimaryForeground: formValues.colorPrimaryForeground,
    colorSecondary: formValues.colorSecondary,
    colorSecondaryForeground: formValues.colorSecondaryForeground,
    colorCounter: formValues.colorCounter,
    colorCounterForeground: formValues.colorCounterForeground,
    colorNeutral: formValues.colorNeutral,
    fontSize: formValues.fontSize,
    borderRadius: formValues.borderRadius,
  };

  const appearanceElements = selectedTheme?.appearance?.elements;

  const code = `
import { Inbox } from "@novu/react";

function InboxComponent() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APP_ID"
      subscriberId="subscriberId"
      appearance={{
        variables: ${JSON.stringify(appearanceVariables, null, 2)
          .split("\n")
          .map((line, index) => (index === 0 ? line : "        " + line))
          .join("\n")},
        elements: ${JSON.stringify(appearanceElements, null, 2)
          .split("\n")
          .map((line, index) => (index === 0 ? line : "        " + line))
          .join("\n")}
      }}
    />
  );
}
  `;

  const bgColor = useColorModeValue(
    "linear-gradient(180deg, #1B2137 -0.49%, #111522 48.7%), #0F0F15",
    "gray.800",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleDocumentationClick = () => {
    window.open(
      "https://docs.novu.co/platform/inbox/overview?utm_source=inbox-playground",
      "_blank",
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader
          fontSize="4xl"
          fontWeight="bold"
          color="white"
          px={8}
          pt={8}
          pb={3}
          lineHeight={1.125}
        >
          Get Code
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody px={8} pb={8}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text fontSize="lg" mb={4}>
                1. Install the package
              </Text>
              <CodeSnippet code={"npm install @novu/react"} language="bash" />
            </Box>

            <Box>
              <Text fontSize="lg" mb={4}>
                2. Add and import the Inbox component
              </Text>
              <CodeSnippet code={code} language="tsx" />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter px={8} pb={8} justifyContent="flex-end">
          <Button
            // leftIcon={<Icon as={ExternalLinkIcon} />}
            colorScheme="blue"
            variant="outline"
            size="md"
            onClick={handleDocumentationClick}
          >
            View Documentation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CodeModal;
