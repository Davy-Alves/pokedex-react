interface PokedexBackgroundProps {
  background: string | undefined
}

export default function PokedexBackground({ background }: PokedexBackgroundProps) {
  if (!background) return null

  return (
    <img
      src={background}
      alt="Cenário do tipo do Pokémon"
      className="absolute rounded-md object-cover border-2 border-black"
      style={{
        top: "26.5%",
        left: "18%",
        width: "56%",
        height: "27.5%",
      }}
    />
  )
}