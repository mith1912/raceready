export type SportType = "road" | "trail" | "triathlon"

export type ExperienceLevel = "beginner" | "intermediate" | "advanced"

export interface RaceInput {
  sportType: SportType

  user: {
    weight_kg: number
    experience_level: ExperienceLevel
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

  // optional for trail later
  trail?: {
    elevation_gain_m?: number
    technical_level?: "easy" | "moderate" | "hard"
    aid_station?: "frequent" | "normal" | "rare"
  }
}