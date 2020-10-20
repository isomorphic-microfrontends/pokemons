import React from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import Pokemons from "./components/pokemons";
import PokemonsProvider from "./pokemons-provider";
import { createTheme, generateClassName } from "./theme";

export default function Root(props) {
  const [darkMode, setDarkMode] = React.useState(true);
  const theme = React.useMemo(() => createTheme(darkMode), [darkMode]);

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side-pokemons");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    window.addEventListener("mode-event", handleThemeEvent);
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
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <PokemonsProvider pokemons={props.pokemons}>
          <Pokemons />
        </PokemonsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}
