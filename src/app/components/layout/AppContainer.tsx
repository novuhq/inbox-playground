"use client";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import SendNotificationForm from "../SendNotificationForm";
import NotificationFeed from "../NotificationFeed";
import { useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

const AppContainer = () => {
  const [subscriberId, setSubscriberId] = useState("");

  useEffect(() => {
    const localSubscriberId = localStorage.getItem("inbox_demo_subscriberId");

    if (localSubscriberId) {
      setSubscriberId(localSubscriberId);
    } else {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
    }
  }, []);
  return (
    <Box height="100vh" bg="gray.100">
      <Navbar />
      <Flex
        height="calc(100vh - 72px)"
        padding={8}
        alignItems="flex-start"
        gap={6}
      >
        <SendNotificationForm subscriberId={subscriberId} />
        <NotificationFeed subscriberId={subscriberId} />
      </Flex>
    </Box>
  );
};

export default AppContainer;
