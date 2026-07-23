import { useState } from "react"
import TypeBadges from "./TypeBadges"
import PokedexBackground from "./PokedexBackground"
import PokemonName from "./PokemonName"
import ShinyToggle from "./ShinyToggle"
import SearchSuggestions from "./SearchSuggestions"
import { useAutocomplete } from "../hooks/useAutocomplete"
import { usePokemon } from "../hooks/usePokemon"
import { useShiny } from "../hooks/useShiny"
import { typeBackgrounds } from "../utils/typeBackgrounds"
import logoPokedex from "../assets/logoPokedex.svg"

const buttonStyles = "w-1/2 p-[4%] border-2 border-black rounded-[5px] text-[clamp(5px,5vw,1rem)] font-semibold text-white bg-[#444] shadow-[-2px_3px_0_#222,-4px_6px_0_#000] transition-all active:-translate-x-1 active:translate-y-1.5 active:shadow-none"

export default function ClassicPokedex() {
  const [inputValue, setInputValue] = useState("")
  const { suggestionsNames, setSuggestionsNames, handleInputChange } = useAutocomplete(setInputValue)
  const { pokemonName, pokemonId, pokemonSprite, pokemonShinySprite, isLoading, pokemonTypes, renderPokemon, buttonPrev, buttonNext, notice } = usePokemon()
  const { isShiny, toggleShiny } = useShiny(pokemonId)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    renderPokemon(inputValue)
    setInputValue("")
  }

  const currentBackground = pokemonName === "Not found :("
    ? typeBackgrounds.normal
    : typeBackgrounds[pokemonTypes[0]]

  const spriteToShow = isShiny ? pokemonShinySprite : pokemonSprite

  return (
    <div className="px-4 mb-8 sm:mb-12 relative">

      <PokedexBackground background={currentBackground} />

      {notice && (
        <p className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[80%] text-center text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full border border-yellow-400 z-30 shadow-sm">
          {notice}
        </p>
      )}

      {spriteToShow && (
        <img src={spriteToShow} alt={`GIF animado do ${pokemonName || "Pokemon"}`} className="absolute bottom-[55%] left-2/4 translate-x-[-63%] translate-y-1/5 max-h-[12%] min-[425px]:max-h-full scale-150" />
      )}

      <PokemonName name={pokemonName} id={pokemonId} isLoading={isLoading} />

      <TypeBadges types={pokemonTypes} />

      <ShinyToggle isShiny={isShiny} onToggle={toggleShiny} />

      <form className="absolute w-[65%] top-[65%] left-[13.5%] text-center" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Name or Number"
          required
          className="w-full p-[4%] border-2 border-[#333] rounded-[5px] font-semibold text-[#4a444d] bg-white text-[clamp(8px,5vw,1rem)] shadow-[-3px_4px_0_#888,-5px_7px_0_#333] focus:outline-none focus:ring-0"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>

      <SearchSuggestions
        suggestions={suggestionsNames}
        onSelect={(name) => {
          setInputValue(name)
          setSuggestionsNames([])
          renderPokemon(name)
        }}
      />

      <div className="absolute bottom-[10%] left-[50%] w-[65%] text-center translate-x-[-57%] flex gap-5">
        <button className={buttonStyles} onClick={buttonPrev}>&lt; Prev</button>
        <button className={buttonStyles} onClick={buttonNext}>Next &gt;</button>
      </div>

      <img src={logoPokedex} alt="Ilustração de uma Pokédex vermelha com tela exibindo um cenário de grama e árvores em estilo pixel art" className="max-w-106.25 w-full" />
    </div>
  )
}