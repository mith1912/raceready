import { RaceInput } from "../types"
import { EngineResult } from "../engine/type"
import { NUTRITION_CONFIG } from "../config/nutrition.config"
import { buildElectrolyteOptions } from "../engine/shared/electrolyte"

type Market = "vn" | "us" | "eu"

function getMarket(input: RaceInput): Market {
  return input.market ?? (input.locale === "vi" ? "vn" : "us")
}

export function buildSuggestedProducts(
  engine: EngineResult,
  input: RaceInput
) {
  const market = getMarket(input)
  const products =
    NUTRITION_CONFIG.suggestedProducts[market]

  return {
    market,

    gels:
      engine.items.gels > 0
        ? products.gels.slice(0, 3)
        : [],

    drinkMix:
      engine.items.drinkMixServings > 0
        ? products.drinkMix.slice(0, 3)
        : [],

    sportsDrink:
      engine.items.sportsDrink500mlBottles &&
      engine.items.sportsDrink500mlBottles > 0
        ? products.sportsDrink.slice(0, 3)
        : [],

    electrolytes:
      engine.items.saltTabs > 0
        ? products.electrolytes.slice(0, 3)
        : [],

    bars:
      engine.items.bars > 0
        ? products.bars.slice(0, 3)
        : [],

    realFood:
      engine.items.realFoodCalories > 0
        ? products.realFood
        : [],

    bcaa:
      engine.items.bcaaServings &&
      engine.items.bcaaServings > 0
        ? products.bcaa
        : [],
  }
}