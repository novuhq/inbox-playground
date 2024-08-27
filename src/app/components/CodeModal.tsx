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
} from "@chakra-ui/react";
import { useCopyToClipboard } from "react-use";
interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CodeModal({ isOpen, onClose }: CodeModalProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = useCallback(() => {
    copyToClipboard("asd");
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
          <CodeBlock code={"console.log()"} language={"tsx"}>
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
