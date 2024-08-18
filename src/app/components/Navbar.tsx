"use client";

import { Flex, Text, HStack, Button } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Flex
            as="nav"
            width="100%"
            padding={4}
            bg="blue.500"
            color="white"
            justifyContent="space-between"
            alignItems="center"
            boxShadow="md"
        >
            <Text fontSize="xl" fontWeight="bold">
                In-App Notifications (Inbox Component Demo)
            </Text>
            <HStack spacing={4}>
                <Button 
                    variant="solid" 
                    colorScheme="blue"
                    onClick={() => window.open("https://docs.novu.co/inbox/introduction", "_blank")}
                >
                    Docs
                </Button>
            </HStack>
        </Flex>
    );
};

export default Navbar;
