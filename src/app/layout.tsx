import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inbox Component Playground | Novu",
  description:
    "Example application to show in-app notifications powered by Novu",
  icons: {
    icon: "/novuIcon.svg", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KXMC4XP2" />
      <body>{children}</body>
    </html>
  );
}
