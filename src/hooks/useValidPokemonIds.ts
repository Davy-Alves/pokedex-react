import { useRef, useState, useEffect } from "react"
import { fetchValidPokemonIds } from "../services/pokeApi"

export function useValidPokemonIds() {
  const validIdsRef = useRef<number[]>([])
  const validIdsSetRef = useRef<Set<number>>(new Set())
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    fetchValidPokemonIds()
      .then((ids) => {
        validIdsRef.current = ids
        validIdsSetRef.current = new Set(ids)
        setIsReady(true)
      })
      .catch((error) => console.log(error))
  }, [])

  const isValidId = (id: number) => validIdsSetRef.current.has(id)

  const findNextValidId = (fromId: number) => {
    return validIdsRef.current.find((id) => id >= fromId) ?? null
  }

  const findPreviousValidId = (fromId: number) => {
    const reversed = [...validIdsRef.current].reverse()
    return reversed.find((id) => id <= fromId) ?? null
  }

  return { isReady, isValidId, findNextValidId, findPreviousValidId }
}