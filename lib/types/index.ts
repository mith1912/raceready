export type ElectrolyteSource =
  | "salt_tabs"
  | "table_salt"
  | "sports_drink"
  | "drink_mix"
  | "mixed"

export type CarbSourcePreference =
  | "gel_heavy"
  | "mixed"
  | "real_food"

export type Market = "vn" | "us" | "eu"

export type RaceInput = {
  sportType: "road" | "trail" | "triathlon"
  locale?: "en" | "vi"
  market?: Market

  user: {
    weight_kg: number
    experience_level: "beginner" | "intermediate" | "advanced"
    stomach_tolerance: "low" | "medium" | "high"
  }

  race: {
    distance_km: number
    expected_time_hours: number
  }

  env: {
    temperature_c: number
    humidity: number
  }

  nutrition?: {
    electrolyteSource?: "salt_tabs" | "table_salt" | "sports_drink" | "drink_mix" | "mixed"
    carbSourcePreference?: "gel_heavy" | "mixed" | "real_food"
    useBcaa?: boolean
  }

  trail?: {
    elevation_gain_m: number
    technical_level: "easy" | "moderate" | "hard"
    aid_station: "frequent" | "normal" | "rare"
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
  }
}