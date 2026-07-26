export interface SpecialFormStyle {
  label: string
  ring: string
}

export const getSpecialFormStyle = (
  varietyName: string,
  baseSpeciesName: string
): SpecialFormStyle => {
  const suffix = varietyName.replace(`${baseSpeciesName}-`, "")
  const label = suffix
    .split("-")
    .map(part => (part.length <= 2 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ")

  let ring = "ring-2 ring-slate-400"
  if (varietyName.includes("-gmax")) ring = "ring-2 ring-purple-400"
  else if (varietyName.includes("-primal")) ring = "ring-2 ring-rose-400"
  else if (varietyName.includes("-mega-x")) ring = "ring-2 ring-blue-400"
  else if (varietyName.includes("-mega-y")) ring = "ring-2 ring-red-400"
  else if (varietyName.includes("-mega")) ring = "ring-2 ring-indigo-400"
  else if (varietyName.includes("-origin")) ring = "ring-2 ring-cyan-400"
  else if (varietyName.includes("-crowned")) ring = "ring-2 ring-amber-400"
  else if (varietyName.includes("-eternamax")) ring = "ring-2 ring-fuchsia-500"

  return { label, ring }
}