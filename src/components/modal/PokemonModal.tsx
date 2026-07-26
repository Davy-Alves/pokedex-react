import { usePokemonDetails } from "../../hooks/usePokemonDetails"
import { typeData } from "../../utils/typeIcons"
import EvolutionChain from "./EvolutionChain"
import PokedexEntryCard from "./PokedexEntryCard"
import AbilitiesCard from "./AbilitiesCard"
import TrainingCard from "./TrainingCard"
import BreedingCard from "./BreedingCard"
import BaseStatsCard from "./BaseStatsCard"
import PokemonIdentityCard from "./PokemonIdentityCard"

export default function PokemonModal({ 
  id, 
  onClose, 
  onNavigate 
}: { 
  id: number, 
  onClose: () => void, 
  onNavigate: (id: number) => void 
}) {
  const { details, isLoadingDetails } = usePokemonDetails(id)

  const primaryType = details?.types[0]
  const modalBgClass = (primaryType && typeData[primaryType]?.colorClass) || "bg-gray-500"

  const specialGlowClass = details?.isMythical
    ? "ring-4 ring-fuchsia-400 shadow-[0_0_45px_12px_rgba(217,70,239,0.55)]"
    : details?.isLegendary
    ? "ring-4 ring-yellow-400 shadow-[0_0_45px_12px_rgba(250,204,21,0.55)]"
    : ""

  const hasEvolutionsOrMegas = !!details && (details.evolutions.length > 1 || details.evolutions.some(evo => evo.megaForms && evo.megaForms.length > 0));

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center p-4 sm:p-8 transition-opacity"
      onClick={onClose}
    >
      {id > 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate(id - 1); }}
          className="fixed left-2 xl:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 hover:scale-110 transition-all z-50 backdrop-blur-sm border border-white/20"
          aria-label="Pokémon anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-6 sm:h-6">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <button 
        onClick={(e) => { e.stopPropagation(); onNavigate(id + 1); }}
        className="fixed right-2 xl:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 hover:scale-110 transition-all z-50 backdrop-blur-sm border border-white/20"
        aria-label="Próximo Pokémon"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-6 sm:h-6">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {isLoadingDetails || !details ? (
        <div 
          className="w-full max-w-7xl h-75 flex items-center justify-center rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gray-800 border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-white font-bold text-xl tracking-widest animate-pulse">CARREGANDO...</span>
        </div>
      ) : (
      <div 
        className={`w-full max-w-7xl max-h-[95vh] overflow-y-auto lg:overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:grid lg:grid-cols-3 p-3 sm:p-5 gap-4 lg:gap-6 relative border border-white/20 scrollbar-none ${modalBgClass} ${specialGlowClass}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/40 text-white transition-all z-50 cursor-pointer border border-white/20 backdrop-blur-sm shadow-md"
          aria-label="Fechar ficha"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 sm:w-5 sm:h-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <PokemonIdentityCard details={details} />

        <div className="flex flex-col gap-4 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none shrink-0 lg:h-full pb-1">
          <PokedexEntryCard flavorText={details.flavorText} />
          <AbilitiesCard abilities={details.abilities} />
          <TrainingCard baseExp={details.baseExp} captureRate={details.captureRate} />
          <BreedingCard
            genderRate={details.genderRate}
            growthRate={details.growthRate}
            eggGroups={details.eggGroups}
          />
        </div>

        <div className="flex flex-col gap-4 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none shrink-0 lg:h-full pb-1">
          <BaseStatsCard stats={details.stats} />

          {hasEvolutionsOrMegas && (
            <EvolutionChain
              evolutions={details.evolutions}
              currentId={details.id}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
      )}
    </div>
  )
}