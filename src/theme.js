import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";

export const createTheme = darkMode =>
  createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });

export const generateClassName = createGenerateClassName({
  productionPrefix: "pk-"
  // seed: "pk-"
});
