"use client";
import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "./components/layout/AppContainer";
import theme from "@/theme";

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <AppContainer />
    </ChakraProvider>
  );
}
