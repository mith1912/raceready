import { RaceInput, EngineResult } from "../../../types"

import { buildRaceKit } from "../../shared/raceKit"
import { calculateScientificTargets } from "../../shared/target"
import { buildTimeline } from "../../shared/timeline"

export function generateRoadPlan(
  input: RaceInput
): EngineResult {
  const durationHours =
    input.race.expected_time_hours

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
    aidStation: "normal",
  })

  // =========================
  // TIMELINE
  // =========================

  const timeline = buildTimeline({
    durationHours,
    raceKit,
    includeRealFood: durationHours >= 4,
  })

  // =========================
  // WARNINGS
  // =========================

  const warnings: string[] = []

  if (input.env.temperature_c > 28) {
    warnings.push("hot_weather")
  }

  if (durationHours >= 4) {
    warnings.push("long_race")
  }

  return {
    targets,
    raceKit,
    timeline,
    warnings,

    sportMeta: {
      sportType: "road",
    },
  }
}