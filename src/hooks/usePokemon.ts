import { useState, useEffect } from "react"
import { fetchPokemon } from "../services/pokeApi"

const INITIAL_POKEMON = 1

export function usePokemon() {
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonId, setPokemonId] = useState<number | null>(null)
  const [pokemonSprite, setPokemonSprite] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentId, setCurrentId] = useState(INITIAL_POKEMON)
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [pokemonShinySprite, setPokemonShinySprite] = useState("")

  const renderPokemon = async (pokemon: string | number) => {
    setIsLoading(true)

    try {
      const data = await fetchPokemon(pokemon)
      setPokemonName(data.name)
      setPokemonId(data.id)
      setCurrentId(data.id)
      setPokemonSprite(data.sprites.versions['generation-v']['black-white'].animated.front_default)
      setPokemonShinySprite(data.sprites.versions['generation-v']['black-white'].animated.front_shiny)
      setPokemonTypes(data.types.map((typeInfo: any) => (typeInfo.type.name)))
    } catch (error) {
      setPokemonName("Not found :(")
      setPokemonId(null)
      setPokemonSprite("")
      setPokemonTypes([])
      setPokemonShinySprite("")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonPrev = () => {
    if (currentId > 1) {
      const newId = currentId - 1
      setCurrentId(newId)
      renderPokemon(newId)
    }
  }

  const buttonNext = () => {
    const newId = currentId + 1
    setCurrentId(newId)
    renderPokemon(newId)
  }

  useEffect(() => {
    renderPokemon(INITIAL_POKEMON)
  }, [])

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
  }
}