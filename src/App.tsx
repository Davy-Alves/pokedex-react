import AppHeader from "./components/AppHeader"
import ClassicPokedex from "./components/ClassicPokedex"
import GridCatalog from "./components/GridCatalog"
import ViewToggle from "./components/ViewToggle"
import { useViewMode } from "./hooks/useViewMode"

export default function App() {
  const { isGridView, toggleView } = useViewMode()

  return (
    <main className="bg-linear-to-b from-[#6ab7f5] to-white min-h-screen flex flex-col justify-center items-center">
      <AppHeader />
      <ViewToggle isGridView={isGridView} onToggle={toggleView} />

      {isGridView ? <GridCatalog /> : <ClassicPokedex />}
    </main>
  )
}