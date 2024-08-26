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
import { NotionIcon } from "../icons/Notion";

export const novuConfig: any = {
  applicationIdentifier: "QldXz8WKHsiP",
  subscriberId: "66ab924daa4218d126f9ba68_notion",
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
            <Notifications />
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

export default NotionTheme;
