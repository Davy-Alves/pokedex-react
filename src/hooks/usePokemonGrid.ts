import { useState, useEffect, useRef } from "react"
import { fetchPokemonBatch } from "../services/pokeApi"

const BATCH_SIZE = 60

interface GridPokemon {
  id: number
  name: string
  sprite: string
  animatedSprite: string
  shinySprite: string
  animatedShinySprite: string
  types: string[]
}

export function usePokemonGrid(filteredNames: string[]) {
  const [gridPokemons, setGridPokemons] = useState<GridPokemon[]>([])
  const [isLoadingGrid, setIsLoadingGrid] = useState(false)
  
  const nextIndexRef = useRef(0)

  const loadMore = async () => {
    if (isLoadingGrid) return;
    
    setIsLoadingGrid(true)

    const startIndex = nextIndexRef.current
    
    const namesToFetch = filteredNames.slice(startIndex, startIndex + BATCH_SIZE)
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
    setGridPokemons([])
    nextIndexRef.current = 0
    
    if (filteredNames.length > 0) {
      loadMore()
    }
  }, [filteredNames])

  return { gridPokemons, isLoadingGrid, loadMore }
}