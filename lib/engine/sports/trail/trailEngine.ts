import { RaceInput } from "../../../types";
import { EngineResult } from "../../type";
import { NUTRITION_CONFIG } from "../../../config/nutrition.config";
import { TRAIL_CONFIG } from "../../../config/trail.config";
import { getHydrationBase, getSodiumRate } from "../../shared/environment";
import { splitCarbs } from "../../shared/fuel";
import { buildElectrolyteOptions } from "../../shared/electrolyte";
import { addElectrolyteTimeline } from "../../shared/timeline"

export function generateTrailPlan(input: RaceInput): EngineResult {
  const { user, race, env, trail } = input;

  const elevation = trail?.elevation_gain_m ?? 0;
  const tech = trail?.technical_level ?? "moderate";
  const aidStation = trail?.aid_station ?? "normal";

  const elevationLevel =
    elevation < 500
      ? "low"
      : elevation < 1500
        ? "medium"
        : elevation < 3000
          ? "high"
          : "extreme";

  let carbRate = NUTRITION_CONFIG.carbs.perHour[user.experience_level];

  carbRate *= TRAIL_CONFIG.elevationMultiplier[elevationLevel];

  const totalCarbs = carbRate * race.expected_time_hours;

  const hydrationMultiplier = TRAIL_CONFIG.technicalMultiplier[tech];

  const totalHydration =
    getHydrationBase(env.temperature_c) *
    race.expected_time_hours *
    hydrationMultiplier;

  const totalSodium =
    getSodiumRate(env.temperature_c) * race.expected_time_hours;

  const fuel = splitCarbs(totalCarbs, race.expected_time_hours);

  let gels = fuel.gels;

  if (user.stomach_tolerance === "low") {
    gels = Math.floor(gels * 0.85);
  }
  const electrolyteOptions = buildElectrolyteOptions({
    totalSodium,
    gels,
    bars: fuel.bars,
    drinkMixServings: fuel.drinkMixServings,
    preferredSource: input.nutrition?.electrolyteSource,
  });

  
const saltTabs = electrolyteOptions.options.saltTabs
const tableSaltGrams = electrolyteOptions.options.tableSaltGrams
const sportsDrink500mlBottles =
  electrolyteOptions.options.sportsDrink500mlBottles

const bcaaServings = input.nutrition?.useBcaa ? 1 : 0

  const carryCapacityMl =
    aidStation === "rare" ? 1500 : aidStation === "normal" ? 1000 : 500;

  const bottles = Math.ceil(carryCapacityMl / 500);

  const timeline = buildTrailTimeline({
    hours: race.expected_time_hours,
    gels,
    bars: fuel.bars,
    durationIsUltra: race.expected_time_hours >= 10,
  });
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
      gels,
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
    electrolyteOptions,
    warnings: [
      ...(env.temperature_c > 28 ? ["hot_weather"] : []),
      "trail_unpredictable",
      ...(race.expected_time_hours >= 10 ? ["ultra_real_food"] : []),
      ...(aidStation === "rare" ? ["rare_aid_station"] : []),
    ],

    packingList: [
      "energy_gels",
      "drink_mix",
      "energy_bars",
      "salt_tabs",
      "sports_drink",
      "emergency_bar",
      "trail_snacks",
      ...(race.expected_time_hours >= 10 ? ["real_food"] : []),
      ...(input.nutrition?.electrolyteSource === "table_salt"
        ? ["table_salt"]
        : []),
      ...(input.nutrition?.useBcaa ? ["bcaa"] : []),
    ],
    sportMeta: {
      sportType: "trail",
    },
  };
}

function buildTrailTimeline(params: {
  hours: number;
  gels: number;
  bars: number;
  durationIsUltra: boolean;
}): EngineResult["timeline"] {
  const totalMinutes = params.hours * 60;
  const timeline: EngineResult["timeline"] = [];

  if (params.gels > 0) {
    const gelInterval = totalMinutes / params.gels;

    for (let i = 0; i < params.gels; i++) {
      timeline.push({
        minute: Math.round(i * gelInterval),
        type: "gel",
        labelKey: "timeline_gel",
      });
    }
  }

  if (params.bars > 0) {
    const barInterval = totalMinutes / params.bars;

    for (let i = 0; i < params.bars; i++) {
      timeline.push({
        minute: Math.round(i * barInterval),
        type: "bar",
        labelKey: "timeline_bar",
      });
    }
  }

  if (params.durationIsUltra) {
    for (let minute = 240; minute < totalMinutes; minute += 240) {
      timeline.push({
        minute,
        type: "food",
        labelKey: "timeline_food",
      });
    }
  }

  timeline.sort((a, b) => a.minute - b.minute);

  return timeline;
}
