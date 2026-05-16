export const NUTRITION_CONFIG = {
  carbs: {
    perHour: {
      beginner: 45,
      intermediate: 60,
      advanced: 75,
    },
    gelCarbs: 25,
    carbDrinkServing: 30,
    barCarbs: 40,
  },

  hydration: {
    bottleMl: 500,
  },

  sodium: {
    tabletMg: 250,
    tableSaltSodiumPerGram: 390,
    sportsDrinkSodiumPer500ml: 250,
    drinkMixSodiumPerServing: 300,
    sodiumPerGel: 50,
    sodiumPerBar: 100,
  },

  fuelDistribution: {
    short: {
      gel: 0.7,
      drink: 0.3,
      bar: 0,
      realFood: 0,
    },

    medium: {
      gel: 0.45,
      drink: 0.3,
      bar: 0.2,
      realFood: 0.05,
    },

    ultra: {
      gel: 0.25,
      drink: 0.35,
      bar: 0.2,
      realFood: 0.2,
    },
  },

  bcaa: {
    servingsForLongRace: 1,
  },

  suggestedProducts: {
    vn: {
      gels: [
        {
          name: "Maurten Gel 100",
          category: "premium",
          note: "Dễ tiêu, phổ biến trong marathon/triathlon.",
        },
        {
          name: "GU Energy Gel",
          category: "popular",
          note: "Dễ mua, nhiều vị, hợp runner phong trào.",
        },
        {
          name: "Decathlon Aptonia Gel",
          category: "budget",
          note: "Giá dễ tiếp cận, dễ mua tại Decathlon.",
        },
      ],

      drinkMix: [
        {
          name: "Tailwind Nutrition",
          category: "ultra",
          note: "Hợp race dài vì có carb + electrolyte.",
        },
        {
          name: "Maurten Drink Mix",
          category: "premium",
          note: "Phù hợp race road/triathlon cường độ cao.",
        },
        {
          name: "Precision Fuel Drink Mix",
          category: "performance",
          note: "Dễ kiểm soát lượng carb mỗi giờ.",
        },
      ],

      sportsDrink: [
        {
          name: "Pocari Sweat",
          category: "easy_to_buy",
          note: "Dễ mua ở Việt Nam, hợp bù nước nhẹ.",
        },
        {
          name: "Revive",
          category: "easy_to_buy",
          note: "Dễ mua, phù hợp hydration cơ bản.",
        },
        {
          name: "100Plus",
          category: "easy_to_buy",
          note: "Phổ biến ở Đông Nam Á.",
        },
      ],

      electrolytes: [
        {
          name: "GU Roctane Electrolyte Capsules",
          category: "capsule",
          note: "Phù hợp race dài, dễ mang theo.",
        },
        {
          name: "SaltStick Caps",
          category: "capsule",
          note: "Phổ biến trong ultra/triathlon.",
        },
        {
          name: "Precision Hydration",
          category: "high_sodium",
          note: "Hợp người ra nhiều mồ hôi/mặn.",
        },
      ],

      bars: [
        {
          name: "Maurten Solid",
          category: "premium",
          note: "Dễ ăn hơn gel trong race dài.",
        },
        {
          name: "PowerBar",
          category: "popular",
          note: "Phù hợp bike/trail dài.",
        },
        {
          name: "Decathlon Aptonia Bar",
          category: "budget",
          note: "Dễ mua, giá tốt.",
        },
      ],

      realFood: [
        "Chuối",
        "Cơm nắm",
        "Khoai luộc",
        "Sandwich",
        "Bánh gạo",
        "Soup nóng",
        "Coca-Cola",
      ],

      bcaa: [
        {
          name: "Xtend BCAA",
          category: "popular",
          note: "Dùng tùy chọn, không thay thế carb.",
        },
        {
          name: "Rule1 BCAA",
          category: "popular",
          note: "Dùng như supplement hỗ trợ.",
        },
      ],
    },

    us: {
      gels: [
        { name: "Maurten Gel 100", category: "premium", note: "Popular for marathon and triathlon." },
        { name: "GU Energy Gel", category: "popular", note: "Widely available and affordable." },
        { name: "SIS GO Isotonic Gel", category: "popular", note: "Easy to take without water." },
      ],

      drinkMix: [
        { name: "Tailwind Nutrition", category: "ultra", note: "Popular for long trail and ultra races." },
        { name: "Maurten Drink Mix", category: "premium", note: "Good for high-carb race fueling." },
        { name: "Precision Fuel", category: "performance", note: "Useful for controlled carb intake." },
      ],

      sportsDrink: [
        { name: "Gatorade", category: "easy_to_buy", note: "Easy to find at aid stations." },
        { name: "Powerade", category: "easy_to_buy", note: "Common sports drink option." },
      ],

      electrolytes: [
        { name: "SaltStick Caps", category: "capsule", note: "Popular electrolyte capsule." },
        { name: "GU Roctane Electrolyte Capsules", category: "capsule", note: "Good for endurance racing." },
        { name: "Precision Hydration", category: "high_sodium", note: "Useful for heavy sweaters." },
      ],

      bars: [
        { name: "Clif Bar", category: "popular", note: "Easy to find in the US." },
        { name: "Maurten Solid", category: "premium", note: "Light and race-friendly." },
        { name: "PowerBar", category: "popular", note: "Classic endurance bar." },
      ],

      realFood: [
        "Banana",
        "Rice ball",
        "Boiled potato",
        "PB&J sandwich",
        "Pretzels",
        "Soup",
        "Coke",
      ],

      bcaa: [
        { name: "Xtend BCAA", category: "popular", note: "Optional supplement; not a carb source." },
      ],
    },

    eu: {
      gels: [
        { name: "Maurten Gel 100", category: "premium", note: "Widely used in endurance racing." },
        { name: "SIS GO Isotonic Gel", category: "popular", note: "Common in Europe." },
        { name: "High5 Energy Gel", category: "popular", note: "Accessible and budget friendly." },
      ],

      drinkMix: [
        { name: "Maurten Drink Mix", category: "premium", note: "Popular for marathon/triathlon." },
        { name: "SIS Beta Fuel", category: "performance", note: "High-carb drink option." },
        { name: "Precision Fuel", category: "performance", note: "Good for carb planning." },
      ],

      sportsDrink: [
        { name: "Powerade", category: "easy_to_buy", note: "Easy to find." },
        { name: "Isostar", category: "popular", note: "Common in European markets." },
      ],

      electrolytes: [
        { name: "SaltStick Caps", category: "capsule", note: "Popular in endurance sports." },
        { name: "Precision Hydration", category: "high_sodium", note: "Good for heavy sweaters." },
      ],

      bars: [
        { name: "Maurten Solid", category: "premium", note: "Race-friendly solid fuel." },
        { name: "PowerBar", category: "popular", note: "Common in Europe." },
        { name: "High5 Energy Bar", category: "popular", note: "Accessible option." },
      ],

      realFood: [
        "Banana",
        "Rice cake",
        "Boiled potato",
        "Sandwich",
        "Pretzels",
        "Soup",
        "Coke",
      ],

      bcaa: [
        { name: "Xtend BCAA", category: "popular", note: "Optional supplement." },
      ],
    },
  },
} as const