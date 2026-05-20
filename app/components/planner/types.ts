export type SportType = "road" | "trail" | "triathlon"

export type PlannerForm = {
  sportType: SportType
  locale: "en" | "vi"
  market: "vn" | "us" | "eu"

  weight_kg: number
  experience_level: "beginner" | "intermediate" | "advanced"
  stomach_tolerance: "low" | "medium" | "high"

  distance_km: number
  expected_time_hours: number
  temperature_c: number
  humidity: number

  elevation_gain_m: number
  technical_level: "easy" | "moderate" | "hard"
  aid_station: "frequent" | "normal" | "rare"

  swim_distance_km: number
  swim_time_hours: number
  bike_distance_km: number
  bike_time_hours: number
  run_distance_km: number
  run_time_hours: number
  t1_minutes: number
  t2_minutes: number
  bike_hydration_access: "frequent" | "normal" | "rare"
  run_aid_station: "frequent" | "normal" | "rare"

  energySources: Array<"gel" | "bar" | "carb_drink" | "real_food">
  hydrationSources: Array<"water" | "electrolyte_drink" | "carb_drink">
  electrolyteSources: Array<"salt_capsule" | "electrolyte_tab">
  useBcaa: boolean
}