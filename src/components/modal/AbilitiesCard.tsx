import InfoCard from "./InfoCard"

interface AbilitiesCardProps {
  abilities: string[]
}

export default function AbilitiesCard({ abilities }: AbilitiesCardProps) {
  return (
    <InfoCard title="Abilities">
      <div className="flex flex-wrap gap-2">
        {abilities.map(ability => (
          <span
            key={ability}
            className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-md capitalize shadow-sm hover:bg-gray-200 hover:shadow-md transition-all"
          >
            {ability.replace("-", " ")}
          </span>
        ))}
      </div>
    </InfoCard>
  )
}