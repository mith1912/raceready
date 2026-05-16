export function getHeatLevel(tempC: number) {
  if (tempC >= 32) return "extreme"
  if (tempC > 28) return "hot"
  if (tempC < 15) return "cool"
  return "normal"
}

export function getHydrationBase(tempC: number) {
  const level = getHeatLevel(tempC)

  switch (level) {
    case "hot":
      return 750
    case "extreme":
      return 850
    case "cool":
      return 450
    default:
      return 600
  }
}

export function getSodiumRate(tempC: number) {
  const level = getHeatLevel(tempC)

  switch (level) {
    case "hot":
      return 700
    case "extreme":
      return 850
    case "cool":
      return 400
    default:
      return 550
  }
}