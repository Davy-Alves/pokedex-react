import shinyIcon from "../assets/shinyIcon.svg"

interface ShinyToggleProps {
  isShiny: boolean
  onToggle: () => void
}

export default function ShinyToggle({ isShiny, onToggle }: ShinyToggleProps) {
  return (
    <button
      onClick={onToggle}
      title="Ver versão shiny"
      className={`absolute bottom-[67%] left-[21%] w-9 h-6 sm:w-10 sm:h-7 rounded-md border-2 border-black flex items-center justify-center cursor-pointer shadow-[-2px_2px_0_#000] transition-all active:-translate-x-0.5 active:translate-y-0.5 active:shadow-none ${isShiny
        ? "bg-linear-to-br from-[#FAC775] to-[#EF9F27]"
        : "bg-linear-to-br from-[#B4B2A9] to-[#888780]"
        }`}
    >
      <img src={shinyIcon} alt="Ícone shiny" className="w-[65%] h-[65%]" />
    </button>
  )
}