import React from "react";
import {
  StylesProvider,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PokeList from "./components/poke-list";
import { CssBaseline } from "@material-ui/core";

const createTheme = darkMode =>
  createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });
export default function Root(props) {
  const theme = React.useMemo(() => createTheme(true), []);
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side-pokemons");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <PokeList />
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
}
