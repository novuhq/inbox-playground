import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Brother-1816';
        src: url('/fonts/brother-1816/brother-1816-light.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: 'Brother-1816';
        src: url('/fonts/brother-1816/brother-1816-book.woff2') format('woff2');
        font-weight: 350;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: 'Brother-1816';
        src: url('/fonts/brother-1816/brother-1816-regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: 'Brother-1816';
        src: url('/fonts/brother-1816/brother-1816-medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: fallback;
      }
    `}
  />
);

export default Fonts;
