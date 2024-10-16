"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Stack,
  position,
} from "@chakra-ui/react";
import { Inbox } from "@novu/react";

type LocalizationValue =
  | string
  | (({ notificationCount }: { notificationCount: number }) => string);

const englishLocalization = {
  "inbox.status.options.unread": "Unread only",
  "inbox.status.options.unreadRead": "Unread & read",
  "inbox.status.options.archived": "Archived",
  "inbox.status.unread": "Unread",
  "inbox.status.unreadRead": "Inbox",
  "inbox.status.archived": "Archived",
  "inbox.filters.labels.default": "Inbox",
  "notifications.emptyNotice": "No notifications",
  "notifications.actions.readAll": "Mark all as read",
  "notifications.actions.archiveAll": "Archive all",
  "notifications.actions.archiveRead": "Archive read",
  "notifications.newNotifications": ({ notificationCount }: { notificationCount: number }) =>
    `${notificationCount > 99 ? "99+" : notificationCount} new ${
      notificationCount === 1 ? "notification" : "notifications"
    }`,
  "notification.actions.read.toolTip": "Mark as read",
  "notification.actions.unread.toolTip": "Mark as unread",
  "notification.actions.archive.toolTip": "Archive",
  "notification.actions.unarchive.toolTip": "Unarchive",
  "preferences.title": "Notification Preferences",
  "preferences.global": "Global Preferences",
};

type LocalizationKey = keyof typeof englishLocalization;

const localization: Record<string, Record<LocalizationKey, LocalizationValue>> = {
  // English (Default)
  "en-US": englishLocalization,

  // French (fr)
  fr: {
    "inbox.filters.labels.default": "Boîte de réception",
    "inbox.status.options.unread": "Non lus seulement",
    "inbox.status.options.unreadRead": "Non lus et lus",
    "inbox.status.options.archived": "Archivé",
    "inbox.status.unread": "Non lus",
    "inbox.status.unreadRead": "Boîte de réception",
    "inbox.status.archived": "Archivé",
    "notifications.emptyNotice": "Pas de notifications",
    "notifications.actions.readAll": "Tout marquer comme lu",
    "notifications.actions.archiveAll": "Tout archiver",
    "notifications.actions.archiveRead": "Archiver les lus",
    "notifications.newNotifications": ({ notificationCount }: { notificationCount: number }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} ${
        notificationCount === 1 ? "nouvelle notification" : "nouvelles notifications"
      }`,
    "notification.actions.read.toolTip": "Marquer comme lu",
    "notification.actions.unread.toolTip": "Marquer comme non lu",
    "notification.actions.archive.toolTip": "Archiver",
    "notification.actions.unarchive.toolTip": "Désarchiver",
    "preferences.title": "Préférences de notification",
    "preferences.global": "Préférences globales",
  },

  // German (de)
  de: {
    "inbox.filters.labels.default": "Posteingang",
    "inbox.status.options.unread": "Nur ungelesen",
    "inbox.status.options.unreadRead": "Ungelesen & gelesen",
    "inbox.status.options.archived": "Archiviert",
    "inbox.status.unread": "Ungelesen",
    "inbox.status.unreadRead": "Posteingang",
    "inbox.status.archived": "Archiviert",
    "notifications.emptyNotice": "Keine Benachrichtigungen",
    "notifications.actions.readAll": "Alle als gelesen markieren",
    "notifications.actions.archiveAll": "Alle archivieren",
    "notifications.actions.archiveRead": "Gelesenes archivieren",
    "notifications.newNotifications": ({ notificationCount }: { notificationCount: number }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} neue ${
        notificationCount === 1 ? "Benachrichtigung" : "Benachrichtigungen"
      }`,
    "notification.actions.read.toolTip": "Als gelesen markieren",
    "notification.actions.unread.toolTip": "Als ungelesen markieren",
    "notification.actions.archive.toolTip": "Archivieren",
    "notification.actions.unarchive.toolTip": "Wiederherstellen",
    "preferences.title": "Benachrichtigungseinstellungen",
    "preferences.global": "Globale Einstellungen",
  },

  // Japanese (ja)
  ja: {
    "inbox.filters.labels.default": "受信トレイ",
    "inbox.status.options.unread": "未読のみ",
    "inbox.status.options.unreadRead": "未読と既読",
    "inbox.status.options.archived": "アーカイブ済み",
    "inbox.status.unread": "未読",
    "inbox.status.unreadRead": "受信トレイ",
    "inbox.status.archived": "アーカイブ済み",
    "notifications.emptyNotice": "通知はありません",
    "notifications.actions.readAll": "すべて既読にする",
    "notifications.actions.archiveAll": "すべてアーカイブ",
    "notifications.actions.archiveRead": "既読をアーカイブ",
    "notifications.newNotifications": ({ notificationCount }: { notificationCount: number }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} 件の${
        notificationCount === 1 ? "新しい通知" : "新しい通知"
      }`,
    "notification.actions.read.toolTip": "既読にする",
    "notification.actions.unread.toolTip": "未読にする",
    "notification.actions.archive.toolTip": "アーカイブ",
    "notification.actions.unarchive.toolTip": "アーカイブ解除",
    "preferences.title": "通知の設定",
    "preferences.global": "グローバル設定",
  },

  // Russian (ru)
  ru: {
    "inbox.filters.labels.default": "Входящие",
    "inbox.status.options.unread": "Только непрочитанные",
    "inbox.status.options.unreadRead": "Непрочитанные и прочитанные",
    "inbox.status.options.archived": "В архиве",
    "inbox.status.unread": "Непрочитанные",
    "inbox.status.unreadRead": "Входящие",
    "inbox.status.archived": "В архиве",
    "notifications.emptyNotice": "Нет уведомлений",
    "notifications.actions.readAll": "Отметить все как прочитанное",
    "notifications.actions.archiveAll": "Архивировать все",
    "notifications.actions.archiveRead": "Архивировать прочитанное",
    "notifications.newNotifications": ({ notificationCount }: { notificationCount: number }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} новых ${
        notificationCount === 1 ? "уведомление" : "уведомлений"
      }`,
    "notification.actions.read.toolTip": "Отметить как прочитанное",
    "notification.actions.unread.toolTip": "Отметить как непрочитанное",
    "notification.actions.archive.toolTip": "Архивировать",
    "notification.actions.unarchive.toolTip": "Разархивировать",
    "preferences.title": "Настройки уведомлений",
    "preferences.global": "Глобальные настройки",
  },
};

