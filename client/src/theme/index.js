import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";

const customTheme = extendTheme({
  colors,
  fonts: {
    heading: "Courier Prime, monospace",
    body: "Montserrat, sans-serif",
  },
});

export default customTheme;
