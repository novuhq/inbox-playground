// theme/index.ts
import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";

const FormField = defineStyleConfig({
  baseStyle: {
    field: {
      color: "white",
      borderRadius: "8px",
      height: "40px",
    },
  },
  sizes: {
    md: {
      field: {
        height: "40px",
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: "#30385A",
        bg: "rgba(34, 41, 66, 0.40)",
        _hover: {
          borderColor: "gray.30",
        },
        _focus: {
          borderColor: "gray.20",
          boxShadow: "0 0 0 1px var(--chakra-colors-gray-20)",
        },
        _placeholder: {
          color: "#636C81",
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

const theme = extendTheme({
  fonts: {
    heading: "Brother-1816, sans-serif",
    body: "Brother-1816, sans-serif",
  },
  colors: {
    gray: {
      8: "#999999",
      10: "#525266",
      20: "#8C8CAA",
      30: "#9CA3AF",
    },
    blue: {
      3: "#4B73EC",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "white",
        fontWeight: "medium",
      },
    },
    Text: {
      baseStyle: {
        color: "white",
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.8",
          _checked: {
            bg: "blue.3",
          },
        },
      },
    },
    Button: {
      variants: {
        white: {
          background: "white",
          color: "black",
          borderRadius: "4px",
          transition: "opacity 0.2s",
          _hover: {
            opacity: 0.8,
          },
        },
        "white-outline": {
          background: "transparent",
          color: "white",
          borderRadius: "4px",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          transition: "background color 0.2s",
          _hover: {
            background: "white",
            color: "black",
          },
        },
        "gray-outline": {
          background: "transparent",
          color: "white",
          borderRadius: "4px",
          border: "1px solid #4d4d4d",
          transition: "background color borderColor 0.2s",
          _hover: {
            background: "#333",
            color: "white",
            border: "1px solid #333",
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    Input: FormField,
    Select: FormField,
    Textarea: {
      baseStyle: {
        color: "white",
        borderRadius: "8px",
      },
      sizes: {
        md: {
          minHeight: "80px",
          py: "2",
          px: "3",
        },
      },
      variants: {
        outline: {
          borderColor: "#30385A",
          bg: "rgba(34, 41, 66, 0.40)",
          _hover: {
            borderColor: "gray.30",
          },
          _focus: {
            borderColor: "gray.20",
            boxShadow: "0 0 0 1px var(--chakra-colors-gray-20)",
          },
          _placeholder: {
            color: "#636C81",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "outline",
      },
    },
  },
});

export default theme;
