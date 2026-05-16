import { RaceInput } from "../../../types";
import { EngineResult } from "../../type";
import { NUTRITION_CONFIG } from "../../../config/nutrition.config";
import { getHydrationBase, getSodiumRate } from "../../shared/environment";
import { splitCarbs } from "../../shared/fuel";
import { buildElectrolyteOptions } from "../../shared/electrolyte";
import { addElectrolyteTimeline } from "../../shared/timeline"

export function generateRoadPlan(input: RaceInput): EngineResult {
  const { user, race, env } = input;

  const carbRate = NUTRITION_CONFIG.carbs.perHour[user.experience_level];

  const totalCarbs = carbRate * race.expected_time_hours;
  const totalHydration =
    getHydrationBase(env.temperature_c) * race.expected_time_hours;
  const totalSodium =
    getSodiumRate(env.temperature_c) * race.expected_time_hours;

  const fuel = splitCarbs(totalCarbs, race.expected_time_hours);

  //   const sodiumFromDrink =
  //     fuel.drinkMixServings * NUTRITION_CONFIG.sodium.sodiumPerDrinkMixServing

  const electrolyteOptions = buildElectrolyteOptions({
    totalSodium,
    gels: fuel.gels,
    bars: fuel.bars,
    drinkMixServings: fuel.drinkMixServings,
    preferredSource: input.nutrition?.electrolyteSource,
  });

  
const saltTabs = electrolyteOptions.options.saltTabs
const tableSaltGrams = electrolyteOptions.options.tableSaltGrams
const sportsDrink500mlBottles =
  electrolyteOptions.options.sportsDrink500mlBottles

const bcaaServings = input.nutrition?.useBcaa ? 1 : 0

  const bottles = Math.ceil(totalHydration / 500);

  const timeline = buildSimpleFuelTimeline(
    race.expected_time_hours,
    fuel.gels,
    fuel.bars,
  );
  addElectrolyteTimeline({
  timeline,
  totalMinutes: race.expected_time_hours * 60,
  electrolyteSource: input.nutrition?.electrolyteSource,
  saltTabs,
  sportsDrink500mlBottles,
  bcaaServings,
})

timeline.sort((a, b) => a.minute - b.minute)

  return {
    metrics: {
      totalCarbs,
      totalHydration,
      totalSodium,
    },

    items: {
      gels: fuel.gels,
      drinkMixServings: fuel.drinkMixServings,
      bars: fuel.bars,
      bottles,
      saltTabs,
      realFoodCalories: fuel.realFoodCalories,
      tableSaltGrams: electrolyteOptions.options.tableSaltGrams,

      sportsDrink500mlBottles:
        electrolyteOptions.options.sportsDrink500mlBottles,

      bcaaServings: input.nutrition?.useBcaa ? 1 : 0,
    },

    timeline,

    warnings: [...(env.temperature_c > 28 ? ["hot_weather"] : [])],

    packingList: [
      "energy_gels",
      "drink_mix",
      "energy_bars",
      "salt_tabs",
      "sports_drink",
      ...(input.nutrition?.electrolyteSource === "table_salt"
        ? ["table_salt"]
        : []),
      ...(input.nutrition?.useBcaa ? ["bcaa"] : []),
      "emergency_bar",
    ],
    electrolyteOptions,
    sportMeta: {
      sportType: "road",
    },
  };
}

function buildSimpleFuelTimeline(
  hours: number,
  gels: number,
  bars: number,
): EngineResult["timeline"] {
  const totalMinutes = hours * 60;
  const timeline: EngineResult["timeline"] = [];

  if (gels > 0) {
    const gelInterval = totalMinutes / gels;

    for (let i = 0; i < gels; i++) {
      timeline.push({
        minute: Math.round(i * gelInterval),
        type: "gel",
        labelKey: "timeline_gel",
      });
    }
  }

  if (bars > 0) {
    const barInterval = totalMinutes / bars;

    for (let i = 0; i < bars; i++) {
      timeline.push({
        minute: Math.round(i * barInterval),
        type: "bar",
        labelKey: "timeline_bar",
      });
    }
  }

  timeline.sort((a, b) => a.minute - b.minute);

  return timeline;
}
