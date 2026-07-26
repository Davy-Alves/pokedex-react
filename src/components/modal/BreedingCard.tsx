import InfoCard from "./InfoCard"

interface BreedingCardProps {
  genderRate: number
  growthRate: string
  eggGroups: string[]
}

export default function BreedingCard({ genderRate, growthRate, eggGroups }: BreedingCardProps) {
  return (
    <InfoCard title="Breeding" className="flex-1">
      <div className="flex flex-col gap-3 text-sm font-bold text-gray-700">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-gray-500">Gender</span>
          {genderRate === -1 ? (
            <span className="text-gray-400 text-xs">Genderless</span>
          ) : (
            <span className="flex gap-2 text-xs">
              <span className="text-blue-500">♂ {100 - genderRate * 12.5}%</span>
              <span className="text-pink-500">♀ {genderRate * 12.5}%</span>
            </span>
          )}
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">Growth Rate</span>
          <span className="capitalize text-xs">{growthRate.replace(/-/g, " ")}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-gray-500 shrink-0">Egg Groups</span>
          <span className="capitalize text-xs text-right">
            {eggGroups.join(", ").replace(/-/g, " ")}
          </span>
        </div>
      </div>
    </InfoCard>
  )
}