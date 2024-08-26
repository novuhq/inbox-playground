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
  background,
} from "@chakra-ui/react";
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
import { AiOutlineCalendar } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { Inbox, Notifications } from "@novu/react";

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
        "&:hover": {
          backgroundColor: "red", // Hover background color
        },
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
        width="250px"
        bg="#faf9f7"
        boxShadow="lg"
        padding={4}
        display="flex"
        flexDirection="column"
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Notion Workspace
          </Text>
          <IconButton
            aria-label="User Settings"
            icon={<FiChevronDown />}
            variant="ghost"
            size="sm"
          />
        </Flex>

        <VStack align="stretch" spacing={2} mb={8}>
          <SidebarItem icon={FiSearch} label="Search" />
          <SidebarItem icon={FiHome} label="Home" />
          <SidebarItem icon={FiInbox} label="Inbox" isActive />
          <SidebarItem icon={FiSettings} label="Settings & members" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Favorites
        </Text>
        <VStack align="stretch" spacing={2} mb={8}>
          <SidebarItem icon={FiHome} label="Teamspaces" />
          <SidebarItem icon={BsFillFileTextFill} label="Shared" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Private
        </Text>
        <VStack align="stretch" spacing={2} mb={8}>
          <SidebarItem icon={AiOutlineCalendar} label="Calendar" external />
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
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" margin={4}>
            Inbox
          </Text>
          <IconButton
            aria-label="Filter notifications"
            icon={<FiFilter />}
            variant="ghost"
            size="sm"
            margin={4}
          />
        </Flex>
        <Box
          // bg="white"
          height="100%"
          overflowY="auto"
          width="100%"
          maxW="900px"
        >
          <Inbox {...novuConfig}>
            <Notifications />
          </Inbox>
        </Box>
      </Box>
    </Flex>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isActive, external }) => {
  return (
    <HStack
      as={external ? Link : Box}
      spacing={3}
      p={2}
      borderRadius="md"
      bg={isActive ? "gray.200" : "transparent"}
      color={isActive ? "black" : "gray.600"}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
    >
      <Icon as={icon} />
      <Text fontSize="sm">{label}</Text>
    </HStack>
  );
};

export default NotionTheme;
