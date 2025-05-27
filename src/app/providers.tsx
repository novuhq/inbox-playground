"use client";

import dynamic from "next/dynamic";
import { CSSReset } from "@chakra-ui/react";
import theme from "@/theme";
import Fonts from "./fonts";

const ChakraProvider = dynamic(() => import("@chakra-ui/react").then((mod) => mod.ChakraProvider), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Fonts />
      {children}
    </ChakraProvider>
  );
}
