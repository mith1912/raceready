export const NUTRITION_CONFIG = {
  carbs: {
    perHour: {
      beginner: 40,
      intermediate: 60,
      advanced: 80,
      ultra: 90
    },

    gelCarbs: 25,
    maxCarbsPerHour: 90
  },

  hydration: {
    baseMlPerHour: {
      cool: 450,
      normal: 600,
      hot: 750,
      extreme: 900
    },

    heatMultiplier: {
      low: 1.0,
      medium: 1.15,
      high: 1.3,
      extreme: 1.5
    }
  },

  sodium: {
    mgPerHour: {
      cool: 400,
      normal: 600,
      hot: 900,
      extreme: 1200
    },

    tabletMg: 250
  },

  fuelStrategy: {
    maxGelIntervalMin: 45,
    minGelIntervalMin: 20
  }
}