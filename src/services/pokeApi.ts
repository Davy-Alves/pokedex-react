export const fetchPokemon = async (pokemon: string | number) => {
  const query = pokemon.toString().toLocaleLowerCase().trim();

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!APIResponse.ok) {
    throw new Error("Pokemon nao encontrado");
  }

  const data = await APIResponse.json();

  return data;
};
