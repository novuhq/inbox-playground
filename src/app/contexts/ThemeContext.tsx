"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotionIcon } from "../components/icons/Notion";
import { LinearIcon } from "../components/icons/Linear";
import { HackerNewsIcon } from "../components/icons/HackerNews";
import { useForm, UseFormReturn } from "react-hook-form";

export interface Workflow {
  id: string;
  title: string;
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
    workflows: [{ id: "1", title: "Workflow 1" }],
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

interface ThemeContextType {
  themes: Theme[];
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  inboxThemeForm: UseFormReturn;
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

  const value = {
    themes,
    selectedTheme,
    setSelectedTheme,
    inboxThemeForm,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
