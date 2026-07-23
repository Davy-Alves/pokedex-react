import { useState, useEffect } from "react"
import { typeData } from "../utils/typeIcons"
import pokeballCardBg from "../assets/cards/pokeballCardBg.svg"

interface PokemonCardProps {
    id: number
    name: string
    sprite: string
    animatedSprite: string
    types: string[]
    isActive: boolean
    onActivate: () => void
}

export default function PokemonCard({ id, name, sprite, animatedSprite, types, isActive, onActivate }: PokemonCardProps) {
    const [isHovering, setIsHovering] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const primaryType = typeData[types[0]]
    const cardBackground = primaryType ? primaryType.colorClass : "bg-gray-300"

    const nameSizeClass =
        name.length > 12
            ? "text-xs sm:text-sm lg:text-base"
            : name.length > 8
                ? "text-sm sm:text-base lg:text-lg"
                : "text-base sm:text-lg lg:text-xl"

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>

        if (isHovering || isActive) {
            setIsAnimating(true)
            timeoutId = setTimeout(() => {
                setIsAnimating(false)
            }, 3000)
        } else {
            setIsAnimating(false)
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [isHovering, isActive])

    const spriteToShow = isAnimating ? animatedSprite : sprite

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onActivate}
            className={`relative rounded-2xl overflow-hidden flex flex-col justify-between aspect-3/4 sm:aspect-4/5 lg:aspect-square cursor-pointer transition-transform hover:scale-105 ${cardBackground} shadow-[4px_4px_0px_rgba(0,0,0,0.25)]`}
        >

            <img
                src={pokeballCardBg}
                alt=""
                className="absolute top-[60%] left-9 sm:-right-16 -translate-y-1/2 w-[140%] h-[140%] object-contain opacity-30 pointer-events-none select-none"
            />

            <div className="p-3 sm:p-4 z-10 flex flex-col gap-1.5">
                <div className="flex justify-between items-center gap-2">
                    <h3 className={`text-white font-extrabold ${nameSizeClass} capitalize truncate tracking-wide drop-shadow-sm`}>
                        {name}
                    </h3>
                    <span className="text-white font-bold text-xs sm:text-sm lg:text-base shrink-0 font-mono bg-black/20 rounded-full px-2 py-0.5 drop-shadow-sm">
                        #{String(id).padStart(3, "0")}
                    </span>
                </div>

                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 border-2 border-white flex items-center justify-center text-white text-xs sm:text-sm font-serif italic font-bold shadow-sm">
                    i
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[55%] flex items-center justify-center z-0">
                <img
                    src={spriteToShow}
                    alt={name}
                    className={`w-full h-full object-contain drop-shadow-md transition-transform ${isAnimating ? "scale-[0.9]" : "scale-100"
                        }`}
                />
            </div>

            <div className="bg-black/20 px-2 py-1.5 sm:px-4 sm:py-3 flex flex-row items-center gap-1.5 sm:gap-3 z-10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {types.map((type) => {
                    const currentType = typeData[type]
                    if (!currentType) return null
                    return (
                        <div
                            key={type}
                            className={`flex items-center gap-1 max-[320px]:gap-0.5 sm:gap-2 p-0.5 max-[320px]:p-0.5 pr-2 max-[320px]:pr-1.5 sm:pr-3 rounded-full ${currentType.colorClass} shadow-md shrink-0 w-max`}
                        >
                            <div className="w-5 h-5 max-[348px]:w-4 max-[320px]:h-4 sm:w-8 sm:h-8 rounded-full border sm:border-2 border-white flex items-center justify-center shrink-0">
                                <img
                                    src={currentType.icon}
                                    alt={type}
                                    className="w-2.5 h-2.5 max-[320px]:w-2 max-[320px]:h-2 sm:w-4 sm:h-4 object-contain shrink-0"
                                />
                            </div>

                            <span className="text-[10px] max-[320px]:text-[9px] sm:text-sm capitalize font-medium whitespace-nowrap text-white">
                                {type}
                            </span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}