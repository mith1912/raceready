import { RaceInput, EngineResult } from "../../../types"

import { buildRaceKit } from "../../shared/raceKit"
import { calculateScientificTargets } from "../../shared/target"
import { buildTimeline } from "../../shared/timeline"

export function generateTriathlonPlan(
  input: RaceInput
): EngineResult {
  const tri =
    input.triathlon!

  // =========================
  // PHASE DURATIONS
  // =========================

  const swimHours =
    tri.swim_time_hours

  const bikeHours =
    tri.bike_time_hours

  const runHours =
    tri.run_time_hours

  const t1Minutes =
    tri.t1_minutes ?? 5

  const t2Minutes =
    tri.t2_minutes ?? 5

  const totalHours =
    swimHours +
    bikeHours +
    runHours +
    (t1Minutes + t2Minutes) / 60

  // =========================
  // BIKE TARGETS
  // =========================

  const bikeTargets =
    calculateScientificTargets(
      input,
      bikeHours
    )

  // =========================
  // RUN TARGETS
  // =========================

  const runTargets =
    calculateScientificTargets(
      input,
      runHours
    )

  // =========================
  // COMBINED TARGETS
  // =========================

  const targets = {
    carbs: {
    perHourG: Math.round(
      (bikeTargets.carbs.perHourG +
        runTargets.carbs.perHourG) /
        2
    ),

    totalG:
      bikeTargets.carbs.totalG +
      runTargets.carbs.totalG,
  },

    fluid: {
      perHourMl:
        Math.round(
          (bikeTargets.fluid.perHourMl +
            runTargets.fluid.perHourMl) /
            2
        ),

      totalMl:
        bikeTargets.fluid.totalMl +
        runTargets.fluid.totalMl,
    },

    sodium: {
      perHourMg:
        Math.round(
          (bikeTargets.sodium.perHourMg +
            runTargets.sodium.perHourMg) /
            2
        ),

      totalMg:
        bikeTargets.sodium.totalMg +
        runTargets.sodium.totalMg,
    },
  }

  // =========================
  // BIKE KIT
  // =========================

  const bikeRaceKit = buildRaceKit({
    targets: bikeTargets,
    durationHours: bikeHours,
    preferences: input.nutrition,
    aidStation:
      tri.bike_hydration_access ??
      "normal",
  })

  // =========================
  // RUN KIT
  // =========================

  const runRaceKit = buildRaceKit({
    targets: runTargets,
    durationHours: runHours,
    preferences: input.nutrition,
    aidStation:
      tri.run_aid_station ??
      "normal",
  })

  // =========================
  // COMBINED RACE KIT
  // =========================

  const raceKit = {
    energy: {
      gels:
        bikeRaceKit.energy.gels +
        runRaceKit.energy.gels,

      bars:
        bikeRaceKit.energy.bars +
        runRaceKit.energy.bars,

      carbDrinkServings:
        bikeRaceKit.energy
          .carbDrinkServings +
        runRaceKit.energy
          .carbDrinkServings,

      realFoodServings:
        bikeRaceKit.energy
          .realFoodServings +
        runRaceKit.energy
          .realFoodServings,
    },

    hydration: {
      totalLiters:
        bikeRaceKit.hydration
          .totalLiters +
        runRaceKit.hydration
          .totalLiters,

      waterLiters:
        bikeRaceKit.hydration
          .waterLiters +
        runRaceKit.hydration
          .waterLiters,

      electrolyteDrinkLiters:
        bikeRaceKit.hydration
          .electrolyteDrinkLiters +
        runRaceKit.hydration
          .electrolyteDrinkLiters,

      carbDrinkLiters:
        bikeRaceKit.hydration
          .carbDrinkLiters +
        runRaceKit.hydration
          .carbDrinkLiters,

      bottleCount500ml: Math.max(
        bikeRaceKit.hydration
          .bottleCount500ml,
        runRaceKit.hydration
          .bottleCount500ml
      ),

      carryLiters: Math.max(
        bikeRaceKit.hydration
          .carryLiters,
        runRaceKit.hydration
          .carryLiters
      ),
    },

    electrolytes: {
      saltCapsules:
        bikeRaceKit.electrolytes
          .saltCapsules +
        runRaceKit.electrolytes
          .saltCapsules,

      electrolyteTabs:
        bikeRaceKit.electrolytes
          .electrolyteTabs +
        runRaceKit.electrolytes
          .electrolyteTabs,
    },

    extras: {
      emergencyGels:
        bikeRaceKit.extras
          .emergencyGels,

      bcaaServings:
        bikeRaceKit.extras
          .bcaaServings,
    },
    sodiumBreakdown: {
  targetMg:
    bikeRaceKit.sodiumBreakdown.targetMg +
    runRaceKit.sodiumBreakdown.targetMg,

  fromGelMg:
    bikeRaceKit.sodiumBreakdown.fromGelMg +
    runRaceKit.sodiumBreakdown.fromGelMg,

  fromBarsMg:
    bikeRaceKit.sodiumBreakdown.fromBarsMg +
    runRaceKit.sodiumBreakdown.fromBarsMg,

  fromCarbDrinkMg:
    bikeRaceKit.sodiumBreakdown.fromCarbDrinkMg +
    runRaceKit.sodiumBreakdown.fromCarbDrinkMg,

  fromElectrolyteDrinkMg:
    bikeRaceKit.sodiumBreakdown.fromElectrolyteDrinkMg +
    runRaceKit.sodiumBreakdown.fromElectrolyteDrinkMg,

  fromBcaaMg:
    bikeRaceKit.sodiumBreakdown.fromBcaaMg +
    runRaceKit.sodiumBreakdown.fromBcaaMg,

  coveredMg:
    bikeRaceKit.sodiumBreakdown.coveredMg +
    runRaceKit.sodiumBreakdown.coveredMg,

  remainingMg:
    bikeRaceKit.sodiumBreakdown.remainingMg +
    runRaceKit.sodiumBreakdown.remainingMg,
},
  }

  // =========================
  // TIMELINE
  // =========================

  const bikeTimeline =
    buildTimeline({
      durationHours: bikeHours,
      raceKit: bikeRaceKit,
      includeRealFood: true,
      phase: "bike",
    })

  const runTimeline =
    buildTimeline({
      durationHours: runHours,
      raceKit: runRaceKit,
      includeRealFood: false,
      phase: "run",
    }).map((item) => ({
      ...item,
      minute:
        item.minute +
        swimHours * 60 +
        bikeHours * 60 +
        t1Minutes +
        t2Minutes,
    }))

  const timeline = [
    {
      minute: Math.round(
        swimHours * 60
      ),
      type: "transition" as const,
      labelKey: "timeline_t1",
    },

    ...bikeTimeline.map((item) => ({
      ...item,
      minute:
        item.minute +
        swimHours * 60 +
        t1Minutes,
    })),

    {
      minute: Math.round(
        swimHours * 60 +
          bikeHours * 60 +
          t1Minutes
      ),
      type: "transition" as const,
      labelKey: "timeline_t2",
    },

    ...runTimeline,
  ].sort((a, b) => a.minute - b.minute)

  // =========================
  // WARNINGS
  // =========================

  const warnings = [
    "tri_transition",
  ]

  if (input.env.temperature_c > 28) {
    warnings.push("hot_weather")
  }

  return {
    targets,
    raceKit,
    timeline,
    warnings,

    sportMeta: {
      sportType: "triathlon",
      phases: [
        "swim",
        "bike",
        "run",
      ],
    },
  }
}