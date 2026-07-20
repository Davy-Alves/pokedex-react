export const fetchPokemon = async (pokemon: string | number) => {
  const query = pokemon.toString().toLocaleLowerCase().trim();

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!APIResponse.ok) {
    throw new Error("Pokemon nao encontrado");
  }

  const data = await APIResponse.json();

  return data;
};

export const fetchPokemonList = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar lista de Pokemon");
  }

  const data = await response.json();
  return data.results;
};
