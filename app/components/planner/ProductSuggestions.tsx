// import { ProductItem, SuggestedProducts } from "./resultTypes"

import { ProductItem, SuggestedProducts } from "./resultTypes"
import { NUTRITION_CONFIG } from "../../../lib/config/nutrition.config"

// import {
//   ProductItem,
//   SuggestedProducts,
// } from "./resultTypes"

type ProductSection = {
  key: string
  title: string
  items: (ProductItem | string)[]
}

export default function ProductSuggestions({
  data,
  locale,
}: {
  data?: SuggestedProducts
  locale: "en" | "vi"
}) {
  if (!data) return null

  const vi = locale === "vi"

  const getSectionNutritionTitle = (key: string, vi: boolean) => {
    const c = NUTRITION_CONFIG.carbs
    const s = NUTRITION_CONFIG.sodium

    const fmt = (n?: number) => (n == null ? undefined : String(n))

    switch (key) {
      case "gels": {
        const carbs = fmt(c.gelCarbs)
        const sodium = fmt(s.sodiumBySource.gelMg)
        return carbs || sodium
          ? vi
            ? ` (khoảng ${carbs ?? "-"} g carb, ${sodium ?? "-"} mg muối / gói)`
            : ` (~${carbs ?? "-"} g carb, ${sodium ?? "-"} mg sodium / serving)`
          : ""
      }

      case "drinkMix": {
        const carbs = fmt(c.carbDrinkServingCarbs)
        const sodium = fmt(s.sodiumBySource.carbDrinkServingMg)
        return carbs || sodium
          ? vi
            ? ` (khoảng ${carbs ?? "-"} g carb, ${sodium ?? "-"} mg muối / serving)`
            : ` (~${carbs ?? "-"} g carb, ${sodium ?? "-"} mg sodium / serving)`
          : ""
      }

      case "electrolyteDrink": {
        const sodium = fmt(s.electrolyteDrinkMgPer500ml)
        return sodium
          ? vi
            ? ` (khoảng ${sodium} mg muối / 500ml)`
            : ` (~${sodium} mg sodium / 500ml)`
          : ""
      }

      case "saltCapsules": {
        const sodium = fmt(s.saltCapsuleMg)
        return sodium
          ? vi
            ? ` (khoảng ${sodium} mg muối / viên)`
            : ` (~${sodium} mg sodium / capsule)`
          : ""
      }

      case "electrolyteTabs": {
        const sodium = fmt(s.electrolyteTabMg)
        return sodium
          ? vi
            ? ` (khoảng ${sodium} mg muối / viên)`
            : ` (~${sodium} mg sodium / tablet)`
          : ""
      }

      case "bars": {
        const carbs = fmt(c.barCarbs)
        const sodium = fmt(s.sodiumBySource.barMg)
        return carbs || sodium
          ? vi
            ? ` (khoảng ${carbs ?? "-"} g carb, ${sodium ?? "-"} mg muối / thanh)`
            : ` (~${carbs ?? "-"} g carb, ${sodium ?? "-"} mg sodium / bar)`
          : ""
      }

      case "realFood": {
        const carbs = fmt(c.realFoodServingCarbs)
        return carbs
          ? vi
            ? ` (khoảng ${carbs} g carb / khẩu phần)`
            : ` (~${carbs} g carb / serving)`
          : ""
      }

      case "bcaa": {
        const sodium = fmt(s.sodiumBySource.bcaaServingMg)
        return sodium
          ? vi
            ? ` (khoảng ${sodium} mg muối / serving)`
            : ` (~${sodium} mg sodium / serving)`
          : ""
      }

      default:
        return ""
    }
  }

  const sections: ProductSection[] = [
    {
      key: "gels",
      title: (vi ? "Gel năng lượng" : "Gels") + getSectionNutritionTitle("gels", vi),
      items: data.gels ?? [],
    },
    {
      key: "drinkMix",
      title: (vi ? "Bột năng lượng" : "Carb drink") + getSectionNutritionTitle("drinkMix", vi),
      items: data.drinkMix ?? [],
    },
    {
      key: "electrolyteDrink",
      title: (vi ? "Nước điện giải" : "Electrolyte drink") + getSectionNutritionTitle("electrolyteDrink", vi),
      items: data.electrolyteDrink ?? [],
    },
    {
      key: "saltCapsules",
      title: (vi ? "Viên muối" : "Salt capsules") + getSectionNutritionTitle("saltCapsules", vi),
      items: data.saltCapsules ?? [],
    },
    {
      key: "electrolyteTabs",
      title: (vi ? "Viên điện giải" : "Electrolyte tabs") + getSectionNutritionTitle("electrolyteTabs", vi),
      items: data.electrolyteTabs ?? [],
    },
    {
      key: "bars",
      title: (vi ? "Thanh năng lượng" : "Bars") + getSectionNutritionTitle("bars", vi),
      items: data.bars ?? [],
    },
    {
      key: "realFood",
      title: (vi ? "Đồ ăn thật" : "Real food") + getSectionNutritionTitle("realFood", vi),
      items: data.realFood ?? [],
    },
    {
      key: "bcaa",
      title: "BCAA" + getSectionNutritionTitle("bcaa", vi),
      items: data.bcaa ?? [],
    },
  ].filter((section) => section.items.length > 0)

  if (sections.length === 0) return null

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <h3 className="text-sm font-semibold text-white">
        {vi ? "Gợi ý sản phẩm" : "Suggested products"}
      </h3>

      <div className="mt-3 space-y-4">
        {sections.map((section) => (
          <div key={section.key}>
            <div className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
              {section.title}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {section.items.slice(0, 4).map((item, index) => {
                const product: ProductItem =
                  typeof item === "string"
                    ? { name: item }
                    : item

                return (
                  <div
                    key={`${section.key}-${index}`}
                    className="rounded-xl bg-zinc-900 p-3"
                  >
                    <div className="text-sm font-medium text-zinc-100">
                      {product.name}
                    </div>

                    {product.note && (
                      <div className="mt-1 text-xs leading-5 text-zinc-500">
                        {product.note}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}