import { getSpecialFormStyle } from "../../utils/pokemonFormStyles"
import type { EvolutionStage } from "../../hooks/usePokemonDetails"

interface EvolutionChainProps {
  evolutions: EvolutionStage[]
  currentId: number
  onNavigate: (id: number) => void
}

export default function EvolutionChain({ evolutions, currentId, onNavigate }: EvolutionChainProps) {
  const isBranchingFamily = evolutions.length > 4

  return (
    <div className="bg-white/95 p-5 rounded-xl shadow-md border border-white/60 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 text-center">
        {evolutions.length > 1 ? "Evolution Chain" : "Alternate Forms"}
      </h3>

      {isBranchingFamily ? (
        <div className="flex flex-wrap items-start justify-center gap-x-3 max-[340px]:gap-x-2 gap-y-4 pt-4 pb-2 px-2">
          {evolutions.map((evo) => {
            const isCurrent = evo.id === currentId

            return (
              <div
                key={evo.id}
                className={`flex flex-col items-center transition-all duration-300 cursor-pointer group ${isCurrent ? 'scale-110 drop-shadow-xl' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105'}`}
                onClick={() => { if (!isCurrent) onNavigate(evo.id); }}
              >
                <div className={`w-11 h-11 xl:w-12 xl:h-12 max-[340px]:w-9 max-[340px]:h-9 flex items-center justify-center rounded-full ${isCurrent ? 'bg-black/10 border-2 border-black/10' : 'bg-transparent'}`}>
                  <img
                    src={evo.sprite}
                    alt={evo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className={`text-[8px] xl:text-[9px] max-[340px]:text-[7px] font-bold capitalize mt-1.5 transition-colors ${isCurrent ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                  {evo.name}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1 xl:gap-3 max-[340px]:flex-wrap max-[340px]:gap-y-4 overflow-x-auto max-[340px]:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pt-4 pb-4 px-4">
          {evolutions.map((evo, index) => {
            const isCurrent = evo.id === currentId
            const nextTrigger = evolutions[index + 1]?.trigger

            return (
              <div key={evo.id} className="flex items-center gap-1 xl:gap-3 shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex flex-col items-center transition-all duration-300 cursor-pointer group ${isCurrent ? 'scale-110 drop-shadow-xl' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105'}`}
                    onClick={() => { if (!isCurrent) onNavigate(evo.id); }}
                  >
                    <div className={`w-12 h-12 xl:w-14 xl:h-14 max-[340px]:w-9 max-[340px]:h-9 flex items-center justify-center rounded-full ${isCurrent ? 'bg-black/10 border-2 border-black/10' : 'bg-transparent'}`}>
                      <img
                        src={evo.sprite}
                        alt={evo.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className={`text-[9px] xl:text-[10px] max-[340px]:text-[7px] font-bold capitalize mt-2 max-[340px]:mt-1 transition-colors ${isCurrent ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                      {evo.name}
                    </span>
                  </div>

                  {evo.megaForms && evo.megaForms.length > 0 && (
                    <div className="flex gap-1.5 max-[340px]:gap-1 mt-3 max-[340px]:mt-2 bg-black/5 p-1.5 max-[340px]:p-1 rounded-xl border border-black/5">
                      {evo.megaForms.map((mega) => {
                        const isMegaCurrent = mega.id === currentId
                        const formStyle = getSpecialFormStyle(mega.name, evo.name)
                        return (
                          <div
                            key={mega.id}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(mega.id);
                            }}
                          >
                            <div className={`w-7 h-7 xl:w-9 xl:h-9 max-[340px]:w-6 max-[340px]:h-6 rounded-full flex items-center justify-center transition-all ${formStyle.ring} ${isMegaCurrent ? 'bg-black/20 scale-110 drop-shadow-md' : 'opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`}>
                              <img src={mega.sprite} alt={mega.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <span className="text-[7px] xl:text-[8px] max-[340px]:text-[6px] font-bold text-gray-500 capitalize mt-1 text-center leading-tight">
                              {formStyle.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {index < evolutions.length - 1 && (
                  <div className="flex flex-col items-center mb-5 max-[340px]:mb-3">
                    <span className="text-gray-300 font-black text-base xl:text-lg max-[340px]:text-sm">→</span>
                    {nextTrigger && (
                      <span className="text-[7px] xl:text-[8px] max-[340px]:text-[6px] font-bold text-gray-400 uppercase text-center leading-tight max-w-14 max-[340px]:max-w-10">
                        {nextTrigger.detail}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}