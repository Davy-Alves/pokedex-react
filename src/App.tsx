import React, { useState, useEffect } from "react";
import { fetchPokemon, fetchPokemonList } from "./services/pokeApi";
import { typeData } from "./utils/typeIcons"
import { typeBackgrounds } from "./utils/typeBackgrounds";
import logoPokedex from "./assets/logoPokedex.svg";


const buttonStyles = "w-1/2 p-[4%] border-2 border-black rounded-[5px] text-[clamp(5px,5vw,1rem)] font-semibold text-white bg-[#444] shadow-[-2px_3px_0_#222,-4px_6px_0_#000] transition-all active:-translate-x-1 active:translate-y-1.5 active:shadow-none"

const INITIAL_POKEMON = 1

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonId, setPokemonId] = useState<number | null>(null)
  const [pokemonSprite, setPokemonSprite] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentId, setCurrentId] = useState(INITIAL_POKEMON)
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([])
  const [suggestionsNames, setSuggestionsNames] = useState<string[]>([])

  const renderPokemon = async (pokemon: string | number) => {
    setIsLoading(true)

    try {
      const data = await fetchPokemon(pokemon);
      setPokemonName(data.name)
      setPokemonId(data.id)
      setCurrentId(data.id)
      setPokemonSprite(data.sprites.versions['generation-v']['black-white'].animated.front_default)
      setPokemonTypes(data.types.map((typeInfo: any) => (typeInfo.type.name)))
    } catch (error) {
      setPokemonName("Not found :(")
      setPokemonId(null)
      setPokemonSprite("")
      setPokemonTypes([])
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    renderPokemon(inputValue)
    setInputValue("")
  }

  const buttonPrev = () => {
    if (currentId > 1) {
      const newId = currentId - 1
      setCurrentId(newId)
      renderPokemon(newId)
    }
  }

  const buttonNext = () => {
    const newId = currentId + 1
    setCurrentId(newId)
    renderPokemon(newId)
  }

  useEffect(() => {
    renderPokemon(INITIAL_POKEMON)

    fetchPokemonList()
      .then((results) => {
        const names = results.map((pokemon: { name: string }) => pokemon.name)
        setAllPokemonNames(names)
      })
      .catch((error) => console.log(error))
  }, [])

  const displayedText = isLoading ? " - Loading..." : `${pokemonId || ""} - ${pokemonName}`

  let displayTextSizeClass = "text-[clamp(8px,5vw,25px)]"

  if (displayedText.length > 28) {
    displayTextSizeClass = "text-[clamp(8px,3vw,14px)]"
  } else if (displayedText.length > 19) {
    displayTextSizeClass = "text-[clamp(8px,4vw,19px)]"
  }

  const currentBackground = pokemonName === "Not found :("
    ? typeBackgrounds.normal
    : typeBackgrounds[pokemonTypes[0]]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (value.trim() === "") {
      setSuggestionsNames([])
      return
    }

    const filtered = allPokemonNames.filter((name) =>
      name.startsWith(value.toLocaleLowerCase())
    )

    setSuggestionsNames(filtered.slice(0, 30))
  }

  return (
    <main className="bg-linear-to-b from-[#6ab7f5] to-white min-h-screen flex justify-center items-center">
      <div className="px-4 relative">

        {currentBackground && (
          <img
            src={currentBackground}
            alt="Cenário do tipo do Pokémon"
            className="absolute rounded-md object-cover border-2 border-black"
            style={{
              top: "26.5%",
              left: "18%",
              width: "56%",
              height: "27.5%",
            }}
          />
        )}

        {pokemonSprite && (
          <img src={pokemonSprite} alt={`GIF animado do ${pokemonName || "Pokemon"}`} className="absolute bottom-[55%] left-2/4 translate-x-[-63%] translate-y-1/5 max-h-[12%] min-[425px]:max-h-full scale-150" />
        )}

        <h1 className={`absolute font-bold text-[#aaa] font-oxanium top-[54.5%] right-[27%] ${displayTextSizeClass}`}>
          <span>{isLoading ? "" : pokemonId}</span> - <span className="text-[#3a444d] capitalize">{isLoading ? "Loading..." : pokemonName}</span>
        </h1>

        {pokemonTypes.length > 0 && (
          <div className="absolute flex bottom-[67%] right-[29%] gap-0.5 sm:gap-1">
            {pokemonTypes.map((type) => {
              const currentType = typeData[type]
              if (!currentType) return null
              return (
                <div key={type} title={type} className={`${currentType.colorClass} w-6 h-6 sm:w-7 sm:h-7  rounded-full flex justify-center items-center border-2 border-white cursor-pointer`}>
                  <img src={currentType.icon} alt={`Icone do tipo ${type}`} className="w-[60%] h-[60%]" />
                </div>
              )
            })}
          </div>
        )}

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

        {suggestionsNames.length > 0 && (
          <ul className="absolute w-[65%] top-[74%] min-[425px]:top-[73%] left-[13.5%] bg-white border-2 border-[#333] rounded-[5px] max-h-32 overflow-y-auto z-20 shadow-[-3px_4px_0_#888,-5px_7px_0_#333]">
            {suggestionsNames.map((name) => (
              <li
                key={name}
                onClick={() => {
                  setInputValue(name)
                  setSuggestionsNames([])
                  renderPokemon(name)
                }}
                className="px-3 py-1 capitalize cursor-pointer hover:bg-gray-200 text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        )}

        <div className="absolute bottom-[10%] left-[50%] w-[65%] text-center translate-x-[-57%] flex gap-5">
          <button className={buttonStyles} onClick={buttonPrev}>&lt; Prev</button>
          <button className={buttonStyles} onClick={buttonNext}>Next &gt;</button>
        </div>

        <img src={logoPokedex} alt="Ilustração de uma Pokédex vermelha com tela exibindo um cenário de grama e árvores em estilo pixel art" className="max-w-106.25 w-full" />
      </div>
    </main>
  )
}