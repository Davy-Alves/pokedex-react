import { useState, useEffect, useRef } from "react"
import { fetchPokemonList, fetchPokemonBatch } from "../services/pokeApi"

const BATCH_SIZE = 60

interface GridPokemon {
  id: number
  name: string
  sprite: string
  animatedSprite: string
  types: string[]
}

export function usePokemonGrid() {
  const [gridPokemons, setGridPokemons] = useState<GridPokemon[]>([])
  const [isLoadingGrid, setIsLoadingGrid] = useState(false)
  const allNamesRef = useRef<string[]>([])
  const nextIndexRef = useRef(0)
  const hasLoadedInitial = useRef(false)

  const loadMore = async () => {
    setIsLoadingGrid(true)

    const startIndex = nextIndexRef.current
    const namesToFetch = allNamesRef.current.slice(startIndex, startIndex + BATCH_SIZE)
    nextIndexRef.current = startIndex + BATCH_SIZE

    if (namesToFetch.length === 0) {
      setIsLoadingGrid(false)
      return
    }

    try {
      const newPokemons = await fetchPokemonBatch(namesToFetch)
      setGridPokemons((previous) => [...previous, ...newPokemons])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingGrid(false)
    }
  }

  useEffect(() => {
    if (hasLoadedInitial.current) return
    hasLoadedInitial.current = true

    fetchPokemonList()
      .then((results) => {
        const names = results.map((pokemon: { name: string }) => pokemon.name)
        allNamesRef.current = names
        loadMore()
      })
      .catch((error) => console.log(error))
  }, [])

  return { gridPokemons, isLoadingGrid, loadMore }
}