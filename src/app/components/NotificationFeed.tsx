"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Inbox } from "@novu/react";

// Localization object containing translations for multiple languages

// Merge the selected locale translations into novuConfig
export const novuConfig = {
  applicationIdentifier: process.env.NEXT_PUBLIC_APPLICATION_IDENTIFIER!,
  appearance: {
    elements: {
      bellContainer: {
        color: "",
        width: "30px",
        height: "30px",
      },
      bellIcon: {
        width: "30px",
        height: "30px",
      },
      bellDot: {
        width: "10px",
        height: "10px",
      },
      inbox__popoverContent: {
        width: "59%",
        marginLeft: "-45px",
      },
      popoverContent: {},
      notification: {},
      notificationList: {},
    },
  },
};

const NotificationFeed = ({ subscriberId }: { subscriberId: string }) => {
  if (subscriberId === "") {
    return <div>Loading...</div>;
  } else
    return (
      <Box
        flex="1" // Takes up the remaining width
        marginLeft={10}
        borderWidth="1px"
        borderRadius="lg"
        padding={6}
        boxShadow="lg"
        bg="white"
        height="100%" // Ensure the feed takes full height
        position="relative"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            Notifications --- {subscriberId}
          </Text>
          <Box>
            <Inbox {...novuConfig} subscriberId={subscriberId} />
          </Box>
        </Flex>
      </Box>
    );
};

export default NotificationFeed;
