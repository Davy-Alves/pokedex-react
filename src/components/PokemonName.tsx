interface PokemonNameProps {
  name: string
  id: number | null
  isLoading: boolean
}

export default function PokemonName({ name, id, isLoading }: PokemonNameProps) {
  const displayedText = isLoading ? " - Loading..." : `${id || ""} - ${name}`

  let displayTextSizeClass = "text-[clamp(8px,5vw,25px)]"

  if (displayedText.length > 28) {
    displayTextSizeClass = "text-[clamp(8px,3vw,14px)]"
  } else if (displayedText.length > 19) {
    displayTextSizeClass = "text-[clamp(8px,4vw,19px)]"
  }

  return (
    <h1 className={`absolute font-bold text-[#aaa] font-oxanium top-[54.5%] right-[27%] ${displayTextSizeClass}`}>
      <span>{isLoading ? "" : id}</span> - <span className="text-[#3a444d] capitalize">{isLoading ? "Loading..." : name}</span>
    </h1>
  )
}