import { NUTRITION_CONFIG } from "../../config/nutrition.config"
import { ElectrolyteSource } from "../../types"

export function buildElectrolyteOptions(params: {
  totalSodium: number
  gels: number
  bars: number
  drinkMixServings: number
  preferredSource?: ElectrolyteSource
}) {
  const sodiumFromGel =
    params.gels * NUTRITION_CONFIG.sodium.sodiumPerGel

  const sodiumFromBars =
    params.bars * NUTRITION_CONFIG.sodium.sodiumPerBar

  const sodiumFromDrinkMix =
    params.drinkMixServings *
    NUTRITION_CONFIG.sodium.drinkMixSodiumPerServing

  const sodiumCovered =
    sodiumFromGel + sodiumFromBars + sodiumFromDrinkMix

  const remainingSodium = Math.max(
    0,
    params.totalSodium - sodiumCovered
  )

  const saltTabs = Math.ceil(
    remainingSodium / NUTRITION_CONFIG.sodium.tabletMg
  )

  const tableSaltGrams = Number(
    (
      remainingSodium /
      NUTRITION_CONFIG.sodium.tableSaltSodiumPerGram
    ).toFixed(1)
  )

  const sportsDrink500mlBottles = Math.ceil(
    remainingSodium /
      NUTRITION_CONFIG.sodium.sportsDrinkSodiumPer500ml
  )

  return {
    preferredSource: params.preferredSource ?? "mixed",

    sodiumCoveredByFoodAndDrink: Math.round(sodiumCovered),

    remainingSodium: Math.round(remainingSodium),

    options: {
      saltTabs,
      tableSaltGrams,
      sportsDrink500mlBottles,
      drinkMixServings: params.drinkMixServings,
    },
  }
}