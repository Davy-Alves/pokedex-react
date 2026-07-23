import pokemonLogo from "../assets/pokemonLogo.svg"

export default function AppHeader() {
  return (
    <div className="w-full flex flex-col items-center gap-2 pt-5 sm:pt-7 pb-4">
      <img src={pokemonLogo} alt="Pokémon" className="w-64 sm:w-80 md:w-96" />
      <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-[0.3em] text-[#2c2c2a] uppercase border-t-2 border-b-2 border-[#2c2c2a] px-4 py-1">
        Pokedex React
      </span>
    </div>
  )
}