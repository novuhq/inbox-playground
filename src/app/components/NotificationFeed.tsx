"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Inbox } from "@novu/react";

function getLocalStorageItem(key: string, defaultValue: string = ""): string {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key) || defaultValue;
  }

  return defaultValue;
}

const localSubscriberId = getLocalStorageItem("inbox_demo_subscriberId");

const localInboxDesign = {
  colorPrimary: getLocalStorageItem("inbox_demo_colorPrimary", "#0081F1"),
  colorPrimaryForeground: getLocalStorageItem(
    "inbox_demo_colorPrimaryForeground",
    "white"
  ),
  colorSecondary: getLocalStorageItem("inbox_demo_colorSecondary", "#F3F3F3"),
  colorSecondaryForeground: getLocalStorageItem(
    "inbox_demo_colorSecondaryForeground",
    "#1A1523"
  ),
  colorCounter: getLocalStorageItem("inbox_demo_colorCounter", "#E5484D"),
  colorCounterForeground: getLocalStorageItem(
    "inbox_demo_colorCounterForeground",
    "white"
  ),
  colorBackground: getLocalStorageItem("inbox_demo_colorBackground", "#FCFCFC"),
  colorForeground: getLocalStorageItem("inbox_demo_colorForeground", "#1A1523"),
  colorNeutral: getLocalStorageItem("inbox_demo_colorNeutral", "black"),
  fontSize: getLocalStorageItem("inbox_demo_fontSize", "inherit"),
  borderRadius: getLocalStorageItem("inbox_demo_borderRadius", "0.375rem"),
};

const localLocale = getLocalStorageItem("inbox_demo_language", "en");

