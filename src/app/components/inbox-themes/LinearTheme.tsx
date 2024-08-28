import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  background,
  Avatar,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiHome,
  FiInbox,
  FiSettings,
  FiChevronDown,
  FiFilter,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { BsFillFileTextFill, BsTrash, BsArrowRepeat } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { Inbox, Notifications } from "@novu/react";
import { formatDistanceToNow } from "date-fns";
import { color } from "framer-motion";
import { LinearIcon } from "../icons/Linear";
import { TbFilePencil } from "react-icons/tb";
import { SlPencil } from "react-icons/sl";

export const novuConfig = {
  applicationIdentifier:
    process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID || "QldXz8WKHsiP",
  subscriberId: "66ab924daa4218d126f9ba68",
  appearance: {
    variables: {
      colorPrimary: "#0081F1",
      colorPrimaryForeground: "white",
      colorSecondary: "#F3F3F3",
      colorSecondaryForeground: "#1A1523",
      colorCounter: "#E5484D",
      colorCounterForeground: "white",
      colorBackground: "#FCFCFC",
      colorForeground: "#1A1523",
      colorNeutral: "black",
      fontSize: "inherit",
      borderRadius: "0.375rem",
    },
    elements: {
      inboxStatus__title: {
        color: "rgb(255, 255, 255)",
        fontSize: "13px",
      },
      inboxHeader: {
        paddingLeft: "0px",
        paddingTop: "7px",
        paddingBottom: "7px",
      },
      notificationImage: {
        borderRadius: "50%",
        width: "24px",
        height: "24px",
      },
      notificationList: {},
      notification: {
        // ...notificationStyles,
      },

      notificationPrimaryAction__button: {
        // cursor: "pointer",
        // display: "inline-flex",
        // alignItems: "center",
        // whiteSpace: "nowrap",
        // height: "26px",
        // borderRadius: "4px",
        // fontSize: "12px",
        // lineHeight: "1.2",
        // paddingLeft: "8px",
        // paddingRight: "8px",
        // // color: "#FFFFFF", // Dark text color
        // boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
        // fontWeight: "500",
        // backgroundColor: "#EDEEF3", // Light gray button background
        // "&:hover": {
        //     backgroundColor: "#475BA1", // Hover background color (blue)
        // },
      },
    },
  },
};

const LinearTheme = () => {
  return (
    <Flex
      width="100%"
      maxW="1200px"
      height="100%"
      minHeight="400px"
      borderRadius="lg"
      bg="#080808"
      color="rgb(226, 227, 229)"
      style={{
        fontFamily:
          '"Inter UI", "SF Pro Display", -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serifui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {/* Sidebar */}
      <Box
        width="207px"
        boxShadow="lg"
        padding={"0 14px"}
        display="flex"
        flexDirection="column"
        borderRight="1px solid"
        borderColor={"#26282d"}
      >
        <Flex
          alignItems="center"
          justifyContent={"space-between"}
          mb={"8px"}
          paddingLeft="4px"
        >
          <Text fontSize="14px" fontWeight="bold">
            <Icon
              as={LinearIcon}
              sx={{
                width: "18px",
                height: "18px",
                marginRight: "4px",
                display: "inline-block",
                color: "rgb(94, 105, 209)",
                "& path": {
                  fill: "rgb(94, 105, 209)",
                },
              }}
            />{" "}
            Linear
          </Text>

          <IconButton
            color="white"
            aria-label="Create"
            icon={<SlPencil />}
            variant="ghost"
            size="sm"
          />
        </Flex>

        <VStack align="stretch" spacing={0} mb={"15px"}>
          <SidebarItem icon={FiInbox} label="Inbox" isActive />

          <SidebarItem icon={FiSearch} label="My Issues" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="rgb(148, 148, 150)" mb={2}>
          Workspace
        </Text>
        <VStack align="stretch" spacing={0} mb={"15px"}>
          <SidebarItem icon={FiHome} label="Initiatives" />
          <SidebarItem icon={BsFillFileTextFill} label="Projects" />
          <SidebarItem icon={BsFillFileTextFill} label="Views" />
          <SidebarItem icon={BsFillFileTextFill} label="Teams" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="rgb(148, 148, 150)" mb={2}>
          Favorites
        </Text>
        <VStack align="stretch" spacing={0} mb={"15px"}>
          <SidebarItem icon={AiOutlineCalendar} label="Security" />
          <SidebarItem icon={FaUserFriends} label="Planning" />
          <SidebarItem icon={BsTrash} label="Bugs" />
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box height="100%" overflowY="auto" width="100%" maxW="900px">
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
      p={0}
      fontWeight={"500"}
      borderRadius="6px"
      bg={isActive ? "#1c1f25" : "transparent"}
      color={isActive ? "rgb(226, 227, 229)" : "rgb(226, 227, 229)"}
      _hover={{ bg: "rgba(0, 0, 0, 0.03)", cursor: "pointer" }}
      sx={{
        height: "30px",
        padding: "4px 0px",
        lineHeight: "28px",
      }}
    >
      <Icon
        sx={{
          width: "14px",
          height: "14px",
        }}
        as={icon}
      />
      <Text fontSize="13px">{label}</Text>
    </HStack>
  );
};

// Inbox Item Component
const InboxItem = ({
  title,
  subtitle,
  days,
  avatar,
  assigned,
  overdue,
  completed,
  icon,
  badgeColor,
}: any) => {
  return (
    <Flex
      p={3}
      align="center"
      bg={completed ? "transparent" : "blue.600"}
      _hover={{ bg: "blue.600" }}
      borderRadius="md"
    >
      <Avatar size="sm" name={assigned} src={avatar} />
      <VStack align="start" spacing={0} ml={3} flex="1">
        <HStack spacing={2}>
          {icon && <Icon as={icon} color={badgeColor} />}
          <Text fontWeight="bold" fontSize="sm" color="gray.100">
            {title}
          </Text>
        </HStack>
        <Text fontSize="xs" color="gray.400">
          {subtitle}
        </Text>
      </VStack>
      <Flex align="center">
        {overdue && <Icon as={FiXCircle} color="red.400" />}
        {completed && <Icon as={FiCheckCircle} color="blue.400" />}
        <Text fontSize="xs" color="gray.400" ml={2}>
          {days}
        </Text>
        <Icon as={BsArrowRepeat} color="orange.400" ml={2} />
      </Flex>
    </Flex>
  );
};

export default LinearTheme;
