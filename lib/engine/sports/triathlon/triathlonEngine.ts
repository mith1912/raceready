import { RaceInput } from "../../../types";
import { EngineResult } from "../../type";
import { NUTRITION_CONFIG } from "../../../config/nutrition.config";
import { getHydrationBase, getSodiumRate } from "../../shared/environment";
import { splitCarbs } from "../../shared/fuel";
import { buildElectrolyteOptions } from "../../shared/electrolyte";
import { addElectrolyteTimeline } from "../../shared/timeline"

export function generateTriathlonPlan(input: RaceInput): EngineResult {
  const { user, env, triathlon } = input;

  if (!triathlon) {
    throw new Error("Triathlon input is required for triathlon plan");
  }

  const swimHours = triathlon.swim_time_hours;
  const bikeHours = triathlon.bike_time_hours;
  const runHours = triathlon.run_time_hours;

  const t1Minutes = triathlon.t1_minutes ?? 5;
  const t2Minutes = triathlon.t2_minutes ?? 3;

  const totalHours =
    swimHours + bikeHours + runHours + (t1Minutes + t2Minutes) / 60;

  // =========================
  // 1. PHASE CARB RATES
  // =========================
  // Swim: no fueling during swim, only pre-race strategy handled in presenter/notes.
  // Bike: main fueling window, higher tolerance.
  // Run: lower tolerance due to GI stress.

  const baseCarbRate = NUTRITION_CONFIG.carbs.perHour[user.experience_level];

  const bikeCarbRate = baseCarbRate * 1.15;
  const runCarbRate = baseCarbRate * 0.85;

  const bikeCarbs = bikeCarbRate * bikeHours;
  const runCarbs = runCarbRate * runHours;

  const totalCarbs = bikeCarbs + runCarbs;

  // =========================
  // 2. HYDRATION BY PHASE
  // =========================

  const baseHydration = getHydrationBase(env.temperature_c);

  // Bike allows easier drinking.
  const bikeHydration = baseHydration * bikeHours * 1.15;

  // Run usually lower intake tolerance.
  const runHydration = baseHydration * runHours * 0.9;

  const totalHydration = bikeHydration + runHydration;

  // =========================
  // 3. SODIUM BY PHASE
  // =========================

  const sodiumRate = getSodiumRate(env.temperature_c);

  const bikeSodium = sodiumRate * bikeHours;
  const runSodium = sodiumRate * runHours;

  const totalSodium = bikeSodium + runSodium;

  // =========================
  // 4. FUEL SPLIT BY PHASE
  // =========================

  const bikeFuel = splitCarbs(bikeCarbs, bikeHours);
  const runFuel = splitCarbs(runCarbs, runHours);

  // On run, reduce bars/solid food because digestion is harder.
  const runBars = 0;
  const bars = bikeFuel.bars + runBars;

  const gels = bikeFuel.gels + runFuel.gels;

  const drinkMixServings = bikeFuel.drinkMixServings + runFuel.drinkMixServings;

  const realFoodCalories = 0;

  // =========================
  // 5. SODIUM FROM DRINK MIX
  // =========================

  const electrolyteOptions = buildElectrolyteOptions({
    totalSodium,
    gels,
    bars,
    drinkMixServings,
    preferredSource: input.nutrition?.electrolyteSource,
  });

  
const saltTabs = electrolyteOptions.options.saltTabs
const tableSaltGrams = electrolyteOptions.options.tableSaltGrams
const sportsDrink500mlBottles =
  electrolyteOptions.options.sportsDrink500mlBottles

const bcaaServings = input.nutrition?.useBcaa ? 1 : 0
  // =========================
  // 6. BOTTLES / CARRY
  // =========================

  // For triathlon, bottles are usually prepared for bike + optional run carry.
  const bikeBottles = Math.ceil(bikeHydration / 500);
  const runBottleEstimate = runHours >= 1.5 ? 1 : 0;

  const bottles = bikeBottles + runBottleEstimate;

  // =========================
  // 7. TIMELINE
  // =========================

  const timeline = buildTriathlonTimeline({
    swimMinutes: swimHours * 60,
    bikeMinutes: bikeHours * 60,
    runMinutes: runHours * 60,
    t1Minutes,
    t2Minutes,
    bikeGels: bikeFuel.gels,
    runGels: runFuel.gels,
    bikeBars: bikeFuel.bars,
    bikeDrinkServings: bikeFuel.drinkMixServings,
    runDrinkServings: runFuel.drinkMixServings,
  });
addElectrolyteTimeline({
  timeline,
  totalMinutes: totalHours * 60,
  electrolyteSource: input.nutrition?.electrolyteSource,
  saltTabs,
  sportsDrink500mlBottles,
  bcaaServings,
})

timeline.sort((a, b) => a.minute - b.minute);
  return {
    metrics: {
      totalCarbs,
      totalHydration,
      totalSodium,
    },

    items: {
      gels,
      drinkMixServings,
      bars,
      bottles,
      saltTabs,
      realFoodCalories,
      tableSaltGrams: electrolyteOptions.options.tableSaltGrams,

      sportsDrink500mlBottles:
        electrolyteOptions.options.sportsDrink500mlBottles,

      bcaaServings: input.nutrition?.useBcaa ? 1 : 0,
    },

    timeline,
    electrolyteOptions,

    warnings: [
      ...(env.temperature_c > 28 ? ["hot_weather"] : []),
      "tri_transition",
      "tri_bike_primary_fueling",
      "tri_run_gut_stress",
    ],

    packingList: [
      "energy_gels",
      "drink_mix",
      "energy_bars",
      "salt_tabs",
      "sports_drink",
      "bike_nutrition",
      ...(input.nutrition?.electrolyteSource === "table_salt"
        ? ["table_salt"]
        : []),
      ...(input.nutrition?.useBcaa ? ["bcaa"] : []),
      "emergency_bar",
    ],

    sportMeta: {
      sportType: "triathlon",
      phases: ["swim", "bike", "run"],
    },
  };
}

