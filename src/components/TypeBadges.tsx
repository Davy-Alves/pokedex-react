import { typeData } from "../utils/typeIcons";

interface TypeBadgesProps {
  types: string[];
}

export default function TypeBadges({ types }: TypeBadgesProps) {
  if (types.length === 0) return null

  return (
    <div className="absolute flex bottom-[67%] right-[29%] gap-0.5 sm:gap-1">
      {types.map((type) => {
        const currentType = typeData[type]
        if (!currentType) return null
        return (
          <div key={type} title={type} className={`${currentType.colorClass} w-6 h-6 sm:w-7 sm:h-7 rounded-full flex justify-center items-center border-2 border-white cursor-pointer`}>
            <img src={currentType.icon} alt={`Icone do tipo ${type}`} className="w-[60%] h-[60%]" />
          </div>
        )
      })}
    </div>
  )
}