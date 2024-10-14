import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import PlaygroundFormContainer from "../PlaygroundFormContainer";

import { ThemeProvider } from "../../contexts/ThemeContext";
import ThemeRenderer from "../ThemeRender";
import getGithubStars from "@/app/utils/get-github-stars";
import ButtonGithubStars from "../ButtonGithubStars";
import { Suspense } from "react";

const AppContent = async () => {
  // const starsCount = await getGithubStars();

  return (
    <Box height="100vh" bg="#05050B" overflow="hidden">
      <Navbar>
        <Suspense>
          <ButtonGithubStars starsCount={0} />
        </Suspense>
      </Navbar>
      <Flex
        height="calc(100vh - 72px)"
        pl={8}
        pr="72px"
        pt={2.5}
        pb={7}
        alignItems="flex-start"
        gap={4}
      >
        <PlaygroundFormContainer />
        <ThemeRenderer />
      </Flex>
    </Box>
  );
};

const AppContainer = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default AppContainer;
