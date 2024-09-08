"use client";

import { useState } from "react";
import {
  Flex,
  Text,
  HStack,
  Button,
  Image,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import CodeModal from "./CodeModal";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      width="100%"
      padding={2}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
    >
      <HStack spacing={1} alignItems="center">
        <Image
          src="/novuLogo.svg"
          alt="Novu Logo"
          height={50}
          width={210}
          onClick={() => window.open("https://novu.co?utm_source=sourceInboxPlayground", "_blank")}
        />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="xl" fontWeight="bold">
            Inbox Component Playground
          </Text>
          <Text fontSize="sm">
            This is an example application to show in-app notifications powered
            by Novu.
          </Text>
        </VStack>
      </HStack>
      <HStack spacing={4}>
        <Button
          variant="outline"
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
      <CodeModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Navbar;
