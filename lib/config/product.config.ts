import { Market } from "../types"

export type ProductItem = {
  name: string
  category?: string
  note?: string
}

export const PRODUCT_CONFIG: Record<
  Market,
  {
    gels: ProductItem[]
    drinkMix: ProductItem[]
    electrolyteDrink: ProductItem[]
    saltCapsules: ProductItem[]
    electrolyteTabs: ProductItem[]
    bars: ProductItem[]
    realFood: string[]
    bcaa: ProductItem[]
  }
> = {
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
        note: "Dễ mua, nhiều vị.",
      },
      {
        name: "Decathlon Aptonia Gel",
        category: "budget",
        note: "Giá dễ tiếp cận.",
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

    electrolyteDrink: [
      {
        name: "Pocari Sweat",
        category: "easy_to_buy",
        note: "Dễ mua ở Việt Nam.",
      },
      {
        name: "Revive",
        category: "easy_to_buy",
        note: "Phổ biến, dễ mua.",
      },
      {
        name: "100PLUS",
        category: "easy_to_buy",
        note: "Phổ biến ở Đông Nam Á.",
      },
    ],

    saltCapsules: [
      {
        name: "GU Roctane Electrolyte Capsules",
        category: "capsule",
        note: "Phù hợp race dài.",
      },
      {
        name: "SaltStick Caps",
        category: "capsule",
        note: "Phổ biến trong ultra/triathlon.",
      },
      {
        name: "Precision Hydration",
        category: "high_sodium",
        note: "Hợp người ra nhiều mồ hôi.",
      },
    ],

    electrolyteTabs: [
      {
        name: "Nuun Sport",
        category: "tablet",
        note: "Viên sủi dễ dùng.",
      },
      {
        name: "High5 Zero",
        category: "tablet",
        note: "Viên điện giải ít năng lượng.",
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
        note: "Tùy chọn, không thay thế carb.",
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
      { name: "Maurten Gel 100", category: "premium" },
      { name: "GU Energy Gel", category: "popular" },
      { name: "SIS GO Isotonic Gel", category: "popular" },
    ],
    drinkMix: [
      { name: "Tailwind Nutrition", category: "ultra" },
      { name: "Maurten Drink Mix", category: "premium" },
      { name: "Precision Fuel", category: "performance" },
    ],
    electrolyteDrink: [
      { name: "Gatorade", category: "easy_to_buy" },
      { name: "Powerade", category: "easy_to_buy" },
    ],
    saltCapsules: [
      { name: "SaltStick Caps", category: "capsule" },
      { name: "GU Roctane Electrolyte Capsules", category: "capsule" },
      { name: "Precision Hydration", category: "high_sodium" },
    ],
    electrolyteTabs: [
      { name: "Nuun Sport", category: "tablet" },
      { name: "High5 Zero", category: "tablet" },
    ],
    bars: [
      { name: "Clif Bar", category: "popular" },
      { name: "Maurten Solid", category: "premium" },
      { name: "PowerBar", category: "popular" },
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
      {
        name: "Xtend BCAA",
        category: "popular",
        note: "Optional supplement.",
      },
    ],
  },

  eu: {
    gels: [
      { name: "Maurten Gel 100", category: "premium" },
      { name: "SIS GO Isotonic Gel", category: "popular" },
      { name: "High5 Energy Gel", category: "popular" },
    ],
    drinkMix: [
      { name: "Maurten Drink Mix", category: "premium" },
      { name: "SIS Beta Fuel", category: "performance" },
      { name: "Precision Fuel", category: "performance" },
    ],
    electrolyteDrink: [
      { name: "Powerade", category: "easy_to_buy" },
      { name: "Isostar", category: "popular" },
    ],
    saltCapsules: [
      { name: "SaltStick Caps", category: "capsule" },
      { name: "Precision Hydration", category: "high_sodium" },
    ],
    electrolyteTabs: [
      { name: "Nuun Sport", category: "tablet" },
      { name: "High5 Zero", category: "tablet" },
    ],
    bars: [
      { name: "Maurten Solid", category: "premium" },
      { name: "PowerBar", category: "popular" },
      { name: "High5 Energy Bar", category: "popular" },
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
      {
        name: "Xtend BCAA",
        category: "popular",
        note: "Optional supplement.",
      },
    ],
  },
}