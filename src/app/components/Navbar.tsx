"use client";

import NextLink from "next/link";
import { Box, Flex, HStack, Button, Image, useColorModeValue } from "@chakra-ui/react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
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
        <HStack spacing={5}>
          {children}
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
      </Flex>
    </Box>
  );
};

export default Navbar;
