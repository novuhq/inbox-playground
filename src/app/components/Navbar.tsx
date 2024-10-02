"use client";

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
  const textColor = useColorModeValue("gray.10", "gray.200");

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
        px={10}
        py={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing={4} alignItems="center">
          <Image
            src="/novuLogo.svg"
            alt="Novu Logo"
            height={10}
            width={116}
            objectFit="contain"
            onClick={() =>
              window.open(
                "https://novu.co?utm_source=sourceInboxPlayground",
                "_blank"
              )
            }
            cursor="pointer"
          />
          <VStack alignItems="flex-start" spacing={2.5}>
            <Text fontSize="lg" fontWeight="bold" color={textColor} lineHeight={1}>
              Inbox Component Playground
            </Text>
            <Text fontSize="sm" color={textColor} lineHeight={1}>
              In-app notifications powered by Novu
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={4}>
          <Button
            variant="ghost"
            colorScheme="gray"
            color={textColor}
            onClick={() =>
              window.open("https://docs.novu.co/inbox/introduction", "_blank")
            }
          >
            Docs
          </Button>
          <Button
            onClick={onOpen}
            color={textColor}
            variant="gradient-outline"
          >
            Get Code
          </Button>
        </HStack>
      </Flex>
      <CodeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
