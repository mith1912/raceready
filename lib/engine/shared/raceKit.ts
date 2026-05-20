import { NUTRITION_CONFIG } from "../../config/nutrition.config"
import {
  AidStationDensity,
  EnergySource,
  ElectrolyteSource,
  HydrationSource,
  NutritionPreferences,
  RaceKit,
  ScientificTargets,
} from "../../types"
import { distributeBySelectedSources } from "./distribution"

export function buildRaceKit(params: {
  targets: ScientificTargets
  durationHours: number
  preferences?: NutritionPreferences
  aidStation?: AidStationDensity
}): RaceKit {
  const {
    targets,
    durationHours,
    preferences,
    aidStation = "normal",
  } = params

  const energy = buildEnergyKit(
    targets.carbs.totalG,
    preferences?.energySources
  )

  const hydration = buildHydrationKit({
    totalFluidMl: targets.fluid.totalMl,
    hydrationSources: preferences?.hydrationSources,
    aidStation,
  })

  const extras = {
    emergencyGels: getEmergencyGels(durationHours),
    bcaaServings:
      preferences?.useBcaa && durationHours >= 4
        ? NUTRITION_CONFIG.extras.bcaaServingsForLongRace
        : 0,
  }

  const sodiumBreakdown = buildSodiumBreakdown({
    totalSodiumMg: targets.sodium.totalMg,
    energy,
    hydration,
    bcaaServings: extras.bcaaServings,
  })

  const electrolytes = buildElectrolyteKit({
    remainingSodiumMg: sodiumBreakdown.remainingMg,
    electrolyteSources: preferences?.electrolyteSources,
  })

  return {
    energy,
    hydration,
    electrolytes,
    extras,
    sodiumBreakdown,
  }
}

function buildEnergyKit(
  totalCarbsG: number,
  selectedSources: EnergySource[] | undefined
) {
  const ratios = distributeBySelectedSources(
    selectedSources,
    NUTRITION_CONFIG.defaultDistribution.energy
  )

  return {
    gels: Math.ceil(
      (totalCarbsG * (ratios.gel ?? 0)) /
        NUTRITION_CONFIG.carbs.gelCarbs
    ),

    bars: Math.ceil(
      (totalCarbsG * (ratios.bar ?? 0)) /
        NUTRITION_CONFIG.carbs.barCarbs
    ),

    carbDrinkServings: Math.ceil(
      (totalCarbsG * (ratios.carb_drink ?? 0)) /
        NUTRITION_CONFIG.carbs.carbDrinkServingCarbs
    ),

    realFoodServings: Math.ceil(
      (totalCarbsG * (ratios.real_food ?? 0)) /
        NUTRITION_CONFIG.carbs.realFoodServingCarbs
    ),
  }
}

function buildHydrationKit(params: {
  totalFluidMl: number
  hydrationSources: HydrationSource[] | undefined
  aidStation: AidStationDensity
}) {
  const ratios = distributeBySelectedSources(
    params.hydrationSources,
    NUTRITION_CONFIG.defaultDistribution.hydration
  )

  const totalLiters = params.totalFluidMl / 1000

  const carryLiters =
    NUTRITION_CONFIG.bottles.carryLitersByAidStation[
      params.aidStation
    ]

  return {
    totalLiters: round1(totalLiters),

    waterLiters: round1(
      totalLiters * (ratios.water ?? 0)
    ),

    electrolyteDrinkLiters: round1(
      totalLiters * (ratios.electrolyte_drink ?? 0)
    ),

    carbDrinkLiters: round1(
      totalLiters * (ratios.carb_drink ?? 0)
    ),

    bottleCount500ml: Math.ceil(
      carryLiters /
        (NUTRITION_CONFIG.bottles.bottleMl / 1000)
    ),

    carryLiters,
  }
}

function buildSodiumBreakdown(params: {
  totalSodiumMg: number
  energy: RaceKit["energy"]
  hydration: RaceKit["hydration"]
  bcaaServings: number
}) {
  const sodium = NUTRITION_CONFIG.sodium.sodiumBySource

  const fromGelMg =
    params.energy.gels * sodium.gelMg

  const fromBarsMg =
    params.energy.bars * sodium.barMg

  const fromCarbDrinkMg =
    params.energy.carbDrinkServings *
    sodium.carbDrinkServingMg

  const fromElectrolyteDrinkMg =
    Math.ceil(
      params.hydration.electrolyteDrinkLiters / 0.5
    ) * sodium.electrolyteDrinkMgPer500ml

  const fromBcaaMg =
    params.bcaaServings * sodium.bcaaServingMg

  const coveredMg =
    fromGelMg +
    fromBarsMg +
    fromCarbDrinkMg +
    fromElectrolyteDrinkMg +
    fromBcaaMg

  const remainingMg = Math.max(
    0,
    params.totalSodiumMg - coveredMg
  )

  return {
    targetMg: Math.round(params.totalSodiumMg),
    fromGelMg,
    fromBarsMg,
    fromCarbDrinkMg,
    fromElectrolyteDrinkMg,
    fromBcaaMg,
    coveredMg,
    remainingMg: Math.round(remainingMg),
  }
}

function buildElectrolyteKit(params: {
  remainingSodiumMg: number
  electrolyteSources: ElectrolyteSource[] | undefined
}) {
  const ratios = distributeBySelectedSources(
    params.electrolyteSources,
    NUTRITION_CONFIG.defaultDistribution.electrolytes
  )

  return {
    saltCapsules: Math.ceil(
      (params.remainingSodiumMg *
        (ratios.salt_capsule ?? 0)) /
        NUTRITION_CONFIG.sodium.saltCapsuleMg
    ),

    electrolyteTabs: Math.ceil(
      (params.remainingSodiumMg *
        (ratios.electrolyte_tab ?? 0)) /
        NUTRITION_CONFIG.sodium.electrolyteTabMg
    ),
  }
}

function getEmergencyGels(durationHours: number) {
  if (durationHours >= 10) {
    return NUTRITION_CONFIG.extras.emergencyGels.long
  }

  if (durationHours >= 4) {
    return NUTRITION_CONFIG.extras.emergencyGels.medium
  }

  return NUTRITION_CONFIG.extras.emergencyGels.short
}

function round1(value: number) {
  return Math.round(value * 10) / 10
}