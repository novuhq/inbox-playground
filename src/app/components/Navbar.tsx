"use client";

import NextLink from "next/link";
import {
  Box,
  Flex,
  HStack,
  Button,
  Image,
  useColorModeValue,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import CodeModal from "./CodeModal";
import { GitHubIcon } from "./icons/GitHub";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("", "gray.800");
  const textColor = useColorModeValue("gray.10", "gray.200");

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      bg={bgColor}
      boxShadow="sm"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex mx="auto" pl={8} pr="72px" py={3} alignItems="center" justifyContent="space-between">
        <HStack spacing={4} alignItems="center">
          <Image
            src="/novuLogo.svg"
            alt="Novu Logo"
            height={8}
            width={102}
            objectFit="contain"
            onClick={() =>
              window.open("https://novu.co?utm_source=sourceInboxPlayground", "_blank")
            }
            cursor="pointer"
          />
        </HStack>
        <HStack spacing={7}>
          <Link
            href="https://github.com/novuhq/novu"
            isExternal
            display="flex"
            alignItems="center"
            gap={2.5}
            variant="plain"
            color="white"
            textTransform="uppercase"
            fontSize="12px"
            fontWeight="medium"
            lineHeight="100%"
            transition="color 0.2s"
            _hover={{
              textDecoration: "none",
              color: "#00d5ff",
            }}
          >
            <GitHubIcon className="h-[26px] w-[26px]" />
            Star us
          </Link>
          <HStack spacing={5}>
            <Button
              variant="gray-outline"
              fontSize="12px"
              fontWeight="medium"
              lineHeight="100%"
              textTransform="uppercase"
              px={5}
              py={3.5}
              onClick={onOpen}
            >
              Get code
            </Button>
            <Button
              as={NextLink}
              href="https://dashboard.novu.co/?utm_campaign=gs_top_bar"
              color={textColor}
              variant="white"
              fontSize="12px"
              px={5}
              py={3.5}
              fontWeight="medium"
              lineHeight="100%"
              textTransform="uppercase"
            >
              Get started
            </Button>
          </HStack>
        </HStack>
      </Flex>

      <CodeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
