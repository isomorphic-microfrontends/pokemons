import React from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import PokeDetailView from "./poke-detail-view";
import PokeListView from "./poke-list-view";
import PokeFooter from "./poke-footer";
import usePokemons from "../use-pokemons";
const isBrowser = () => typeof window !== "undefined";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(90vh - 2px)",
    position: "relative"
  }
}));

const PokeView = () => {
  const classes = useStyles();
  const { loading } = usePokemons();
  return (
    <div className={classes.root}>
      {loading && <LinearProgress color="secondary" />}
      {!loading && <div style={{ height: "4px" }} />}
      <Container>
        <Switch>
          <Route exact path="/">
            <PokeListView />
          </Route>
          <Route path="/:id/:name">
            <PokeDetailView />
          </Route>
        </Switch>
      </Container>
      <PokeFooter />
    </div>
  );
};

export default function Pokemons() {
  if (isBrowser()) {
    return (
      <BrowserRouter basename="/pokemons">
        <PokeView />
      </BrowserRouter>
    );
  }
  return (
    <StaticRouter basename="/pokemons">
      <PokeView />
    </StaticRouter>
  );
}
