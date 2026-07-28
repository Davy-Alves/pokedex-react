import { fetchByUrl } from "../services/pokeApi"
import { extractSprite } from "../utils/spriteExtractors"

export interface EvolutionDetail {
  method: string
  detail: string
}

export interface EvolutionStage {
  id: number
  name: string
  sprite: string
  trigger: EvolutionDetail | null
  megaForms?: { id: number; name: string; sprite: string }[]
}

const formatTrigger = (details: any[]): EvolutionDetail | null => {
  if (!details || details.length === 0) return null
  const d = details[0]

  if (d.min_level) return { method: "level", detail: `Lv. ${d.min_level}` }
  if (d.item) return { method: "item", detail: d.item.name.replace(/-/g, " ") }
  if (d.min_happiness) return { method: "friendship", detail: "Friendship" }
  if (d.trigger?.name === "trade")
    return {
      method: "trade",
      detail: d.held_item ? `Trade (${d.held_item.name.replace(/-/g, " ")})` : "Trade",
    }
  if (d.known_move) return { method: "move", detail: d.known_move.name.replace(/-/g, " ") }
  if (d.time_of_day) return { method: "time", detail: `${d.time_of_day} time` }
  return { method: "other", detail: "Special" }
}

const extractEvolutions = (
  node: any
): { name: string; url: string; trigger: EvolutionDetail | null }[] => {
  let evos: { name: string; url: string; trigger: EvolutionDetail | null }[] = [
    { name: node.species.name, url: node.species.url, trigger: null },
  ]

  if (node.evolves_to.length > 0) {
    node.evolves_to.forEach((child: any) => {
      const trigger = formatTrigger(child.evolution_details)
      const childEvos = extractEvolutions(child).map((evo, i) =>
        i === 0 ? { ...evo, trigger } : evo
      )
      evos = evos.concat(childEvos)
    })
  }

  return evos
}

const specialFormKeywords = [
  "mega", "primal", "gmax", "origin", "crowned", "eternamax",
  "therian", "ultra", "complete", "dusk", "dawn", "resolute", "blade", "hero"
]

const hasSpecialFormKeyword = (varietyName: string) => {
  const segments = varietyName.split("-")
  return specialFormKeywords.some((keyword) => segments.includes(keyword))
}

export async function fetchEvolutionChain(
  evolutionChainUrl: string,
  currentPokemonName: string
): Promise<EvolutionStage[]> {
  const evoChainData = await fetchByUrl(evolutionChainUrl)
  const flatEvos = extractEvolutions(evoChainData.chain)

  const regionalSuffixes = ["-alola", "-galar", "-hisui", "-paldea"]
  const currentRegionalSuffix = regionalSuffixes.find((suffix) =>
    currentPokemonName.includes(suffix)
  )

  const stageResults = await Promise.allSettled(
    flatEvos.map(async (evo): Promise<EvolutionStage> => {
      const stageSpeciesData = await fetchByUrl(evo.url)

      const regionalVariety = currentRegionalSuffix
        ? stageSpeciesData.varieties.find((v: any) =>
            v.pokemon.name.includes(currentRegionalSuffix)
          )
        : null

      const defaultVariety =
        regionalVariety ||
        stageSpeciesData.varieties.find((v: any) => v.is_default) ||
        stageSpeciesData.varieties[0]

      const stagePokemonData = await fetchByUrl(defaultVariety.pokemon.url)

      const megaVarieties = stageSpeciesData.varieties.filter((v: any) =>
        hasSpecialFormKeyword(v.pokemon.name)
      )

      const megaResults = await Promise.allSettled(
        megaVarieties.map(async (v: any) => {
          const data = await fetchByUrl(v.pokemon.url)
          return { id: data.id, name: v.pokemon.name, sprite: extractSprite(data) }
        })
      )

      const megaForms = megaResults
        .filter((r) => r.status === "fulfilled")
        .map((r) => (r as PromiseFulfilledResult<any>).value)

      return {
        id: stagePokemonData.id,
        name: evo.name,
        sprite: extractSprite(stagePokemonData),
        trigger: evo.trigger,
        megaForms: megaForms.length > 0 ? megaForms : undefined,
      }
    })
  )

  return stageResults
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<EvolutionStage>).value)
}