import { useState, useEffect } from "react"
import { fetchPokemon, fetchByUrl } from "../services/pokeApi"
import { extractSprite, extractShinySprite } from "../utils/spriteExtractors"
import { fetchEvolutionChain } from "./evolutionChain"
import type { EvolutionStage } from "./evolutionChain"
import { getRegionFromGeneration } from "../utils/regionMap"

export type { EvolutionStage, EvolutionDetail } from "./evolutionChain"

export interface PokemonDetails {
  id: number
  name: string
  speciesName: string
  sprite: string
  shinySprite: string
  height: number
  weight: number
  types: string[]
  stats: { name: string; value: number }[]
  abilities: string[]
  flavorText: string
  color: string
  generation: string
  region: string
  baseExp: number
  captureRate: number
  evolutions: EvolutionStage[]
  cryUrl: string | null
  isLegendary: boolean
  isMythical: boolean
  isBaby: boolean
  genderRate: number
  eggGroups: string[]
  growthRate: string
}

export function usePokemonDetails(id: number | null) {
  const [details, setDetails] = useState<PokemonDetails | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!id) {
      setDetails(null)
      setHasError(false)
      return
    }

    async function fetchDetails() {
      setIsLoadingDetails(true)
      setHasError(false)

      try {
        const pokemonData = await fetchPokemon(id as number)
        const speciesData = await fetchByUrl(pokemonData.species.url)

        const englishFlavorText = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        )?.flavor_text.replace(/[\n\f\r]/g, " ") || "Description not available."

        const englishGenera = speciesData.genera.find(
          (entry: any) => entry.language.name === "en"
        )?.genus || "Unknown Pokémon"

        const genParts = speciesData.generation.name.split("-")
        const formattedGen = `Gen ${genParts[1] ? genParts[1].toUpperCase() : ""}`

        const cryUrl = pokemonData.cries?.latest || pokemonData.cries?.legacy || null

        const evolutions = await fetchEvolutionChain(
          speciesData.evolution_chain.url,
          pokemonData.name
        )

        const mappedDetails: PokemonDetails = {
          id: pokemonData.id,
          name: pokemonData.name,
          speciesName: englishGenera,
          sprite: extractSprite(pokemonData),
          shinySprite: extractShinySprite(pokemonData),
          height: pokemonData.height / 10,
          weight: pokemonData.weight / 10,
          types: pokemonData.types.map((t: any) => t.type.name),
          stats: pokemonData.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat
          })),
          abilities: pokemonData.abilities.map((a: any) => a.ability.name),
          flavorText: englishFlavorText,
          color: speciesData.color.name,
          generation: formattedGen,
          region: getRegionFromGeneration(speciesData.generation.name),
          baseExp: pokemonData.base_experience,
          captureRate: speciesData.capture_rate,
          evolutions,
          cryUrl,
          isLegendary: speciesData.is_legendary,
          isMythical: speciesData.is_mythical,
          isBaby: speciesData.is_baby,
          genderRate: speciesData.gender_rate,
          eggGroups: speciesData.egg_groups.map((g: any) => g.name),
          growthRate: speciesData.growth_rate.name,
        }

        setDetails(mappedDetails)
      } catch (err) {
        console.error("Erro ao buscar detalhes", err)
        setDetails(null)
        setHasError(true)
      } finally {
        setIsLoadingDetails(false)
      }
    }

    fetchDetails()
  }, [id])

  return { details, isLoadingDetails, hasError }
}