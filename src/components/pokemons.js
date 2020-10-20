import React from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import PokeDetailView from "./poke-detail-view";
import PokeListView from "./poke-list-view";
import usePokemons from "../use-pokemons";
const isBrowser = () => typeof window !== "undefined";

const PokeView = () => {
  const { loading } = usePokemons();
  return (
    <>
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
    </>
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
