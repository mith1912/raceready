import { RaceInput, EngineResult } from "../../../types"

import { buildRaceKit } from "../../shared/raceKit"
import { calculateScientificTargets } from "../../shared/target"
import { buildTimeline } from "../../shared/timeline"

export function generateTrailPlan(
  input: RaceInput
): EngineResult {
  const durationHours =
    input.race.expected_time_hours

  const aidStation =
    input.trail?.aid_station ?? "normal"

  // =========================
  // TARGETS
  // =========================

  const targets =
    calculateScientificTargets(
      input,
      durationHours
    )

  // =========================
  // RACE KIT
  // =========================

  const raceKit = buildRaceKit({
    targets,
    durationHours,
    preferences: input.nutrition,
    aidStation,
  })

  // =========================
  // TIMELINE
  // =========================

  const timeline = buildTimeline({
    durationHours,
    raceKit,
    includeRealFood: true,
  })

  // =========================
  // WARNINGS
  // =========================

  const warnings: string[] = [
    "trail_unpredictable",
  ]

  if (input.env.temperature_c > 28) {
    warnings.push("hot_weather")
  }

  if (
    (input.trail?.elevation_gain_m ?? 0) >
    3000
  ) {
    warnings.push("high_elevation")
  }

  if (aidStation === "rare") {
    warnings.push("carry_more_fluids")
  }

  return {
    targets,
    raceKit,
    timeline,
    warnings,

    sportMeta: {
      sportType: "trail",
    },
  }
}