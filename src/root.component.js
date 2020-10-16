import React from "react";
import {
  StylesProvider,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PokeList from "./components/poke-list";
import { CssBaseline } from "@material-ui/core";
import { getPokemons } from "./api";

const createTheme = darkMode =>
  createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });
export default function Root(props) {
  const [pokemons, setPokemons] = React.useState(props.pokemons || []);
  const [darkMode, setDarkMode] = React.useState(true);
  const theme = React.useMemo(() => createTheme(darkMode), [darkMode]);
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side-pokemons");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    window.addEventListener("mode-event", handleThemeEvent);

    async function initPokemons() {
      if (pokemons.length === 0) {
        const pokes = await getPokemons();
        setPokemons(pokes);
      }
    }
    initPokemons();
    return () => {
      window.removeEventListener("mode-event", handleThemeEvent);
    };
  }, []);

  const handleThemeEvent = e => {
    if (typeof e.detail !== "undefined") {
      setDarkMode(e.detail);
    }
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <PokeList pokemons={pokemons} />
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
}
