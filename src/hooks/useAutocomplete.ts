import { useState, useEffect } from "react"
import { fetchPokemonList } from "../services/pokeApi"

export function useAutocomplete(
  setInputValue: (value: string) => void
) {
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([])
  const [suggestionsNames, setSuggestionsNames] = useState<string[]>([])

  useEffect(() => {
    fetchPokemonList()
      .then((results) => {
        const names = results.map((pokemon: { name: string }) => pokemon.name)
        setAllPokemonNames(names)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (value.trim() === "") {
      setSuggestionsNames([])
      return
    }

    const filtered = allPokemonNames.filter((name) =>
      name.startsWith(value.toLocaleLowerCase())
    )

    setSuggestionsNames(filtered.slice(0, 30))
  }

  return { suggestionsNames, setSuggestionsNames, handleInputChange }
}