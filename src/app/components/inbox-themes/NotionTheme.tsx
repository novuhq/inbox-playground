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

export const novuConfig: any = {
  applicationIdentifier: "QldXz8WKHsiP",
  subscriberId: "66ab924daa4218d126f9ba68",
  appearance: {
    variables: {},
    elements: {
      notificationCustomActions: {
        marginTop: "8px",
      },
      notificationImage: {
        borderRadius: "50%",
        width: "24px",
        height: "24px",
      },
      notificationArchive__button: {
        width: "24px",
        height: "24px",
        borderRadius: "4px",
      },
      notificationDefaultActions: {
        gap: "0",
        backgroundColor: "white",
        borderRadius: "6px",
        border: "1px solid rgba(22, 29, 27, 0.02)",
      },
      notificationUnread__button: {
        width: "24px",
        height: "24px",
        borderRadius: "4px",
      },
      notificationPrimaryAction__button: {
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        height: "26px",
        borderRadius: "4px",
        fontSize: "12px",
        lineHeight: "1.2",
        paddingLeft: "8px",
        paddingRight: "8px",
        color: "rgb(55, 53, 47)",
        border: "1px solid rgba(15, 15, 15, 0.1)",
        fontWeight: "500",
        backgroundColor: "#ffffff", // Default background color
      },
    },
  },
};

const NotionTheme = () => {
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
                const mainAvatar =
                  notification.avatar ||
                  notification.to.firstName?.charAt(0).toUpperCase() ||
                  "A";
                const mainFirstName = notification.to.firstName || "Unknown";
                const mainLastName = notification.to.lastName || "User";
                const subject = notification.subject || "No Subject";
                const body = notification.body || "#";
                const replyAction = notification.primaryAction !== undefined;
                const createdAt =
                  notification.createdAt || new Date().toISOString();
                const formattedTime = formatTime(createdAt);

                return (
                  <div>
                    <InboxItem
                      notificationType={type}
                      mainActorAvatar={mainAvatar}
                      mainActorName={`${mainFirstName} ${mainLastName}`}
                      title={subject}
                      pageLink={body}
                      sentTime={formattedTime}
                      isRead={notification.isRead || false}
                      isArchived={notification.isArchived || false}
                      replyAction={replyAction}
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
  mainActorAvatar,
  mainActorName,
  title,
  pageLink,
  sentTime,
  isRead,
  isArchived,
  replyAction,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const dynamicTitle = () => {
    const boldName = (
      <Text as="span" fontWeight="bold">
        {mainActorName}
      </Text>
    );

    switch (notificationType) {
      case "Invite":
        return <>{boldName} invited you to a page</>;
      case "Comment":
        return <>{boldName} commented in</>;
      case "Mention":
        return <>{boldName} mentioned you in</>;
      case "Suggestion":
        return <>{boldName} suggested in</>;
      default:
        return title;
    }
  };

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
        <Box position="relative" width="32px" height="24px" mr={2}>
          <Avatar
            width="24px"
            height="24px"
            name={mainActorAvatar}
            src={mainActorAvatar}
            position="absolute"
            left={"10px"}
          />
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
        <VStack align="start" spacing={1} flex="1" ml={1}>
          <Flex justify="space-between" width="100%">
            <Text fontSize="md" color="gray.800">
              {dynamicTitle()}
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
          {replyAction && (
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
              Reply
            </Button>
          )}
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
