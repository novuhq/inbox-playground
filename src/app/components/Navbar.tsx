"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Button,
  Image,
  VStack,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import CodeModal from "./CodeModal";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      boxShadow="sm"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex
        mx="auto"
        px={4}
        py={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing={4} alignItems="center">
          <Image
            src="/novuLogo.svg"
            alt="Novu Logo"
            height={10}
            width={42}
            onClick={() =>
              window.open(
                "https://novu.co?utm_source=sourceInboxPlayground",
                "_blank"
              )
            }
            cursor="pointer"
          />
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Inbox Component Playground
            </Text>
            <Text fontSize="sm" color="gray.500">
              In-app notifications powered by Novu
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={4}>
          <Button
            variant="ghost"
            colorScheme="teal"
            onClick={() =>
              window.open("https://docs.novu.co/inbox/introduction", "_blank")
            }
          >
            Docs
          </Button>
          <Button variant="solid" colorScheme="teal" onClick={onOpen}>
            Get Code
          </Button>
        </HStack>
      </Flex>
      <CodeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
