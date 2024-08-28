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
} from "@chakra-ui/react";
import { useCopyToClipboard } from "react-use";
import { useTheme } from "../contexts/ThemeContext";
interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CodeModal({ isOpen, onClose }: CodeModalProps) {
  const {
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

  const code = `
  function InboxComponent(){
    return <Inbox applicationIdentifier="YOUR_APP_ID" 
        subscriberId="subscriberId"
        appearance={{
            variables: ${JSON.stringify(appearanceVariables, null, 4)
              .split("\n")
              .map((line, index) =>
                index === 0 ? line : "    ".repeat(3) + line
              )
              .join("\n")}
        }} 
    />
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Get Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CodeBlock code={code} language={"tsx"}>
            <div className="relative">
              <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
                <div className="table-row">
                  <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                  <CodeBlock.LineContent className="table-cell">
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                </div>
              </CodeBlock.Code>

              <Button
                size="xs"
                onClick={copyCode}
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                }}
              >
                {isCopied ? "Copied!" : "Copy code"}
              </Button>
            </div>
          </CodeBlock>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CodeModal;
