import { useState, useEffect } from "react"

export function useShiny(pokemonId: number | null) {
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    setIsShiny(false)
  }, [pokemonId])

  const toggleShiny = () => {
    setIsShiny(!isShiny)
  }

  return { isShiny, toggleShiny }
}