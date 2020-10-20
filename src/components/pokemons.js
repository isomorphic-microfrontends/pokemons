import React from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";
import PokeDetailView from "./poke-detail-view";
import PokeListView from "./poke-list-view";
const isBrowser = () => typeof window !== "undefined";

const PokeView = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <PokeListView />
        </Route>
        <Route path="/:id/:name">
          <PokeDetailView />
        </Route>
      </Switch>
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
