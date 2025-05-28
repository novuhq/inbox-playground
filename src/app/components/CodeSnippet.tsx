"use client";
import { useState, useCallback, useEffect } from "react";
import { Box, Button, Code } from "@chakra-ui/react";
import { useCopyToClipboard } from "react-use";
import CopyIcon from "./icons/copy.inline.svg";
import CheckIcon from "./icons/check.inline.svg";

interface CodeSnippetProps {
  code: string;
  language: string;
}

const CodeSnippet = ({ code }: CodeSnippetProps) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = useCallback(() => {
    copyToClipboard(code);
    setIsCopied(true);
  }, [copyToClipboard, code]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCopied) {
      timeoutId = setTimeout(() => setIsCopied(false), 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <Box position="relative">
      <Code
        display="block"
        p={4}
        borderRadius="6px"
        bg="#0E101B"
        color="#E2E8F0"
        border="1px solid #212640"
        boxShadow="lg"
        maxHeight="400px"
        overflow="auto"
        fontSize="13px"
        whiteSpace="pre"
        fontFamily="monospace"
      >
        {code}
      </Code>
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
    </Box>
  );
};

export default CodeSnippet;
