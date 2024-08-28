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
}

const themes: Theme[] = [
  {
    id: "notion",
    title: "Notion",
    icon: <NotionIcon />,
    workflows: [
      {
        id: "notion-comment-notification",
        title: "Comment",
        data: {
          inAppSubject: `{{subscriber.firstName}} {{subscriber.lastName}} commented in`,
          inAppBody: "Hello world",
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
        },
      },
      {
        id: "notion-comment-2",
        title: "Another workflow",
        data: {
          inAppSubject: `Hi`,
          inAppBody: "Hello worldasda",
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
        },
      },
    ],
  },
  {
    id: "linear",
    title: "Linear",
    icon: <LinearIcon />,
    workflows: [
      { id: "1", title: "Mention in a Comment" },
      { id: "2", title: "Project Updates" },
      { id: "3", title: "Status Change" },
    ],
  },
  {
    id: "custom",
    title: "Custom",
    icon: null,
    workflows: [{ id: "1", title: "Workflow 1" }],
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
