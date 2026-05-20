export function calculateCarryFlasks(params: {
  sportType: "road" | "trail" | "triathlon"
  durationHours: number
  aidStation?: "frequent" | "normal" | "rare"
}) {
  const { sportType, durationHours, aidStation } = params

  if (sportType === "triathlon") {
    return durationHours >= 5 ? 3 : 2
  }

  if (sportType === "road") {
    return durationHours >= 5 ? 2 : 1
  }

  if (aidStation === "rare") return 3
  if (aidStation === "normal") return 2
  return 1
}