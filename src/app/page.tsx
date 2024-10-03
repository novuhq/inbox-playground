"use client";
// insert css reset to ensure all components are styled correctly https://chakra-ui.vercel.app/getting-started#injecting-global-styles
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AppContainer from "./components/layout/AppContainer";
import theme from "@/theme";

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset/>
      <AppContainer />
    </ChakraProvider>
  );
}
