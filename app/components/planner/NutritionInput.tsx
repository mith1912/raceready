import FieldCard from "./FieldCard"
import MultiSelectCards from "./MultiSelectCard"

import { PlannerForm } from "./types"

type Props = {
  form: PlannerForm
  setForm: React.Dispatch<React.SetStateAction<PlannerForm>>
}

export default function NutritionInputs({ form, setForm }: Props) {
  const vi = form.locale === "vi"

  function update<K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-4">
      <FieldCard
        title={vi ? "Nguồn năng lượng" : "Energy preference"}
        tooltip={
          vi
            ? "Chọn những loại bạn muốn dùng trong race. Có thể chọn nhiều."
            : "Choose the fuel sources you want to use. You can select multiple."
        }
      >
        <MultiSelectCards
          value={form.energySources}
          onChange={(value) => update("energySources", value)}
          options={[
            {
              value: "gel",
              icon: "⚡",
              label: vi ? "Gel" : "Gel",
              description: vi ? "Nhanh, dễ tính." : "Fast and easy.",
            },
            {
              value: "bar",
              icon: "🍫",
              label: vi ? "Thanh năng lượng" : "Energy bar",
              description: vi
                ? "Hợp race dài, đỡ ngán."
                : "Good for longer races.",
            },
            {
              value: "real_food",
              icon: "🍙",
              label: vi ? "Đồ ăn thật" : "Real food",
              description: vi
                ? "Chuối, cơm nắm, sandwich."
                : "Banana, rice ball, sandwich.",
            },
          ]}
        />
      </FieldCard>

      <FieldCard
        title={vi ? "Nước uống" : "Hydration preference"}
        tooltip={
          vi
            ? "Chọn loại nước bạn thường dùng. Nước điện giải ở đây là Pocari, Revive, 100PLUS..."
            : "Choose what you usually drink. Electrolyte drink means Pocari, Gatorade, etc."
        }
      >
        <MultiSelectCards
          value={form.hydrationSources}
          onChange={(value) => update("hydrationSources", value)}
          options={[
            {
              value: "water",
              icon: "💧",
              label: vi ? "Nước lọc" : "Water",
              description: vi ? "Dễ refill." : "Easy to refill.",
            },
            {
              value: "electrolyte_drink",
              icon: "🥤",
              label: vi ? "Nước điện giải" : "Electrolyte drink",
              description: vi
                ? "Pocari, Revive, 100PLUS..."
                : "Pocari, Gatorade, Powerade...",
            },
            {
              value: "carb_drink",
              icon: "🧃",
              label: vi ? "Nước carb" : "Carb drink",
              description: vi
                ? "Vừa nước, vừa năng lượng."
                : "Fluid plus energy.",
            },
          ]}
        />
      </FieldCard>

      <FieldCard
        title={vi ? "Muối & điện giải" : "Salt & electrolytes"}
        tooltip={
          vi
            ? "Chỉ chọn dạng viên ở đây. Nước điện giải đã nằm trong phần Nước uống để tránh tính trùng."
            : "Only pill/capsule sources here. Electrolyte drink is in Hydration to avoid duplication."
        }
      >
        <MultiSelectCards
          value={form.electrolyteSources}
          onChange={(value) => update("electrolyteSources", value)}
          options={[
            {
              value: "salt_capsule",
              icon: "🧂",
              label: vi ? "Viên muối" : "Salt capsules",
              description: vi
                ? "GU Roctane, SaltStick..."
                : "SaltStick, GU Roctane...",
            },
            {
              value: "electrolyte_tab",
              icon: "💊",
              label: vi ? "Viên điện giải" : "Electrolyte tabs",
              description: vi
                ? "Viên sủi/viên điện giải."
                : "Electrolyte tablets.",
            },
          ]}
        />

        <label className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3">
          <div>
            <div className="text-sm font-medium text-white">🧬 BCAA</div>
            <div className="text-xs text-zinc-500">
              {vi
                ? "Tùy chọn, không thay thế carb."
                : "Optional, does not replace carbs."}
            </div>
          </div>

          <input
            type="checkbox"
            checked={form.useBcaa}
            onChange={(e) => update("useBcaa", e.target.checked)}
            className="h-5 w-5"
          />
        </label>
      </FieldCard>
    </div>
  )
}