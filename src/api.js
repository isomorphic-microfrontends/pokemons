import fetch from "unfetch";

export async function getPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const { results } = await res.json();
    const pokemons = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, img };
    });
    return pokemons;
  } catch (err) {
    console.error(err);
  }
}
