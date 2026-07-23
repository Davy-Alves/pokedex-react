import { useState } from "react"
import { usePokemonGrid } from "../hooks/usePokemonGrid"
import PokemonCard from "./PokemonCard"

export default function GridCatalog() {
  const { gridPokemons, isLoadingGrid, loadMore } = usePokemonGrid()
  const [activeCardId, setActiveCardId] = useState<number | null>(null)

  return (
    <div className="w-full px-[5%] pt-8 sm:pt-12 pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 2xl:gap-8">
        {gridPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.sprite}
            animatedSprite={pokemon.animatedSprite}
            types={pokemon.types}
            isActive={pokemon.id === activeCardId}
            onActivate={() => setActiveCardId(pokemon.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={loadMore}
          disabled={isLoadingGrid}
          className="px-6 py-2 bg-[#444] text-white rounded-[5px] font-semibold border-2 border-black shadow-[-2px_3px_0_#222,-4px_6px_0_#000] transition-all active:-translate-x-1 active:translate-y-1.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingGrid ? "Carregando..." : "Carregar mais"}
        </button>
      </div>

    </div>
  )
}