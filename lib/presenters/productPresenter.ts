import { PRODUCT_CONFIG } from "../config/product.config"
import { EngineResult, RaceInput, Market } from "../types"

function getMarket(input: RaceInput): Market {
  return input.market ?? (input.locale === "vi" ? "vn" : "us")
}

export function buildSuggestedProducts(
  engine: EngineResult,
  input: RaceInput
) {
  const market = getMarket(input)
  const products = PRODUCT_CONFIG[market]

  return {
    market,

    gels:
      engine.raceKit.energy.gels > 0
        ? products.gels.slice(0, 3)
        : [],

    drinkMix:
      engine.raceKit.energy.carbDrinkServings > 0
        ? products.drinkMix.slice(0, 3)
        : [],

    electrolyteDrink:
      engine.raceKit.hydration.electrolyteDrinkLiters > 0
        ? products.electrolyteDrink.slice(0, 3)
        : [],

    saltCapsules:
      engine.raceKit.electrolytes.saltCapsules > 0
        ? products.saltCapsules.slice(0, 3)
        : [],

    electrolyteTabs:
      engine.raceKit.electrolytes.electrolyteTabs > 0
        ? products.electrolyteTabs.slice(0, 2)
        : [],

    bars:
      engine.raceKit.energy.bars > 0
        ? products.bars.slice(0, 3)
        : [],

    realFood:
      engine.raceKit.energy.realFoodServings > 0
        ? products.realFood
        : [],

    bcaa:
      engine.raceKit.extras.bcaaServings > 0
        ? products.bcaa
        : [],
  }
}