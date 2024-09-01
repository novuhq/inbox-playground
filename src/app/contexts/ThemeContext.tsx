"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotionIcon } from "../components/icons/Notion";
import { LinearIcon } from "../components/icons/Linear";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

export interface Workflow {
  id: string;
  title: string;
  data?: Record<string, unknown>;
}

export interface Theme {
  id: string;
  title: string;
  icon: JSX.Element | null;
  workflows: Workflow[];
  appearance: {
    variables: Record<string, unknown>;
    elements: Record<string, unknown>;
  };
}

const themes: Theme[] = [
  {
    id: "notion",
    title: "Notion",
    icon: <NotionIcon />,
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
    workflows: [
      {
        id: "notion-comment-notification",
        title: "Comment",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} commented in`,
          inAppBody: "Important Page", //page name
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
        },
      },
      {
        id: "notion-invite-notification",
        title: "Invite",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} invited you to a page`, //Main notification text (subject)
          inAppBody: "Happy Hour Planning", //page name
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Accept",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
        },
      },
      {
        id: "notion-mention-notification",
        title: "Mention",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} mentioned you in`, //Main notification text (subject)
          inAppBody: "Very Intresting Project", //page name
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
        },
      },
      {
        id: "notion-suggestion-notification",
        title: "Suggestion",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} suggested in`, //Main notification text (subject)
          inAppBody: "Top Secret Project", //page name
          enablePrimaryAction: false,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
        },
      },
    ],
  },
  {
    id: "custom",
    title: "Custom",
    icon: null,
    workflows: [{ id: "custom-workflow", title: "Custom Workflow" }],
    appearance: {
      variables: {},
      elements: {},
    },
  },
];

interface NotificationFormState {
  subscriberFirstName: string;
  subscriberLastName: string;
  inAppSubject: string;
  inAppBody: string;
  inAppAvatar: string;
  showInAppAvatar: boolean | string;
  inAppPrimaryActionLabel: string;
  enablePrimaryAction: boolean | string;
  inAppPrimaryActionUrl: string;
  inAppSecondaryActionLabel: string;
  enableSecondaryAction: boolean | string;
  inAppSecondaryActionUrl: string;
  selectedWorkflow: string;
}

interface ThemeContextType {
  themes: Theme[];
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  inboxThemeForm: UseFormReturn<any>;
  notificationForm: UseFormReturn<NotificationFormState>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const inboxThemeForm = useForm({
    defaultValues: {
      open: false,
      language: "en",
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
  });

  const notificationForm = useForm<NotificationFormState>({
    defaultValues: {
      subscriberFirstName: "",
      subscriberLastName: "",
      inAppSubject: "",
      inAppBody: "",
      inAppAvatar: "",
      showInAppAvatar: false,
      inAppPrimaryActionLabel: "",
      enablePrimaryAction: false,
      inAppPrimaryActionUrl: "",
      inAppSecondaryActionLabel: "",
      enableSecondaryAction: false,
      inAppSecondaryActionUrl: "",
      selectedWorkflow: themes[0].workflows[0].id,
    },
  });

  const value: ThemeContextType = {
    themes,
    selectedTheme,
    setSelectedTheme,
    inboxThemeForm,
    notificationForm,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
