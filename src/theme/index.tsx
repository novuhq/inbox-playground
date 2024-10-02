// theme/index.ts
import { extendTheme } from "@chakra-ui/react";

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
          bg: 'linear-gradient(90deg, #DE2574, #FD4F32)',
          color: 'white',
          borderRadius: '11px',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: "gray.10",
          _placeholder: {
            color: 'gray.30',
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.10',
      },
    },
    Textarea: {
      baseStyle: {
        color: 'gray.10',
        _placeholder: {
          color: 'gray.30',
        },
      },
    },
  },
});

export default theme;
