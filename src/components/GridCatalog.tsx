import { useState } from "react"
import { usePokemonFilter } from "../hooks/usePokemonFilter"
import { usePokemonGrid } from "../hooks/usePokemonGrid"
import PokemonCard from "./PokemonCard"
import FilterBar from "./filters/FilterBar"
import ShinyToggle from "./ShinyToggle"

interface GridCatalogProps {
  onOpenDetails: (id: number) => void
}

export default function GridCatalog({ onOpenDetails }: GridCatalogProps) {
  const { filteredNames, suggestions, filters } = usePokemonFilter()

  const { gridPokemons, isLoadingGrid, loadMore } = usePokemonGrid(filteredNames)

  const [activeCardId, setActiveCardId] = useState<number | null>(null)
  const [isShinyView, setIsShinyView] = useState(false)

  return (
    <div className="w-full px-[5%] pt-8 sm:pt-12 pb-6">

      <FilterBar filters={filters} suggestions={suggestions}>
        <ShinyToggle
          isShiny={isShinyView}
          onToggle={() => setIsShinyView((prev) => !prev)}
          className="relative"
          sizeClassName="w-12 h-8 sm:w-14 sm:h-9"
        />
      </FilterBar>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 2xl:gap-8">
        {gridPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.sprite}
            animatedSprite={pokemon.animatedSprite}
            shinySprite={pokemon.shinySprite}
            animatedShinySprite={pokemon.animatedShinySprite}
            types={pokemon.types}
            isShiny={isShinyView}
            isActive={pokemon.id === activeCardId}
            onActivate={() => setActiveCardId(pokemon.id)}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>

      {gridPokemons.length === 0 && !isLoadingGrid && (
        <div className="text-center text-white mt-10 font-bold text-xl drop-shadow-md">
          Nenhum Pokémon encontrado. Tente ajustar os filtros!
        </div>
      )}

      {filteredNames.length > gridPokemons.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={isLoadingGrid}
            className="px-6 py-2 bg-[#444] text-white rounded-[5px] font-semibold border-2 border-black shadow-[-2px_3px_0_#222,-4px_6px_0_#000] transition-all active:-translate-x-1 active:translate-y-1.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingGrid ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}

    </div>
  )
}