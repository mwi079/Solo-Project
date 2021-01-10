import { extendTheme } from "@chakra-ui/react";

const colors = extendTheme({
  primary: {
    100: "#03045eff",
    200: "#023e8aff",
    300: "#0077b6ff",
    400: "#0096c7ff",
    500: "#e9c46a",
    600: "#48cae4ff",
    700: "#90e0efff",
    800: "#ade8f4ff",
    900: "#caf0f8ff",
  },
  button: {
    500: "#EDAE49",
  },
  dark: {
    500: "#FFBA08",
  },
});

export default colors;
