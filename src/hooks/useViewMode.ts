import { useState } from "react"

export function useViewMode() {
  const [isGridView, setIsGridView] = useState(false)

  const toggleView = () => {
    setIsGridView(!isGridView)
  }

  return { isGridView, toggleView }
}