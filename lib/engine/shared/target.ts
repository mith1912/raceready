import { NUTRITION_CONFIG } from "../../config/nutrition.config"
import { RaceInput, ScientificTargets } from "../../types"

export function calculateScientificTargets(
  input: RaceInput,
  durationHours: number
): ScientificTargets {
  const baseCarbsPerHour =
    NUTRITION_CONFIG.carbs.perHour[
      input.user.experience_level
    ]

  const carbsPerHour = applySportCarbAdjustment(
    baseCarbsPerHour,
    input
  )

  const fluidPerHour = calculateFluidPerHour(input)

  const sodiumPerHour = calculateSodiumPerHour(input)

  return {
    carbs: {
      perHourG: Math.round(carbsPerHour),
      totalG: Math.round(carbsPerHour * durationHours),
    },

    fluid: {
      perHourMl: Math.round(fluidPerHour),
      totalMl: Math.round(fluidPerHour * durationHours),
    },

    sodium: {
      perHourMg: Math.round(sodiumPerHour),
      totalMg: Math.round(sodiumPerHour * durationHours),
    },
  }
}

function applySportCarbAdjustment(
  carbsPerHour: number,
  input: RaceInput
) {
  if (input.sportType !== "trail") {
    return carbsPerHour
  }

  const elevation = input.trail?.elevation_gain_m ?? 0

  if (elevation > 6000) return carbsPerHour * 1.15
  if (elevation > 3000) return carbsPerHour * 1.1
  if (elevation > 1500) return carbsPerHour * 1.05

  return carbsPerHour
}

function calculateFluidPerHour(input: RaceInput) {
  const { temperature_c, humidity } = input.env

  let fluid =
    temperature_c > 32
      ? NUTRITION_CONFIG.fluid.veryHotMlPerHour
      : temperature_c > 28
      ? NUTRITION_CONFIG.fluid.hotMlPerHour
      : NUTRITION_CONFIG.fluid.normalMlPerHour

  if (humidity > 75) {
    fluid *= NUTRITION_CONFIG.fluid.humidityMultiplier
  }

  return fluid
}

function calculateSodiumPerHour(input: RaceInput) {
  const { temperature_c, humidity } = input.env

  if (temperature_c > 32) {
    return NUTRITION_CONFIG.sodium.veryHotMgPerHour
  }

  if (temperature_c > 28 || humidity > 75) {
    return NUTRITION_CONFIG.sodium.hotMgPerHour
  }

  return NUTRITION_CONFIG.sodium.normalMgPerHour
}