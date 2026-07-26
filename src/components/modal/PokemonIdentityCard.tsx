import { useRef, useState, useEffect } from "react"
import RarityBadge from "./RarityBadge"
import PokemonTypesRow from "./PokemonTypesRow"
import type { PokemonDetails } from "../../hooks/usePokemonDetails"
import shinyIcon from "../../assets/shinyIcon.svg"

interface PokemonIdentityCardProps {
  details: PokemonDetails
}

export default function PokemonIdentityCard({ details }: PokemonIdentityCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    setIsShiny(false)
  }, [details.id])

  const playCry = () => {
    if (!details.cryUrl) return
    if (audioRef.current) {
      audioRef.current.pause()
    }
    audioRef.current = new Audio(details.cryUrl)
    audioRef.current.play()
  }

  return (
    <div className="bg-white/90 rounded-xl p-6 flex flex-col items-center justify-center text-center border border-white shadow-inner relative overflow-hidden shrink-0 lg:h-full">
      <span className="absolute top-4 left-4 bg-black/10 text-gray-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
        {details.generation}
      </span>

      <RarityBadge
        isLegendary={details.isLegendary}
        isMythical={details.isMythical}
        isBaby={details.isBaby}
      />

      <span className="font-extrabold text-lg text-gray-400 mt-6 sm:mt-0"># {String(details.id).padStart(3, '0')}</span>
      <div className="flex items-center justify-center gap-2 mt-1">
        <h2 className="text-3xl font-black capitalize text-gray-900 tracking-tight leading-none">{details.name}</h2>
        {details.cryUrl && (
          <button
            onClick={playCry}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 hover:scale-110 transition-all shadow-md ring-1 ring-black/10 shrink-0"
            title="Ouvir grito"
            aria-label="Ouvir grito do Pokémon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{details.speciesName}</span>

      <div className="relative w-48 h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48 my-6 flex justify-center items-center shrink-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/5 to-black/10 rounded-full filter blur-xl"></div>
        <img
          src={isShiny && details.shinySprite ? details.shinySprite : details.sprite}
          alt={details.name}
          className="w-[85%] h-[85%] object-contain drop-shadow-2xl z-10"
          style={{ imageRendering: "pixelated" }}
        />
        {details.shinySprite && (
          <button
            onClick={() => setIsShiny(prev => !prev)}
            title="Ver versão shiny"
            className={`absolute bottom-0 right-2 w-9 h-6 sm:w-10 sm:h-7 rounded-md border-2 border-black flex items-center justify-center cursor-pointer shadow-[-2px_2px_0_#000] transition-all active:-translate-x-0.5 active:translate-y-0.5 active:shadow-none z-20 ${isShiny
              ? "bg-linear-to-br from-[#FAC775] to-[#EF9F27]"
              : "bg-linear-to-br from-[#B4B2A9] to-[#888780]"
              }`}
          >
            <img src={shinyIcon} alt="Ícone shiny" className="w-[65%] h-[65%]" />
          </button>
        )}
      </div>

      <div className="flex gap-4 text-sm text-gray-700 font-bold bg-gray-100 px-6 py-2 rounded-lg justify-center shadow-sm border border-gray-200 mt-auto mx-auto">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase">Height</span>
          <span>{details.height} m</span>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase">Weight</span>
          <span>{details.weight} kg</span>
        </div>
      </div>

      <PokemonTypesRow types={details.types} />
    </div>
  )
}