const typedLocalization: Record<string, Record<LocalizationKey, any>> = localization;

const CustomTheme = ({ subscriberId }: { subscriberId: string | null }) => {
  const novuConfig: any = {
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID,
    subscriberId: subscriberId,
  };

  const { inboxThemeForm, selectedTheme } = useTheme();
  const formValues = inboxThemeForm.watch();

  const appearanceVariables = {
    open: formValues.open,
    language: formValues.language,
    colorPrimary: formValues.colorPrimary,
    colorPrimaryForeground: formValues.colorPrimaryForeground,
    colorSecondary: formValues.colorSecondary,
    colorSecondaryForeground: formValues.colorSecondaryForeground,
    colorCounter: formValues.colorCounter,
    colorCounterForeground: formValues.colorCounterForeground,
    colorBackground: formValues.colorBackground,
    colorForeground: formValues.colorForeground,
    colorNeutral: formValues.colorNeutral,
    fontSize: formValues.fontSize,
    borderRadius: formValues.borderRadius,
  };

  return (
    <Flex
      width="100%"
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
              position="relative"
            >
              Acme
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Flex
            justify="flex-end"
            align="center"
            width="100%"
            maxW="600px"
            minW="300px"
            height="30%"
          >
            {/* Inbox Component */}
            {subscriberId && (
              <Inbox
                open={appearanceVariables.open === true ? true : undefined}
                applicationIdentifier={novuConfig.applicationIdentifier}
                subscriberId={novuConfig.subscriberId}
                localization={
                  typedLocalization[
                    appearanceVariables.language as keyof typeof typedLocalization
                  ] || typedLocalization["en-US"]
                }
                appearance={{
                  variables: appearanceVariables,
                  elements: {
                    bellIcon: {
                      height: "30px",
                      width: "30px",
                    },
                    popoverContent: {
                      marginTop: "15px !important",
                      marginLeft: "-6.5% !important",
                    },
                    ...selectedTheme?.appearance?.elements,
                  },
                }}
              />
            )}
          </Flex>
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
