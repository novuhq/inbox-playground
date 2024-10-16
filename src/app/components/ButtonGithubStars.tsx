"use client";

import { Button } from "@chakra-ui/react";
import { usePlausible } from "next-plausible";
import NextLink from "next/link";
import { GitHubIcon } from "./icons/GitHub";

const ButtonGithubStars = ({ starsCount }: { starsCount: number }) => {
  const plausible = usePlausible();
  return (
    <Button
      className="flex items-center group"
      as={NextLink}
      variant="gray-outline"
      href="https://github.com/novuhq/novu"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => plausible("github_star", { props: { type: "menu" } })}
      fontSize="12px"
      fontWeight="medium"
      lineHeight="100%"
      textTransform="uppercase"
    >
      <GitHubIcon className="mr-2 h-[26px] w-[26px]" />
      <span>Star us</span>
      <span
        className="flex items-center before:mx-2.5 before:h-[18px] before:w-px before:bg-[#333] before:transition-colors before:duration-200 group-hover:before:bg-[#4d4d4d]"
        aria-label={`${starsCount} stars on Github`}
      >
        {`${(starsCount / 1000).toFixed(1)}k`}
      </span>
    </Button>
  );
};

export default ButtonGithubStars;
