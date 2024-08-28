import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Popover,
  Stack,
} from "@chakra-ui/react";

import { Inbox, Notifications } from "@novu/react";

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

const CustomTheme = () => {
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
      {/* Main Content Area */}
      <Box width="100%">
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              display="block"
              lineHeight={"40px"}
              fontWeight={"bold"}
              color={useColorModeValue("gray.800", "white")}
            >
              Acme
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            mt={"5px"}
          >
            <Inbox {...novuConfig} />
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

const NAV_ITEMS: Array<any> = [
  {
    label: "Home",
  },
  {
    label: "Tasks",
  },
  {
    label: "Items",
  },
  {
    label: "Settings",
  },
];

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} display="flex" alignItems="center">
          <Box
            as="a"
            p={2}
            href={navItem.href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            lineHeight="18px"
            display="block"
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
export default CustomTheme;
