import { RaceInput } from "../types"

// export type TimelineItemType =
//   | "gel"
//   | "drink"
//   | "bar"
//   | "food"
//   | "aid_station"
//   | "transition"
//   | "bike_fuel"
//   | "run_fuel"
//   | "electrolyte"
//   | "sports_drink"
//   | "salt"
//   | "bcaa"
//   | "salt_capsule"

//   export type RaceKit = {
//   gels: number
//   bars: number
//   carbDrinkServings: number

//   saltCapsules: number
//   electrolyteTabs: number
//   sportsDrinkBottles: number

//   carryFlasks: number
//   realFoodServings: number
//   emergencyGels: number
//   bcaaServings: number
// }

// export type EngineResult = {
//   metrics: {
//     totalCarbs: number
//     totalHydration: number
//     totalSodium: number
//   }

//   raceKit: RaceKit

//   items: {
//   gels: number
//   drinkMixServings: number
//   bars: number
//   saltTabs: number
//   realFoodCalories: number

//   carryFlasks: number
//   sportsDrink500mlBottles?: number
//   bcaaServings?: number
// }

// electrolyteOptions?: {
//     preferredSource: string
//     sodiumCoveredByFoodAndDrink: number
//     remainingSodium: number
//     options: {
//       saltTabs: number
//       tableSaltGrams: number
//       sportsDrink500mlBottles: number
//       drinkMixServings: number
//     }
//   }

//   timeline: {
//     minute: number
//     type: TimelineItemType
//     labelKey: string
//     noteKey?: string
//   }[]

//   warnings: string[]
//   packingList: string[]
//   sportMeta?: {
//     sportType: string
//     phases?: string[]
//   }
// }