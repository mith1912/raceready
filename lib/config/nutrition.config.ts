export const NUTRITION_CONFIG = {
  carbs: {
    perHour: {
      beginner: 45,
      intermediate: 60,
      advanced: 75,
    },

    gelCarbs: 25,
    barCarbs: 40,
    carbDrinkServingCarbs: 30,
    realFoodServingCarbs: 60,
  },

  fluid: {
    normalMlPerHour: 550,
    hotMlPerHour: 700,
    veryHotMlPerHour: 850,
    humidityMultiplier: 1.1,
  },

  sodium: {
    normalMgPerHour: 500,
    hotMgPerHour: 700,
    veryHotMgPerHour: 850,

    saltCapsuleMg: 250,
    electrolyteTabMg: 200,
    electrolyteDrinkMgPer500ml: 250,
    sodiumBySource: {
      gelMg: 50,
      barMg: 100,
      carbDrinkServingMg: 300,
      electrolyteDrinkMgPer500ml: 250,
      bcaaServingMg: 100,
    },
  },

  bottles: {
    bottleMl: 500,

    carryLitersByAidStation: {
      frequent: 1,
      normal: 1.5,
      rare: 2,
    },
  },

  defaultDistribution: {
    energy: {
      gel: 0.35,
      bar: 0.2,
      carb_drink: 0.25,
      real_food: 0.2,
    },

    hydration: {
      water: 0.65,
      electrolyte_drink: 0.25,
      carb_drink: 0.1,
    },

    electrolytes: {
      salt_capsule: 0.7,
      electrolyte_tab: 0.3,
    },
  },

  extras: {
    emergencyGels: {
      short: 1,
      medium: 2,
      long: 3,
    },

    bcaaServingsForLongRace: 1,
  },
} as const;
