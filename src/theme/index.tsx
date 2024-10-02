// theme/index.ts
import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from '@chakra-ui/react';

const FormField = defineStyleConfig({
  baseStyle: {
    field: {
      color: "gray.10",
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
        borderColor: "#BEBECC",
        _hover: {
          borderColor: "gray.30",
        },
        _focus: {
          borderColor: "gray.20",
          boxShadow: "0 0 0 1px var(--chakra-colors-gray-20)",
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
  colors: {
    gray: {
      10: '#525266',
      20: '#8C8CAA',
      30: '#9CA3AF',
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'gray.10',
      },
    },
    Switch: {
      baseStyle: {
        track: {
          _checked: {
            bg: 'transparent',
            bgImage: 'linear-gradient(90deg, #DF2672 0%, #FD4F32 100%)',
          },
        },
      },
    },
    Button: {
      variants: {
        'gradient-outline': {
          bg: 'transparent',
          _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'md',
            padding: '1px',
            background: 'linear-gradient(90deg, #DE2574, #FD4F32)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            transition: 'background 0.2s',
          },
          _hover: {
            _before: {
              background: 'linear-gradient(45deg, #FFC371, #FF5F6D)',
            },
          },
        },
        'gradient-solid': {
          position: 'relative',
          color: 'white',
          borderRadius: '11px',
          transition: 'all 0.2s',
          isolation: 'isolate',
          _before: {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(90deg, #DE2574, #FD4F32)',
            zIndex: -1,
            transition: 'opacity 0.2s',
          },
          _hover: {
            _before: {
              opacity: 0.8,
            },
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.10',
      },
    },
    Input: FormField,
    Select: FormField,
    Textarea: {
      baseStyle: {
        color: "gray.10",
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
          borderColor: "#BEBECC",
          _hover: {
            borderColor: "gray.30",
          },
          _focus: {
            borderColor: "gray.20",
            boxShadow: "0 0 0 1px var(--chakra-colors-gray-20)",
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