function buildTriathlonTimeline(params: {
  swimMinutes: number;
  bikeMinutes: number;
  runMinutes: number;
  t1Minutes: number;
  t2Minutes: number;
  bikeGels: number;
  runGels: number;
  bikeBars: number;
  bikeDrinkServings: number;
  runDrinkServings: number;
}): EngineResult["timeline"] {
  const timeline: EngineResult["timeline"] = [];

  const bikeStart = params.swimMinutes + params.t1Minutes;
  const runStart = bikeStart + params.bikeMinutes + params.t2Minutes;

  // T1
  timeline.push({
    minute: Math.round(params.swimMinutes),
    type: "transition",
    labelKey: "timeline_t1",
  });

  // Bike fuel: most nutrition happens here
  if (params.bikeGels > 0) {
    const interval = params.bikeMinutes / params.bikeGels;

    for (let i = 0; i < params.bikeGels; i++) {
      timeline.push({
        minute: Math.round(bikeStart + i * interval),
        type: "bike_fuel",
        labelKey: "timeline_bike_fuel",
      });
    }
  }

  if (params.bikeDrinkServings > 0) {
    const interval = params.bikeMinutes / params.bikeDrinkServings;

    for (let i = 0; i < params.bikeDrinkServings; i++) {
      timeline.push({
        minute: Math.round(bikeStart + i * interval),
        type: "drink",
        labelKey: "timeline_drink",
      });
    }
  }

  if (params.bikeBars > 0) {
    const interval = params.bikeMinutes / params.bikeBars;

    for (let i = 0; i < params.bikeBars; i++) {
      timeline.push({
        minute: Math.round(bikeStart + i * interval),
        type: "bar",
        labelKey: "timeline_bar",
      });
    }
  }

  // T2
  timeline.push({
    minute: Math.round(bikeStart + params.bikeMinutes),
    type: "transition",
    labelKey: "timeline_t2",
  });

  // Run fuel: gel/liquid focused
  if (params.runGels > 0) {
    const interval = params.runMinutes / params.runGels;

    for (let i = 0; i < params.runGels; i++) {
      timeline.push({
        minute: Math.round(runStart + i * interval),
        type: "run_fuel",
        labelKey: "timeline_run_fuel",
      });
    }
  }

  if (params.runDrinkServings > 0) {
    const interval = params.runMinutes / params.runDrinkServings;

    for (let i = 0; i < params.runDrinkServings; i++) {
      timeline.push({
        minute: Math.round(runStart + i * interval),
        type: "drink",
        labelKey: "timeline_drink",
      });
    }
  }

  timeline.sort((a, b) => a.minute - b.minute);

  return timeline;
}
