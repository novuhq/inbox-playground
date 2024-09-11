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
} from "@chakra-ui/react";
import { useCopyToClipboard } from "react-use";
import { useTheme } from "../contexts/ThemeContext";
interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader fontSize="2xl" fontWeight="bold">
          Get Code
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={2}>
                1. Install the package
              </Text>
              <Box position="relative">
                <CodeBlock code={"npm install @novu/react"} language={"bash"}>
                  <CodeBlock.Code
                    style={{
                      background: "#1A202C",
                      color: "#E2E8F0",
                      padding: "1.5rem",
                      borderRadius: "0.5rem",
                      boxShadow: "lg",
                    }}
                  >
                    <div className="table-row">
                      <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                      <CodeBlock.LineContent className="table-cell">
                        <CodeBlock.Token />
                      </CodeBlock.LineContent>
                    </div>
                  </CodeBlock.Code>
                </CodeBlock>
              </Box>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={2}>
                2. Add and import the Inbox component
              </Text>
              <Box position="relative">
                <CodeBlock code={code} language={"tsx"}>
                  <CodeBlock.Code
                    style={{
                      background: "#1A202C",
                      color: "#E2E8F0",
                      padding: "1.5rem",
                      borderRadius: "0.5rem",
                      boxShadow: "lg",
                      maxHeight: "400px",
                      overflow: "auto",
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
                    size="sm"
                    colorScheme="blue"
                    onClick={copyCode}
                    position="absolute"
                    top={2}
                    right={2}
                    zIndex="1"
                  >
                    {isCopied ? "Copied!" : "Copy code"}
                  </Button>
                </CodeBlock>
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CodeModal;
