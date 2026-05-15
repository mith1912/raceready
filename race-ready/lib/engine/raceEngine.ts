import { NUTRITION_CONFIG } from "../config/nutrition.config"
import { TRAIL_CONFIG } from "../config/trail.config"
import { TRIATHLON_CONFIG } from "../config/triathlon.config"
import { RaceInput } from "../types"

export function generateRacePlan(input: RaceInput) {
  const { sportType, user, race, env } = input

  // =========================
  // 1. BASE CARBS
  // =========================
  let carbRate =
    NUTRITION_CONFIG.carbs.perHour[user.experience_level]

  // TRIATHLON adjustment
  if (sportType === "triathlon") {
    carbRate *= TRIATHLON_CONFIG.bike.carbMultiplier
  }

  // TRAIL adjustment
  if (sportType === "trail") {
    const elevation =
      input.trail?.elevation_gain_m ?? 500

    const level =
      elevation < 500
        ? "low"
        : elevation < 1500
        ? "medium"
        : elevation < 3000
        ? "high"
        : "extreme"

    carbRate *= TRAIL_CONFIG.elevationMultiplier[level]
  }

  const totalCarbs = carbRate * race.expected_time_hours

  // =========================
  // 2. HYDRATION
  // =========================
  const baseHydration =
    env.temperature_c > 28
      ? NUTRITION_CONFIG.hydration.baseMlPerHour.hot
      : NUTRITION_CONFIG.hydration.baseMlPerHour.normal

  let hydrationMultiplier = 1.0

  if (sportType === "triathlon") {
    hydrationMultiplier *= TRIATHLON_CONFIG.bike.hydrationMultiplier
  }

  if (sportType === "trail") {
    const tech =
      input.trail?.technical_level ?? "moderate"

    hydrationMultiplier *= TRAIL_CONFIG.technicalMultiplier[tech]
  }

  const totalHydration =
    baseHydration * race.expected_time_hours * hydrationMultiplier

  // =========================
  // 3. SODIUM
  // =========================
  const sodiumRate =
    env.temperature_c > 28
      ? NUTRITION_CONFIG.sodium.mgPerHour.hot
      : NUTRITION_CONFIG.sodium.mgPerHour.normal

  const totalSodium =
    sodiumRate * race.expected_time_hours

  // =========================
  // 4. CONVERT TO REAL ITEMS
  // =========================
  const gels = Math.ceil(
    totalCarbs / NUTRITION_CONFIG.carbs.gelCarbs
  )

  const bottles = Math.ceil(totalHydration / 500)

  const saltTabs = Math.ceil(
    totalSodium / NUTRITION_CONFIG.sodium.tabletMg
  )

  // =========================
  // 5. TRAIL GUT SAFETY
  // =========================
  let safeGels = gels

  if (sportType === "trail") {
    const gutFactor =
      TRAIL_CONFIG.gutSafetyFactor[user.stomach_tolerance]

    safeGels = Math.floor(gels * gutFactor)
  }

  if (user.stomach_tolerance === "low") {
    safeGels = Math.floor(safeGels * 0.85)
  }

  // =========================
  // 6. GEL SCHEDULE
  // =========================
  const interval = (race.expected_time_hours * 60) / safeGels

  const gelSchedule = Array.from({ length: safeGels }).map(
    (_, i) => ({
      minute: Math.round(i * interval),
      gel: i + 1,
    })
  )

  // =========================
  // 7. PACKING LIST (CORE VALUE)
  // =========================
  const packingList = [
    `${safeGels} energy gels`,
    `${bottles} x 500ml bottles`,
    `${saltTabs} salt tablets`,
    sportType === "trail" ? "trail snacks (bars/chews)" : null,
    sportType === "triathlon" ? "bike nutrition pack" : null,
    "1 emergency energy bar",
  ].filter(Boolean)

  // =========================
  // 8. WARNINGS
  // =========================
  const warnings: string[] = []

  if (env.temperature_c > 28) {
    warnings.push("High heat → increase hydration")
  }

  if (sportType === "trail") {
    warnings.push("Trail race → fuel unpredictability higher")
  }

  if (sportType === "triathlon") {
    warnings.push("Triathlon → plan transition fueling carefully")
  }

  return {
    summary: {
      carbs_g: totalCarbs,
      hydration_ml: totalHydration,
      sodium_mg: totalSodium,
    },

    fuel: {
      gels: safeGels,
      gelSchedule,
    },

    hydration: {
      bottles,
    },

    electrolytes: {
      saltTabs,
    },

    packingList,

    meta: {
      sportType,
    },

    warnings,
  }
}