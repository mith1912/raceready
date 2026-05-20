export type Locale = "en" | "vi"
export type Market = "vn" | "us" | "eu"

export type TimelineItemType =
  | "gel"
  | "bar"
  | "carb_drink"
  | "real_food"
  | "water"
  | "electrolyte_drink"
  | "salt_capsule"
  | "electrolyte_tab"
  | "bcaa"
  | "transition"
  | "bike_fuel"
  | "run_fuel"

export type TimelineItem = {
  minute: number
  type: TimelineItemType
  label: string
  phase?: "swim" | "bike" | "run"
}

export type RaceKit = {
  energy: {
    gels: number
    bars: number
    carbDrinkServings: number
    realFoodServings: number
  }

  hydration: {
    totalLiters: number
    waterLiters: number
    electrolyteDrinkLiters: number
    carbDrinkLiters: number
    bottleCount500ml: number
    carryLiters: number
  }

  electrolytes: {
    saltCapsules: number
    electrolyteTabs: number
  }

  extras: {
    emergencyGels: number
    bcaaServings: number
  }
  sodiumBreakdown: {
  targetMg: number
  fromGelMg: number
  fromBarsMg: number
  fromCarbDrinkMg: number
  fromElectrolyteDrinkMg: number
  fromBcaaMg: number
  coveredMg: number
  remainingMg: number
}
}

export type ScientificTargets = {
  carbs: {
    perHourG: number
    totalG: number
  }

  fluid: {
    perHourMl: number
    totalMl: number
  }

  sodium: {
    perHourMg: number
    totalMg: number
  }
}

export type ProductItem = {
  name: string
  category?: string
  note?: string
}

export type SuggestedProducts = {
  market?: Market
  gels?: ProductItem[]
  drinkMix?: ProductItem[]
  electrolyteDrink?: ProductItem[]
  saltCapsules?: ProductItem[]
  electrolyteTabs?: ProductItem[]
  bars?: ProductItem[]
  realFood?: string[]
  bcaa?: ProductItem[]
}

export type RacePlanResult = {
  meta: {
    locale: Locale
    market: Market
    sportType: string
    raceLabel: string
    expectedTimeHours: number
    distanceKm: number
  }

  headline: string

  targets: ScientificTargets

  raceKit: RaceKit

  timeline: TimelineItem[]

  warnings: {
    level: "low" | "medium" | "high"
    message: string
  }[]

  notes: string[]

  suggestedProducts?: SuggestedProducts
}