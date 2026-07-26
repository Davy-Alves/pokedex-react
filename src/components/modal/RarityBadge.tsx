interface RarityBadgeProps {
  isLegendary: boolean
  isMythical: boolean
  isBaby: boolean
}

export default function RarityBadge({ isLegendary, isMythical, isBaby }: RarityBadgeProps) {
  if (!isLegendary && !isMythical && !isBaby) return null

  return (
    <span
      className={`absolute top-4 right-4 flex items-center gap-2 pl-1 pr-3 py-1 rounded-full text-white font-bold text-[11px] uppercase tracking-wider shadow-md ${
        isMythical
          ? "bg-fuchsia-500"
          : isLegendary
          ? "bg-amber-500"
          : "bg-sky-400"
      }`}
    >
      <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
        {isMythical ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5Z" />
          </svg>
        ) : isLegendary ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M3 6l4 3.5L12 4l5 5.5L21 6l-2 12H5L3 6z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M10 2h4v2.5a2.5 2.5 0 0 1 2 2.45V18a4 4 0 0 1-4 4h-0a4 4 0 0 1-4-4V6.95a2.5 2.5 0 0 1 2-2.45V2z" />
          </svg>
        )}
      </span>
      {isMythical ? "Mythical" : isLegendary ? "Legendary" : "Baby"}
    </span>
  )
}