// Localization object containing translations for multiple languages
const localization = {
  // English (Default)
  "en-US": {
    "inbox.status.options.unread": "Unread only",
    "inbox.status.options.unreadRead": "Unread & read",
    "inbox.status.options.archived": "Archived",
    "inbox.status.unread": "Unread",
    "inbox.status.unreadRead": "Inbox",
    "inbox.status.archived": "Archived",
    "notifications.emptyNotice": "No notifications",
    "notifications.actions.readAll": "Mark all as read",
    "notifications.actions.archiveAll": "Archive all",
    "notifications.actions.archiveRead": "Archive read",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} new ${
        notificationCount === 1 ? "notification" : "notifications"
      }`,
    "notification.actions.read.toolTip": "Mark as read",
    "notification.actions.unread.toolTip": "Mark as unread",
    "notification.actions.archive.toolTip": "Archive",
    "notification.actions.unarchive.toolTip": "Unarchive",
    "preferences.title": "Notification Preferences",
    "preferences.global": "Global Preferences",
  },

  // Spanish (es)
  es: {
    "inbox.status.options.unread": "Solo no leídos",
    "inbox.status.options.unreadRead": "No leídos y leídos",
    "inbox.status.options.archived": "Archivado",
    "inbox.status.unread": "No leídos",
    "inbox.status.unreadRead": "Bandeja de entrada",
    "inbox.status.archived": "Archivado",
    "notifications.emptyNotice": "No hay notificaciones",
    "notifications.actions.readAll": "Marcar todo como leído",
    "notifications.actions.archiveAll": "Archivar todo",
    "notifications.actions.archiveRead": "Archivar leídos",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} ${
        notificationCount === 1 ? "nueva notificación" : "nuevas notificaciones"
      }`,
    "notification.actions.read.toolTip": "Marcar como leído",
    "notification.actions.unread.toolTip": "Marcar como no leído",
    "notification.actions.archive.toolTip": "Archivar",
    "notification.actions.unarchive.toolTip": "Desarchivar",
    "preferences.title": "Preferencias de notificaciones",
    "preferences.global": "Preferencias globales",
  },

  // French (fr)
  fr: {
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
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} ${
        notificationCount === 1
          ? "nouvelle notification"
          : "nouvelles notifications"
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
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
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

  // Chinese (Simplified) (zh-CN)
  "zh-CN": {
    "inbox.status.options.unread": "仅未读",
    "inbox.status.options.unreadRead": "未读和��读",
    "inbox.status.options.archived": "已归档",
    "inbox.status.unread": "未读",
    "inbox.status.unreadRead": "收件箱",
    "inbox.status.archived": "已归档",
    "notifications.emptyNotice": "没有通知",
    "notifications.actions.readAll": "全部标记为已读",
    "notifications.actions.archiveAll": "全部归档",
    "notifications.actions.archiveRead": "归档已读",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} 条${
        notificationCount === 1 ? "新通知" : "新通知"
      }`,
    "notification.actions.read.toolTip": "标记为已读",
    "notification.actions.unread.toolTip": "标记为未读",
    "notification.actions.archive.toolTip": "归档",
    "notification.actions.unarchive.toolTip": "取消归档",
    "preferences.title": "通知偏好",
    "preferences.global": "全局偏好",
  },

  // Japanese (ja)
  ja: {
    "inbox.status.options.unread": "未読のみ",
    "inbox.status.options.unreadRead": "未読と既読",
    "inbox.status.options.archived": "アーカイブ済み",
    "inbox.status.unread": "未読",
    "inbox.status.unreadRead": "受信ト���イ",
    "inbox.status.archived": "アーカイブ済み",
    "notifications.emptyNotice": "通知はありません",
    "notifications.actions.readAll": "すべて既読にする",
    "notifications.actions.archiveAll": "すべてアーカイブ",
    "notifications.actions.archiveRead": "既読をアーカイブ",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
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

  // Korean (ko)
  ko: {
    "inbox.status.options.unread": "읽지 않음만",
    "inbox.status.options.unreadRead": "읽지 않음 및 읽음",
    "inbox.status.options.archived": "보관됨",
    "inbox.status.unread": "읽지 않음",
    "inbox.status.unreadRead": "받은 편지함",
    "inbox.status.archived": "보관됨",
    "notifications.emptyNotice": "알림이 없습니다",
    "notifications.actions.readAll": "모두 읽음으로 표시",
    "notifications.actions.archiveAll": "모두 보관",
    "notifications.actions.archiveRead": "읽은 것 보관",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} 개의 ${
        notificationCount === 1 ? "새 알림" : "새 알림"
      }`,
    "notification.actions.read.toolTip": "읽음으로 표시",
    "notification.actions.unread.toolTip": "읽지 않음으로 표시",
    "notification.actions.archive.toolTip": "보관",
    "notification.actions.unarchive.toolTip": "보관 취소",
    "preferences.title": "알림 설정",
    "preferences.global": "전역 설정",
  },

  // Russian (ru)
  ru: {
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
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
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

  // Portuguese (pt)
  pt: {
    "inbox.status.options.unread": "Apenas não lidos",
    "inbox.status.options.unreadRead": "Não lidos e lidos",
    "inbox.status.options.archived": "Arquivados",
    "inbox.status.unread": "Não lidos",
    "inbox.status.unreadRead": "Caixa de entrada",
    "inbox.status.archived": "Arquivados",
    "notifications.emptyNotice": "Nenhuma notificação",
    "notifications.actions.readAll": "Marcar tudo como lido",
    "notifications.actions.archiveAll": "Arquivar tudo",
    "notifications.actions.archiveRead": "Arquivar lidos",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} ${
        notificationCount === 1 ? "nova notificação" : "novas notificações"
      }`,
    "notification.actions.read.toolTip": "Marcar como lido",
    "notification.actions.unread.toolTip": "Marcar como não lido",
    "notification.actions.archive.toolTip": "Arquivar",
    "notification.actions.unarchive.toolTip": "Desarquivar",
    "preferences.title": "Preferências de Notificação",
    "preferences.global": "Preferências Globais",
  },

  // Italian (it)
  it: {
    "inbox.status.options.unread": "Solo non letti",
    "inbox.status.options.unreadRead": "Non letti e letti",
    "inbox.status.options.archived": "Archiviati",
    "inbox.status.unread": "Non letti",
    "inbox.status.unreadRead": "Posta in arrivo",
    "inbox.status.archived": "Archiviati",
    "notifications.emptyNotice": "Nessuna notifica",
    "notifications.actions.readAll": "Segna tutto come letto",
    "notifications.actions.archiveAll": "Archivia tutto",
    "notifications.actions.archiveRead": "Archivia letti",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} nuove ${
        notificationCount === 1 ? "notifica" : "notifiche"
      }`,
    "notification.actions.read.toolTip": "Segna come letto",
    "notification.actions.unread.toolTip": "Segna come non letto",
    "notification.actions.archive.toolTip": "Archivia",
    "notification.actions.unarchive.toolTip": "Annulla archiviazione",
    "preferences.title": "Preferenze di Notifica",
    "preferences.global": "Preferenze Globali",
  },

  // Hindi (hi)
  hi: {
    "inbox.status.options.unread": "केवल अपठित",
    "inbox.status.options.unreadRead": "अपठित और पढ़े हुए",
    "inbox.status.options.archived": "संग्रहित",
    "inbox.status.unread": "अपठित",
    "inbox.status.unreadRead": "इनबॉक्स",
    "inbox.status.archived": "संग्रहित",
    "notifications.emptyNotice": "कोई सूचनाएं नहीं",
    "notifications.actions.readAll": "सभी को पढ़ा हुआ चिह्नित करें",
    "notifications.actions.archiveAll": "सभी को संग्रहित करें",
    "notifications.actions.archiveRead": "पढ़ा हुआ संग्रहित करें",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} नई ${
        notificationCount === 1 ? "सूचना" : "सूचनाएं"
      }`,
    "notification.actions.read.toolTip": "पढ़ा हुआ चिह्नित करें",
    "notification.actions.unread.toolTip": "अपठित चिह्नित करें",
    "notification.actions.archive.toolTip": "संग्रहित करें",
    "notification.actions.unarchive.toolTip": "संग्रहण रद्द करें",
    "preferences.title": "सूचना प्राथमिकताएँ",
    "preferences.global": "वैश्विक प्राथमिकताएँ",
  },
};

// Merge the selected locale translations into novuConfig
export const novuConfig = {
  applicationIdentifier: process.env.NEXT_PUBLIC_APPLICATION_IDENTIFIER!,
  subscriberId: localSubscriberId!,
  localization:
    localization[localLocale as keyof typeof localization] ||
    localization["en-US"], // Fallback to English if locale not found
  ...(getLocalStorageItem("inbox_demo_open") === "true" && { open: true }),
  appearance: {
    variables: {
      ...localInboxDesign,
    },
    elements: {
      bellContainer: {
        color: "",
        width: "30px",
        height: "30px",
      },
      bellIcon: {
        width: "30px",
        height: "30px",
      },
      bellDot: {
        width: "10px",
        height: "10px",
      },
      inbox__popoverContent: {
        width: "59%",
        marginLeft: "-45px",
      },
      popoverContent: {},
      notification: {},
      notificationList: {},
    },
  },
};

const NotificationFeed = () => {
  return (
    <Box
      flex="1" // Takes up the remaining width
      borderWidth="1px"
      borderRadius="lg"
      padding={6}
      boxShadow="lg"
      bg="white"
      height="100%" // Ensure the feed takes full height
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Notifications
        </Text>
        <Box>
          <Inbox {...novuConfig} />
        </Box>
      </Flex>
    </Box>
  );
};

export default NotificationFeed;
