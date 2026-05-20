import { EngineResult, RaceInput } from "../types"
import { generateRoadPlan } from "./sports/road/roadEngine"
import { generateTrailPlan } from "./sports/trail/trailEngine"
import { generateTriathlonPlan } from "./sports/triathlon/triathlonEngine"

export function generateRaceEngine(
  input: RaceInput
): EngineResult {
  switch (input.sportType) {
    case "trail":
      return generateTrailPlan(input)

    case "triathlon":
      return generateTriathlonPlan(input)

    case "road":
    default:
      return generateRoadPlan(input)
  }
}