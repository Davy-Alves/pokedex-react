interface SearchSuggestionsProps {
  suggestions: string[]
  onSelect: (name: string) => void
}

export default function SearchSuggestions({ suggestions, onSelect }: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <ul className="absolute w-[65%] top-[74%] min-[425px]:top-[73%] left-[13.5%] bg-white border-2 border-[#333] rounded-[5px] max-h-32 overflow-y-auto z-20 shadow-[-3px_4px_0_#888,-5px_7px_0_#333]">
      {suggestions.map((name) => (
        <li
          key={name}
          onClick={() => onSelect(name)}
          className="px-3 py-1 capitalize cursor-pointer hover:bg-gray-200 text-sm"
        >
          {name}
        </li>
      ))}
    </ul>
  )
}