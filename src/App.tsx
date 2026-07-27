import { useState } from "react"
import AppHeader from "./components/AppHeader"
import ClassicPokedex from "./components/ClassicPokedex"
import GridCatalog from "./components/GridCatalog"
import ViewToggle from "./components/ViewToggle"
import PokemonModal from "./components/modal/PokemonModal"
import { useViewMode } from "./hooks/useViewMode"
import { useValidPokemonIds } from "./hooks/useValidPokemonIds"
import DeveloperCredit from "./components/DeveloperCredit"

export default function App() {
  const { isGridView, toggleView } = useViewMode()
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null)
  const { isValidId, findNextValidId, findPreviousValidId } = useValidPokemonIds()

  const handleNavigate = (newId: number) => {
    if (isValidId(newId)) {
      setSelectedPokemonId(newId)
      return
    }

    const current = selectedPokemonId ?? newId
    const isGoingForward = newId > current

    const fallbackId = isGoingForward
      ? findNextValidId(newId)
      : findPreviousValidId(newId)

    if (fallbackId !== null) {
      setSelectedPokemonId(fallbackId)
    }
  }

  return (
    <main className="bg-linear-to-b from-[#6ab7f5] to-white min-h-screen flex flex-col justify-center items-center relative">
      <DeveloperCredit />
      <AppHeader />
      <ViewToggle isGridView={isGridView} onToggle={toggleView} />

      {isGridView ? (
        <GridCatalog onOpenDetails={setSelectedPokemonId} />
      ) : (
        <ClassicPokedex onOpenDetails={setSelectedPokemonId} />
      )}

      {selectedPokemonId && (
        <PokemonModal
          id={selectedPokemonId}
          onClose={() => setSelectedPokemonId(null)}
          onNavigate={handleNavigate}
        />
      )}
    </main>
  )
}