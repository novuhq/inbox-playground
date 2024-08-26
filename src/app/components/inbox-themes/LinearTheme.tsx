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
} from "@chakra-ui/react";
import {
    FiSearch,
    FiHome,
    FiInbox,
    FiSettings,
    FiChevronDown,
    FiFilter,
} from "react-icons/fi";
import { BsFillFileTextFill, BsTrash } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { Inbox, Notifications } from "@novu/react";

export const novuConfig = {
    applicationIdentifier: "QldXz8WKHsiP",
    subscriberId: "66ab924daa4218d126f9ba68",
    appearance: {
        variables: {},
        elements: {
            notificationImage: {
                borderRadius: "50%",
                width: "24px",
                height: "24px",
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
                color: "#44494D", // Dark text color
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
                fontWeight: "500",
                backgroundColor: "#EDEEF3", // Light gray button background
                "&:hover": {
                    backgroundColor: "#475BA1", // Hover background color (blue)
                },
            },
        },
    }
};

const LinearTheme = () => {
    return (
        <Flex
            width="100%"
            maxW="1200px"
            height="100%"
            minHeight="400px"
            borderRadius="lg"
            bg="#FFFFFF" // White background
        >
            {/* Sidebar */}
            <Box
                width="250px"
                bg="#44494D" // Dark gray sidebar background
                boxShadow="lg"
                color="#EDEEF3" // Light gray text color
                padding={4}
                display="flex"
                flexDirection="column"
                borderRight="1px solid"
                borderColor={useColorModeValue("#EDEEF3", "#44494D")}
            >
                <Flex alignItems="center" justifyContent="space-between" mb={4}>
                    <Text fontSize="lg" fontWeight="bold" color="#FFFFFF">
                        Novu Workspace
                    </Text>
                    <IconButton
                        aria-label="User Settings"
                        icon={<FiChevronDown />}
                        variant="ghost"
                        size="sm"
                        color="#EDEEF3"
                    />
                </Flex>

                <VStack align="stretch" spacing={2} mb={8}>
                    <SidebarItem icon={FiSearch} label="Search" />
                    <SidebarItem icon={FiHome} label="Home" />
                    <SidebarItem icon={FiInbox} label="Inbox" isActive />
                    <SidebarItem icon={FiSettings} label="Settings & members" />
                </VStack>

                <Text fontSize="xs" fontWeight="bold" color="#EDEEF3" mb={2}>
                    Workspace
                </Text>
                <VStack align="stretch" spacing={2} mb={8}>
                    <SidebarItem icon={FiHome} label="Teamspaces" />
                    <SidebarItem icon={BsFillFileTextFill} label="Shared" />
                </VStack>

                <Text fontSize="xs" fontWeight="bold" color="#EDEEF3" mb={2}>
                    Favorites
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
                // padding={2}
                bg="#FFFFFF" // White background
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                color="#44494D" // Dark gray text color
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="#44494D"
                        margin={4}
                    >
                        Inbox
                    </Text>
                    <IconButton
                        aria-label="Filter notifications"
                        icon={<FiFilter />}
                        variant="ghost"
                        size="sm"
                        color="#44494D"
                        margin={4}
                    />
                </Flex>
                <Box
                    // bg="#EDEEF3" // Light gray background for notification area
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
            bg={isActive ? "#475BA1" : "transparent"} // Active item background (blue)
            color={isActive ? "#FFFFFF" : "#EDEEF3"} // Active item text color
            _hover={{ bg: "#475BA1", cursor: "pointer" }} // Hover background color (blue)
        >
            <Icon as={icon} />
            <Text fontSize="sm">{label}</Text>
        </HStack>
    );
};

export default LinearTheme;
