import { RaceInput } from "../types"

export type TimelineItemType =
  | "gel"
  | "drink"
  | "bar"
  | "food"
  | "aid_station"
  | "transition"
  | "bike_fuel"
  | "run_fuel"
  | "electrolyte"
  | "sports_drink"
  | "salt"
  | "bcaa"



export type EngineResult = {
  metrics: {
    totalCarbs: number
    totalHydration: number
    totalSodium: number
  }

  items: {
    gels: number
    drinkMixServings: number
    bars: number
    bottles: number
    saltTabs: number
    realFoodCalories: number

    tableSaltGrams?: number
    sportsDrink500mlBottles?: number
    bcaaServings?: number
  }

  electrolyteOptions?: {
    preferredSource: string
    sodiumCoveredByFoodAndDrink: number
    remainingSodium: number
    options: {
      saltTabs: number
      tableSaltGrams: number
      sportsDrink500mlBottles: number
      drinkMixServings: number
    }
  }

  timeline: {
    minute: number
    type: string
    labelKey: string
  }[]

  warnings: string[]
  packingList: string[]

  sportMeta?: {
    sportType: string
    phases?: string[]
  }
}