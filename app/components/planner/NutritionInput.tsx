import {
  BatteryCharging,
  Beef,
  Candy,
  Droplets,
  FlaskConical,
  GlassWater,
  Pill,
  Sandwich,
} from "lucide-react"
import CompactMultiSelect from "./CompactMultiSelect"
import FieldCard from "./FieldCard"
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
    <FieldCard
      title={vi ? "Dinh dưỡng bạn muốn dùng" : "Nutrition preference"}
      tooltip={
        vi
          ? "Chọn nhanh các loại bạn dự định dùng. Mô tả chi tiết nằm ở dấu ?."
          : "Quickly select what you plan to use. Details are behind the ? icon."
      }
    >
      <div className="space-y-5">
        <CompactMultiSelect
          title={vi ? "Năng lượng" : "Energy"}
          tooltip={
            vi
              ? "Các nguồn carb dạng ăn. Drink mix năng lượng được tính trong phần Nước uống để tránh trùng."
              : "Food-like carb sources. Fuel drink is counted under Hydration to avoid duplication."
          }
          value={form.energySources}
          onChange={(value: PlannerForm["energySources"]) =>
            update("energySources", value)
          }
          options={[
            {
              value: "gel",
              label: "Gel",
              description: vi
                ? "Gel năng lượng, dễ mang và dễ tính liều."
                : "Energy gel, easy to carry and dose.",
              icon: BatteryCharging,
              color: "text-emerald-300",
            },
            {
              value: "bar",
              label: vi ? "Bar" : "Bar",
              description: vi
                ? "Thanh năng lượng, hợp race dài để đỡ ngán gel."
                : "Energy bar, useful for long races.",
              icon: Sandwich,
              color: "text-orange-300",
            },
            {
              value: "real_food",
              label: vi ? "Đồ ăn thật" : "Real food",
              description: vi
                ? "Chuối, cơm nắm, sandwich, khoai..."
                : "Banana, rice ball, sandwich, potato...",
              icon: Beef,
              color: "text-purple-300",
            },
          ]}
        />

        <CompactMultiSelect
          title={vi ? "Nước uống" : "Hydration"}
          tooltip={
            vi
              ? "Nước lọc, nước điện giải và drink mix năng lượng. Đây là các nguồn chất lỏng."
              : "Water, electrolyte drink and fuel drink. These are fluid sources."
          }
          value={form.hydrationSources}
          onChange={(value) =>
            update("hydrationSources", value as PlannerForm["hydrationSources"])
          }
          options={[
            {
              value: "water",
              label: vi ? "Nước lọc" : "Water",
              description: vi
                ? "Nước lọc để refill ở aid station."
                : "Plain water for refill.",
              icon: Droplets,
              color: "text-sky-300",
            },
            {
              value: "electrolyte_drink",
              label: vi ? "Điện giải" : "Electrolyte",
              description: vi
                ? "Pocari, Revive, 100PLUS... chủ yếu bù nước và sodium."
                : "Pocari, Gatorade, Powerade... mainly fluid and sodium.",
              icon: GlassWater,
              color: "text-cyan-300",
            },
            {
              value: "carb_drink",
              label: vi ? "Bột năng lượng" : "Fuel drink",
              description: vi
                ? "Tailwind, Maurten Drink Mix, Skratch... cung cấp carb + nước, có thể giảm gel."
                : "Tailwind, Maurten Drink Mix, Skratch... provides carbs + fluid and can reduce gels.",
              icon: FlaskConical,
              color: "text-emerald-300",
            },
          ]}
        />

        <CompactMultiSelect
          title={vi ? "Muối & điện giải" : "Salt & electrolytes"}
          tooltip={
            vi
              ? "Chỉ chọn dạng viên ở đây. Nước điện giải đã nằm ở phần Nước uống."
              : "Only capsules/tablets here. Electrolyte drink is already under Hydration."
          }
          value={form.electrolyteSources}
          onChange={(value: PlannerForm["electrolyteSources"]) =>
            update("electrolyteSources", value)
          }
          options={[
            {
              value: "salt_capsule",
              label: vi ? "Viên muối" : "Salt caps",
              description: vi
                ? "GU Roctane, SaltStick, Precision... dùng để bù sodium."
                : "GU Roctane, SaltStick, Precision... sodium support.",
              icon: Candy,
              color: "text-yellow-300",
            },
            {
              value: "electrolyte_tab",
              label: vi ? "Viên điện giải" : "Tabs",
              description: vi
                ? "Viên sủi/viên điện giải, thường dùng pha nước."
                : "Electrolyte tablets, often mixed with water.",
              icon: Pill,
              color: "text-lime-300",
            },
          ]}
        />

        <label className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3">
          <div>
            <div className="text-sm font-medium text-white">BCAA</div>
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
      </div>
    </FieldCard>
  )
}