export const statColor = (val: number) => {
  if (val >= 100) return "bg-green-500"
  if (val >= 70) return "bg-yellow-500"
  if (val >= 50) return "bg-orange-400"
  return "bg-red-500"
}