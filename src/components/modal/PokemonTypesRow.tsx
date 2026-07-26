import { typeData } from "../../utils/typeIcons"

interface PokemonTypesRowProps {
  types: string[]
}

export default function PokemonTypesRow({ types }: PokemonTypesRowProps) {
  return (
    <div className="flex gap-2 mt-4 w-full justify-center">
      {types.map(type => {
        const typeInfo = typeData[type]

        return (
          <div
            key={type}
            className={`flex items-center gap-2 pl-1 pr-4 py-1 rounded-full text-white font-bold text-sm capitalize shadow-md ${typeInfo?.colorClass || 'bg-gray-500'}`}
          >
            <div className="w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center bg-transparent">
              {typeInfo && (
                <img
                  src={typeInfo.icon}
                  alt={type}
                  className="w-3.5 h-3.5 object-contain filter drop-shadow-sm brightness-0 invert"
                />
              )}
            </div>
            <span>{type}</span>
          </div>
        )
      })}
    </div>
  )
}