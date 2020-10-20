import React from "react";
import { PokemonsContext } from "./pokemons-context";

const usePokemons = () => {
  const { pokemons, loading } = React.useContext(PokemonsContext);

  return { pokemons, loading };
};

export default usePokemons;
