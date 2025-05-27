"use client";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@/theme";
import Fonts from "./fonts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Fonts />
      {children}
    </ChakraProvider>
  );
}
