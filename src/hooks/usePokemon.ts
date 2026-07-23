import { useState, useEffect, useRef } from "react";
import { fetchPokemon, fetchValidPokemonIds } from "../services/pokeApi";

const INITIAL_POKEMON = 1;

export function usePokemon() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(INITIAL_POKEMON);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonShinySprite, setPokemonShinySprite] = useState("");
  const [notice, setNotice] = useState("");

  const validIdsRef = useRef<number[]>([]);

  const findNextValidId = (fromId: number) => {
    return validIdsRef.current.find((id) => id >= fromId) ?? null;
  };

  const renderPokemon = async (pokemon: string | number, isRetry = false) => {
    setIsLoading(true);
    if (!isRetry) {
      setNotice("");
    }

    try {
      const data = await fetchPokemon(pokemon);
      setPokemonName(data.name);
      setPokemonId(data.id);
      setCurrentId(data.id);
      setPokemonSprite(
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default || data.sprites.front_default,
      );
      setPokemonShinySprite(
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_shiny || data.sprites.front_shiny,
      );
      setPokemonTypes(data.types.map((typeInfo: any) => typeInfo.type.name));
    } catch (error) {
      const requestedNumber = Number(pokemon);

      if (!isNaN(requestedNumber) && validIdsRef.current.length > 0) {
        const nextValidId = findNextValidId(requestedNumber);

        if (nextValidId !== null) {
          setNotice(
            `Pokémon #${requestedNumber} não existe. Mostrando o próximo disponível: #${nextValidId}`,
          );
          renderPokemon(nextValidId, true);
          return;
        }
      }

      setPokemonName("Not found :(");
      setPokemonId(null);
      setPokemonSprite("");
      setPokemonTypes([]);
      setPokemonShinySprite("");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const findPreviousValidId = (fromId: number) => {
    const reversed = [...validIdsRef.current].reverse();
    return reversed.find((id) => id <= fromId) ?? null;
  };

  const buttonPrev = () => {
    const newId = findPreviousValidId(currentId - 1);
    if (newId !== null) {
      setCurrentId(newId);
      renderPokemon(newId);
    }
  };

  const buttonNext = () => {
    const newId = currentId + 1;
    setCurrentId(newId);
    renderPokemon(newId);
  };

  useEffect(() => {
    fetchValidPokemonIds()
      .then((ids) => {
        validIdsRef.current = ids;
      })
      .catch((error) => console.log(error));

    renderPokemon(INITIAL_POKEMON);
  }, []);

  return {
    pokemonName,
    pokemonId,
    pokemonSprite,
    pokemonShinySprite,
    isLoading,
    pokemonTypes,
    renderPokemon,
    buttonPrev,
    buttonNext,
    notice,
  };
}
