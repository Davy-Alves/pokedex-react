import InfoCard from "./InfoCard"

interface PokedexEntryCardProps {
  flavorText: string
}

export default function PokedexEntryCard({ flavorText }: PokedexEntryCardProps) {
  return (
    <InfoCard
      title={
        <>
          <span className="w-1.5 h-4 rounded-full bg-gray-300"></span>
          Pokedex Entry
        </>
      }
    >
      <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed italic font-serif">
        "{flavorText}"
      </p>
    </InfoCard>
  )
}