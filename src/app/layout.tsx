import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Inbox Component Playground | Novu",
  description: "Example application to show in-app notifications powered by Novu",
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
      <head>
        <PlausibleProvider domain="inbox.novu.co/" />
      </head>
      <GoogleTagManager gtmId="GTM-KXMC4XP2" />
      <body>{children}</body>
    </html>
  );
}
