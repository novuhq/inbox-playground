"use client";
import {
  VStack,
  Flex,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Box,
  Spinner,
  Image,
} from "@chakra-ui/react";
import InboxDesignForm from "./InboxDesignForm";
import NotificationContentForm from "./NotificationContentForm";
import { useNotificationForm } from "../hooks/useNotificationForm";
import { useSubscriber } from "../hooks/useSubscriber";
import { useTheme } from "../contexts/ThemeContext";

const PlaygroundFormContainer = () => {
  const { themes, setSelectedTheme } = useTheme();

  const { handleSubmit, isLoading } = useNotificationForm();

  return (
    <Flex position="relative" width="100%" maxW="600px" height="100%" minHeight="400px">
      <Image
        src="/images/dots.svg"
        alt=""
        width={296}
        height={160}
        position="absolute"
        top="-56px"
        right="-13px"
      />
      <Image
        src="/images/blur.svg"
        alt=""
        width={939}
        height={846}
        position="absolute"
        top="-94px"
        left="-32px"
        maxW="none"
      />
      <Flex
        width="100%"
        borderWidth="1px"
        borderColor="#6B7DB3"
        borderRadius="18px"
        boxShadow="lg"
        bg="linear-gradient(180deg, #1B2137 -0.49%, #111522 48.7%)"
        position="relative"
        height="100%"
        direction="column"
      >
        <Image
          src="/images/shine.svg"
          alt=""
          width={365}
          height={71}
          position="absolute"
          top="-10px"
          right="-6px"
        />
        <Image
          src="/images/playground-bg.svg"
          alt=""
          width={600}
          height={534}
          position="absolute"
          top={0}
          left={0}
          borderRadius="17px"
        />

        <VStack spacing={4} alignItems="stretch" flexGrow={1} height="100%">
          <Tabs
            height="calc(100% - 80px)"
            onChange={(index) => {
              setSelectedTheme(themes[index]);
            }}
          >
            <TabList borderBottom="1px solid #30385A">
              {themes.map((theme) => (
                <Tab
                  key={theme.id}
                  px={7}
                  py={4}
                  sx={{
                    svg: {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                  fontWeight="400"
                  color="#A8A9BD"
                  _selected={{
                    color: "white",
                  }}
                  _hover={{
                    color: "white",
                  }}
                  lineHeight="1"
                >
                  <span style={{ marginRight: "6px", display: "inline-block" }}>{theme.icon}</span>
                  {theme.title}
                </Tab>
              ))}
            </TabList>
            <TabIndicator mt="-1.5px" height="1px" borderRadius="1px" bg="white" />
            <TabPanels height="calc(100% - 30px)">
              {themes.map((theme) => (
                <TabPanel
                  key={theme.id}
                  height="100%"
                  overflowY="auto"
                  overflowX="hidden"
                  px={7}
                  py="26px"
                  gap={10}
                  display="flex"
                  flexDirection="column"
                >
                  {theme.id === "default-theme" ? <InboxDesignForm /> : null}
                  <NotificationContentForm workflows={theme.workflows} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <Box p={3}>
            <Button
              data-testid="send-notification-button"
              variant="white-outline"
              size="md"
              width="full"
              height="44px"
              alignSelf="flex-end"
              color="white"
              fontWeight="500"
              lineHeight="1.2"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Send Notification
            </Button>
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default PlaygroundFormContainer;
