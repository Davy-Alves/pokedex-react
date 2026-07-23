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

export const fetchPokemonBatch = async (idsOrNames: (string | number)[]) => {
  const promises = idsOrNames.map((idOrName) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`).then((res) => {
      if (!res.ok) throw new Error(`Pokemon ${idOrName} nao encontrado`);
      return res.json();
    })
  );

  const results = await Promise.allSettled(promises);

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => {
      const data = (result as PromiseFulfilledResult<any>).value;
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        animatedSprite: data.sprites.versions['generation-v']['black-white'].animated.front_default || data.sprites.front_default,
        types: data.types.map((typeInfo: any) => typeInfo.type.name),
      };
    });
};

export const fetchValidPokemonIds = async () => {
  const results = await fetchPokemonList()

  const ids = results.map((pokemon: { url: string }) => {
    const parts = pokemon.url.split("/").filter(Boolean)
    return Number(parts[parts.length - 1])
  })

  return ids.sort((a: number, b: number) => a - b)
}