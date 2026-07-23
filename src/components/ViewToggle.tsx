interface ViewToggleProps {
  isGridView: boolean
  onToggle: () => void
}

export default function ViewToggle({ isGridView, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="mb-6 sm:mb-4 px-5 py-2 rounded-full bg-white text-[#2c2c2a] font-semibold text-sm sm:text-base border-2 border-[#2c2c2a] shadow-[0_2px_0_#2c2c2a] transition-all hover:bg-[#f5f5f5] active:translate-y-0.5 active:shadow-none flex items-center gap-2"
    >
      <span className="text-lg">{"▦"}</span>
      {isGridView ? "Voltar para Pokédex Clássica" : "Ver Catálogo Completo"}
    </button>
  )
}