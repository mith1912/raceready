export type Locale = "en" | "vi"
export type Market = "vn" | "us" | "eu"

export type SportType = "road" | "trail" | "triathlon"

export type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"

export type GutTolerance =
  | "low"
  | "medium"
  | "high"

export type TerrainLevel =
  | "easy"
  | "moderate"
  | "hard"

export type AidStationDensity =
  | "frequent"
  | "normal"
  | "rare"

// =========================
// USER SELECTED SOURCES
// =========================

export type EnergySource =
  | "gel"
  | "bar"
  | "carb_drink"
  | "real_food"

export type HydrationSource =
  | "water"
  | "electrolyte_drink"
  | "carb_drink"

export type ElectrolyteSource =
  | "salt_capsule"
  | "electrolyte_tab"

export type NutritionPreferences = {
  energySources: EnergySource[]
  hydrationSources: HydrationSource[]
  electrolyteSources: ElectrolyteSource[]
  useBcaa?: boolean
}

// =========================
// INPUT
// =========================

export type RaceInput = {
  sportType: SportType
  locale?: Locale
  market?: Market

  user: {
    weight_kg: number
    experience_level: ExperienceLevel
    stomach_tolerance: GutTolerance
  }

  race: {
    distance_km: number
    expected_time_hours: number
  }

  env: {
    temperature_c: number
    humidity: number
  }

  nutrition?: NutritionPreferences

  trail?: {
    elevation_gain_m: number
    technical_level: TerrainLevel
    aid_station: AidStationDensity
  }

  triathlon?: {
    swim_distance_km: number
    swim_time_hours: number

    bike_distance_km: number
    bike_time_hours: number

    run_distance_km: number
    run_time_hours: number

    t1_minutes?: number
    t2_minutes?: number

    bike_hydration_access?: AidStationDensity
    run_aid_station?: AidStationDensity
  }
}

// =========================
// ENGINE / API OUTPUT
// =========================

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
  labelKey: string
  phase?: "swim" | "bike" | "run"
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

export type EngineResult = {
  targets: ScientificTargets
  raceKit: RaceKit
  timeline: TimelineItem[]
  warnings: string[]

  sportMeta: {
    sportType: SportType
    phases?: ("swim" | "bike" | "run")[]
  }
}