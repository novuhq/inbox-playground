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
  border,
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
import { root } from "postcss";
import { color } from "framer-motion";

const NotionTheme = () => {
  const { subscriberId } = useSubscriber();
  const { selectedTheme } = useTheme();

  const novuConfig: any = {
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID,
    subscriberId: subscriberId,
    open: true,
    appearance: {
      variables: {
        colorPrimary: '#efefed',
        colorPrimaryForeground: 'white',
        colorSecondary: '#efefed',
        colorSecondaryForeground: '#1A1523',
        colorCounter: '#E5484D',
        colorCounterForeground: 'white',
        colorBackground: '#f5f5f4',
        colorForeground: '#1A1523',
        colorNeutral: 'black',
        fontSize: 'inherit',
        borderRadius: '0.375rem',
      },
      elements: {
        bellContainer: {
          display: 'none'
        },
        preferences__button: {
          display: 'none'
        },
        popoverContent: {
          width: '100%', // Relative width for responsiveness
          maxWidth: '680px', // Maximum width for larger screens
          minWidth: '300px', // Minimum width to prevent too small popover
          height: '100%', // Let the height adjust based on content
          maxHeight: '694px', // Maximum height relative to viewport
          borderRadius: '0px', // Rounded corners
          overflow: 'auto', // Allows scrolling for overflow content
          boxShadow: "10px 0 15px -3px rgb(0 0 0 / 0.1), 4px 0 6px -4px rgb(0 0 0 / 0.1);",
          backgroundColor: '#fff', // Background color
          marginTop: '-64px', // Spacing from the top
          marginLeft: '-32px', // Spacing from the left
          fontSize: '14px', // Font size
          fontWeight: '500',
        },
        notificationImage: {
          borderRadius: '50%',
          width: '24px',
          height: '24px',
        },
        notificationDot: {
          marginTop: '2px',
          backgroundColor: '#0081F1',
        },
        notificationSubject: {
          color: 'black',
          fontSize: '14px',
          fontWeight: '600',
        },
        notificationBody: {
        },

        notificationPrimaryAction__button: {
          variant: 'outline',
          paddingLeft: '8px',
          paddingRight: '8px',
          height: '26px',
          borderRadius: '4px',
          border: '0.5px solid #dfdfdf', // Adding the border line
          fontWeight: '500',
          backgroundColor: 'transparent',
          color: "black",
          fontSize: '14px',
        },
        notificationSecondaryAction__button: {
          variant: 'outline',
          paddingLeft: '8px',
          paddingRight: '8px',
          height: '26px',
          borderRadius: '4px',
          border: '0.5px solid #dfdfdf', // Adding the border line
          fontWeight: '500',
          backgroundColor: 'transparent',
          color: "black",
          fontSize: '14px',
        },
      },
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
        width={{ base: '100%', md: '240px' }}
        bg="rgb(247, 247, 245)"
        boxShadow="lg"
        padding={"8px"}
        display="flex"
        flexDirection="column"
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
        p={{ base: 4, md: 8 }} // Responsive padding
      >
        <Box
          // bg="white"
          height="100%"
          overflowY="auto"
          width="100%"
          maxW="900px"
        >
          <Inbox {...novuConfig} />

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

// const InboxItem = ({
//   notificationType,
//   avatar,
//   mainActorName,
//   title,
//   pageLink,
//   sentTime,
//   isRead,
//   isArchived,
//   primaryActionLabel,
//   primaryAction,
//   secondaryAction,
//   secondaryActionLabel,
// }: any) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Box
//       p={2}
//       ml={3}
//       bg="white"
//       position="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Flex align="flex-start">
//         {/* Conditionally render the avatar box only if there is an avatar */}
//         <Box position="relative" width="32px" height="24px" mr={2}>
//           {avatar !== undefined && (
//             <Avatar
//               width="24px"
//               height="24px"
//               name={mainActorName}
//               src={avatar || undefined}
//               position="absolute"
//               left={"10px"}
//             />
//           )}
//           {!isRead && (
//             <Box
//               width="8px"
//               height="8px"
//               bg="blue.500"
//               borderRadius="full"
//               position="absolute"
//               right="32px"
//               top="50%"
//               transform="translateY(-50%)"
//             />
//           )}
//         </Box>

//         {/* Main content with conditional margin based on avatar */}
//         <VStack
//           align="start"
//           spacing={1}
//           flex="1"
//           ml={avatar !== undefined ? 1 : 0} // Adjust margin-left if no avatar
//         >
//           <Flex justify="space-between" width="100%">
//             <Text fontSize="md" color="gray.800">
//               {title}
//             </Text>
//             <Text fontSize="xs" color="gray.400">
//               {sentTime}
//             </Text>
//           </Flex>
//           <Link href={pageLink} isExternal>
//             <Button
//               variant="ghost"
//               size="sm"
//               leftIcon={<GrDocumentText />}
//               _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
//               pl={0}
//             >
//               {pageLink}
//             </Button>
//           </Link>
//           <HStack spacing={3}>
//             {primaryAction && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 colorScheme="gray"
//                 borderRadius="md"
//                 borderColor="gray.300"
//                 _hover={{ bg: "gray.100" }}
//                 onClick={() => {
//                   // Action to reply
//                 }}
//               >
//                 {primaryActionLabel}
//               </Button>
//             )}
//             {secondaryAction && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 colorScheme="gray"
//                 borderRadius="md"
//                 borderColor="gray.300"
//                 _hover={{ bg: "gray.100" }}
//                 onClick={() => {
//                   // Action to reply
//                 }}
//               >
//                 {secondaryActionLabel}
//               </Button>
//             )}
//           </HStack>
//         </VStack>
//       </Flex>
//     </Box>
//   );
// };

// function formatTime(timestamp: any) {
//   const date = new Date(timestamp);
//   const now = new Date().getTime();
//   const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

//   // Time calculations
//   const secondsInMinute = 60;
//   const secondsInHour = secondsInMinute * 60;
//   const secondsInDay = secondsInHour * 24;
//   const secondsInWeek = secondsInDay * 7;
//   const secondsInYear = secondsInDay * 365;

//   if (diffInSeconds < secondsInMinute) {
//     return `${diffInSeconds} seconds`;
//   } else if (diffInSeconds < secondsInHour) {
//     const minutes = Math.floor(diffInSeconds / secondsInMinute);
//     return `${minutes} minutes`;
//   } else if (diffInSeconds < secondsInDay) {
//     const hours = Math.floor(diffInSeconds / secondsInHour);
//     return `${hours} hours`;
//   } else if (diffInSeconds < secondsInWeek) {
//     const days = Math.floor(diffInSeconds / secondsInDay);
//     return `${days} days`;
//   } else if (diffInSeconds < secondsInYear) {
//     const options: any = { month: "short", day: "numeric" };
//     return date.toLocaleDateString(undefined, options); // e.g., "Feb 26"
//   } else {
//     return date.getFullYear().toString(); // e.g., "2022"
//   }
// }

export default NotionTheme;
