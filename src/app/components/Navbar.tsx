"use client";

import { Flex, Text, HStack, Button, Image, VStack } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Flex
            as="nav"
            width="100%"
            padding={4}
            bg="black"  // Novu-like dark background color
            color="white"
            justifyContent="space-between"
            alignItems="center"
            boxShadow="md"
        >
            <HStack spacing={4} alignItems="center">
                <Image 
                    src="https://avatars.githubusercontent.com/u/77433905?s=200&v=4" // Example logo from the web
                    alt="Novu Logo"
                    boxSize="50px"
                />
                <VStack alignItems="flex-start" spacing={0}>
                    <Text fontSize="xl" fontWeight="bold">
                        Inbox Component Playground
                    </Text>
                    <Text fontSize="sm" color="gray.300">
                        This is an example application to show in-app notifications powered by Novu.
                    </Text>
                </VStack>
            </HStack>
            <HStack spacing={4}>
                <Button 
                    variant="outline" 
                    color="white" 
                    borderColor="white"
                    _hover={{ bg: "#1A7BCF", borderColor: "#1A7BCF" }}
                    onClick={() => window.open("https://docs.novu.co/inbox/introduction", "_blank")}
                >
                    Docs
                </Button>
                <Button 
                    variant="outline" 
                    color="white" 
                    borderColor="white"
                    _hover={{ bg: "#1A7BCF", borderColor: "#1A7BCF" }}
                    onClick={() => window.open("https://github.com/novuhq/novu", "_blank")}
                >
                    Source Code
                </Button>
            </HStack>
        </Flex>
    );
};

export default Navbar;
