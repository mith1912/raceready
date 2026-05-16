import { NUTRITION_CONFIG } from "../../config/nutrition.config"

export function getFuelDistribution(durationHours: number) {
  if (durationHours <= 4) {
    return NUTRITION_CONFIG.fuelDistribution.short
  }

  if (durationHours <= 10) {
    return NUTRITION_CONFIG.fuelDistribution.medium
  }

  return NUTRITION_CONFIG.fuelDistribution.ultra
}

export function splitCarbs(totalCarbs: number, durationHours: number) {
  const distribution = getFuelDistribution(durationHours)

  const gelCarbs = totalCarbs * distribution.gel
  const drinkCarbs = totalCarbs * distribution.drink
  const barCarbs = totalCarbs * distribution.bar
  const realFoodCarbs = totalCarbs * distribution.realFood

  return {
    gels: Math.ceil(gelCarbs / NUTRITION_CONFIG.carbs.gelCarbs),
    drinkMixServings: Math.ceil(
      drinkCarbs / NUTRITION_CONFIG.carbs.carbDrinkServing
    ),
    bars: Math.ceil(barCarbs / NUTRITION_CONFIG.carbs.barCarbs),
    realFoodCalories: Math.round(realFoodCarbs * 4),
  }
}