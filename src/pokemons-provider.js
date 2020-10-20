import React from "react";
import { getPokemons } from "./api";
import { PokemonsContext } from "./pokemons-context";

export default function PokemonsProvider(props) {
  const [loading, setLoading] = React.useState(false);
  const { children } = props;
  const [pokemons, setPokemons] = React.useState(props.pokemons || []);

  React.useEffect(() => {
    async function initPokemons() {
      if (pokemons.length === 0) {
        setLoading(true);
        const pokes = await getPokemons();
        setLoading(false);
        setPokemons(pokes);
      }
    }
    initPokemons();
  }, [pokemons]);

  return (
    <PokemonsContext.Provider value={{ pokemons: pokemons, loading: loading }}>
      {children}
    </PokemonsContext.Provider>
  );
}
