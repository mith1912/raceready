// import { ProductItem, SuggestedProducts } from "./resultTypes"

import { ProductItem, SuggestedProducts } from "./resultTypes"

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

  const sections: ProductSection[] = [
    {
      key: "gels",
      title: vi ? "Gel năng lượng" : "Gels",
      items: data.gels ?? [],
    },
    {
      key: "drinkMix",
      title: vi ? "Bột năng lượng" : "Carb drink",
      items: data.drinkMix ?? [],
    },
    {
      key: "electrolyteDrink",
      title: vi ? "Nước điện giải" : "Electrolyte drink",
      items: data.electrolyteDrink ?? [],
    },
    {
      key: "saltCapsules",
      title: vi ? "Viên muối" : "Salt capsules",
      items: data.saltCapsules ?? [],
    },
    {
      key: "electrolyteTabs",
      title: vi ? "Viên điện giải" : "Electrolyte tabs",
      items: data.electrolyteTabs ?? [],
    },
    {
      key: "bars",
      title: vi ? "Thanh năng lượng" : "Bars",
      items: data.bars ?? [],
    },
    {
      key: "realFood",
      title: vi ? "Đồ ăn thật" : "Real food",
      items: data.realFood ?? [],
    },
    {
      key: "bcaa",
      title: "BCAA",
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