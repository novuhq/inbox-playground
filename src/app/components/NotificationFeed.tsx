import { Box, Flex, Text } from "@chakra-ui/react";
import NovuInbox from "./NovuInbox";

const NotificationFeed = () => {
    return (
        <Box
            flex="1"  // Takes up the remaining width
            marginLeft={10}
            borderWidth="1px"
            borderRadius="lg"
            padding={6}
            boxShadow="lg"
            bg="white"
            height="100%"  // Ensure the feed takes full height
            position="relative"
        >
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                    Notifications
                </Text>
                <Box>
                    <NovuInbox />
                </Box>
            </Flex>
        </Box>
    );
};

export default NotificationFeed;
