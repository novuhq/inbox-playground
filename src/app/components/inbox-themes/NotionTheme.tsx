"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  Avatar,
  Divider,
  Stack,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  Tooltip,
  Button,
  background,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"; // Example icons from Chakra UI
import {
  FiSearch,
  FiHome,
  FiInbox,
  FiSettings,
  FiChevronRight,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import { BsFillFileTextFill, BsTrash } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineCheck } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { Inbox, Notifications } from "@novu/react";
import { NotionIcon } from "../icons/Notion";
import React, { useState } from "react";
import { useSubscriber } from "../../hooks/useSubscriber";
import { useTheme } from "../../contexts/ThemeContext";

const NotionTheme = () => {
  const { subscriberId } = useSubscriber();
  const { selectedTheme } = useTheme();

  const novuConfig: any = {
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID,
    subscriberId: subscriberId,
    appearance: {
      variables: selectedTheme?.appearance?.variables,
      elements: selectedTheme?.appearance?.elements,
    },
  };

  return (
    <Flex
      width="100%"
      maxW="1200px"
      height="100%"
      minHeight="400px"
      borderRadius="lg"
      bg="white"
      style={{
        fontFamily:
          'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {/* Sidebar */}
      <Box
        width="240px"
        bg="rgb(247, 247, 245)"
        boxShadow="lg"
        padding={"8px"}
        display="flex"
        flexDirection="column"
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex alignItems="center" mb={"4px"}>
          <Text fontSize="14px" fontWeight="bold" color="rgb(55, 53, 47)">
            <Icon
              as={NotionIcon}
              sx={{
                width: "18px",
                height: "18px",
                marginRight: "4px",
                paddingLeft: "4px",
                display: "inline-block",
              }}
            />{" "}
            Notion Workspace
          </Text>
          <IconButton
            aria-label="User Settings"
            icon={<FiChevronDown />}
            variant="ghost"
            size="sm"
          />
        </Flex>

        <VStack align="stretch" spacing={0} mb={"15px"}>
          <SidebarItem icon={FiSearch} label="Search" />
          <SidebarItem icon={FiHome} label="Home" />
          <SidebarItem icon={FiInbox} label="Inbox" isActive />
          <SidebarItem icon={FiSettings} label="Settings & members" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Favorites
        </Text>
        <VStack align="stretch" spacing={2} mb={"15px"}>
          <SidebarItem icon={FiHome} label="Teamspaces" />
          <SidebarItem icon={BsFillFileTextFill} label="Shared" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Private
        </Text>
        <VStack align="stretch" spacing={2} mb={"15px"}>
          <SidebarItem icon={AiOutlineCalendar} label="Calendar" />
          <SidebarItem icon={FaUserFriends} label="Templates" />
          <SidebarItem icon={BsTrash} label="Trash" />
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        bg="white"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          // bg="white"
          height="100%"
          overflowY="auto"
          width="100%"
          maxW="900px"
        >
          <Inbox {...novuConfig}>
            <Notifications
              renderNotification={(notification) => {
                console.log(notification);
                const type = notification.tags?.[0] || "Notification";
                const avatar = notification?.avatar !== undefined;
                const mainFirstName = notification.to.firstName || "Unknown";
                const mainLastName = notification.to.lastName || "User";
                const subject = notification.subject || "No Subject";
                const body = notification.body || "#";
                // const primaryAction = notification?.primaryAction !== undefined;
                // const secondaryAction = notification?.secondaryAction !== undefined;
                const createdAt =
                  notification.createdAt || new Date().toISOString();
                const formattedTime = formatTime(createdAt);

                return (
                  <div>
                    <InboxItem
                      notificationType={type}
                      avatar={notification?.avatar}
                      mainActorName={`${mainFirstName}`}
                      title={subject}
                      pageLink={body}
                      sentTime={formattedTime}
                      isRead={notification.isRead || false}
                      isArchived={notification.isArchived || false}
                      primaryAction={notification.primaryAction?.label}
                      secondaryAction={notification.secondaryAction?.label}
                      primaryActionLabel={notification.primaryAction?.label}
                      secondaryActionLabel={notification.secondaryAction?.label}
                    />
                  </div>
                );
              }}
            />
          </Inbox>
        </Box>
      </Box>
    </Flex>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  external?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  external = false,
}) => {
  return (
    <HStack
      as={external ? Link : Box}
      spacing={3}
      p={2}
      fontWeight={"500"}
      borderRadius="6px"
      bg={isActive ? "rgba(0, 0, 0, 0.03)" : "transparent"}
      color={isActive ? "rgb(29, 27, 22)" : "rgba(55, 53, 47, 0.65)"}
      _hover={{ bg: "rgba(0, 0, 0, 0.03)", cursor: "pointer" }}
      sx={{
        height: "30px",
        padding: "4px 8px",
      }}
    >
      <Icon
        sx={{
          width: "14px",
          height: "14px",
        }}
        as={icon}
      />
      <Text fontSize="14px">{label}</Text>
    </HStack>
  );
};

const InboxItem = ({
  notificationType,
  avatar,
  mainActorName,
  title,
  pageLink,
  sentTime,
  isRead,
  isArchived,
  primaryActionLabel,
  primaryAction,
  secondaryAction,
  secondaryActionLabel,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      p={2}
      ml={3}
      bg="white"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex align="flex-start">
        {/* Conditionally render the avatar box only if there is an avatar */}
        <Box position="relative" width="32px" height="24px" mr={2}>
          {avatar !== undefined && (
            <Avatar
              width="24px"
              height="24px"
              name={mainActorName}
              src={avatar || undefined}
              position="absolute"
              left={"10px"}
            />
          )}
          {!isRead && (
            <Box
              width="8px"
              height="8px"
              bg="blue.500"
              borderRadius="full"
              position="absolute"
              right="32px"
              top="50%"
              transform="translateY(-50%)"
            />
          )}
        </Box>

        {/* Main content with conditional margin based on avatar */}
        <VStack
          align="start"
          spacing={1}
          flex="1"
          ml={avatar !== undefined ? 1 : 0} // Adjust margin-left if no avatar
        >
          <Flex justify="space-between" width="100%">
            <Text fontSize="md" color="gray.800">
              {title}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {sentTime}
            </Text>
          </Flex>
          <Link href={pageLink} isExternal>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<GrDocumentText />}
              _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
              pl={0}
            >
              {pageLink}
            </Button>
          </Link>
          <HStack spacing={3}>
            {primaryAction && (
              <Button
                variant="outline"
                size="sm"
                colorScheme="gray"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  // Action to reply
                }}
              >
                {primaryActionLabel}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                size="sm"
                colorScheme="gray"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  // Action to reply
                }}
              >
                {secondaryActionLabel}
              </Button>
            )}
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

function formatTime(timestamp: any) {
  const date = new Date(timestamp);
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  // Time calculations
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInWeek = secondsInDay * 7;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutes`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hours`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days`;
  } else if (diffInSeconds < secondsInYear) {
    const options: any = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options); // e.g., "Feb 26"
  } else {
    return date.getFullYear().toString(); // e.g., "2022"
  }
}

export default NotionTheme;
