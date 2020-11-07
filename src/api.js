export async function getPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
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

export async function getPokeman(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    pokeman.img = img;
    return pokeman;
  } catch (err) {
    console.error(err);
  }
}
