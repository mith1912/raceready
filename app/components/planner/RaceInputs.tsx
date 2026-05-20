import FieldCard from "./FieldCard"
import InputWithSuffix from "./InputWithSuffix"
import SmartOptionGroup from "./SmartOptionGroup"
import TooltipLabel from "./TooltipLabel"
import { PlannerForm } from "./types"

type Props = {
  form: PlannerForm
  setForm: React.Dispatch<React.SetStateAction<PlannerForm>>
}

export default function RaceInputs({ form, setForm }: Props) {
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
      <RunnerProfileSection form={form} update={update} vi={vi} />

      {form.sportType === "triathlon" ? (
        <TriathlonRaceSection form={form} update={update} vi={vi} />
      ) : (
        <RoadTrailRaceSection form={form} update={update} vi={vi} />
      )}

      {form.sportType === "trail" && (
        <TrailDetailsSection form={form} update={update} vi={vi} />
      )}

      <EnvironmentSection form={form} update={update} vi={vi} />
    </div>
  )
}

function RunnerProfileSection({
  form,
  update,
  vi,
}: {
  form: PlannerForm
  update: <K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) => void
  vi: boolean
}) {
  return (
    <FieldCard
      title={vi ? "Hồ sơ vận động viên" : "Runner profile"}
      tooltip={
        vi
          ? "Dùng để ước tính nhu cầu carb, nước và sodium."
          : "Used to estimate carb, fluid and sodium needs."
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InputWithSuffix
          label={vi ? "Cân nặng" : "Weight"}
          tooltip={
            vi
              ? "Dùng làm tham khảo cho nhu cầu dinh dưỡng."
              : "Used as a reference for nutrition estimates."
          }
          value={form.weight_kg}
          suffix="kg"
          onChange={(v) => update("weight_kg", v)}
        />
      </div>

      <div className="mt-4">
        <TooltipLabel
          label={vi ? "Kinh nghiệm" : "Experience"}
          tooltip={
            vi
              ? "Mức kinh nghiệm ảnh hưởng tới khả năng nạp carb mỗi giờ."
              : "Experience affects how much carb you can usually handle per hour."
          }
        />

        <SmartOptionGroup
          value={form.experience_level}
          onChange={(v) => update("experience_level", v)}
          options={[
            {
              value: "beginner",
              icon: "🟢",
              label: vi ? "Mới" : "Beginner",
              description: vi ? "Ít race dài." : "New to long races.",
            },
            {
              value: "intermediate",
              icon: "🟡",
              label: vi ? "Trung bình" : "Intermediate",
              description: vi
                ? "Đã có kinh nghiệm race."
                : "Some race experience.",
            },
            {
              value: "advanced",
              icon: "🔴",
              label: vi ? "Kinh nghiệm" : "Advanced",
              description: vi
                ? "Đã tập nạp carb tốt."
                : "Well-trained fueling.",
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <TooltipLabel
          label={vi ? "Dạ dày" : "Gut tolerance"}
          tooltip={
            vi
              ? "Khả năng chịu gel, nước carb và đồ ngọt khi vận động lâu."
              : "How well you handle gels, carb drink and sweet foods during long efforts."
          }
        />

        <SmartOptionGroup
          value={form.stomach_tolerance}
          onChange={(v) => update("stomach_tolerance", v)}
          options={[
            {
              value: "low",
              icon: "😵‍💫",
              label: vi ? "Nhạy cảm" : "Sensitive",
              description: vi ? "Dễ đầy bụng." : "GI issues.",
            },
            {
              value: "medium",
              icon: "🙂",
              label: vi ? "Ổn" : "Normal",
              description: vi ? "Ăn uống ổn." : "Usually fine.",
            },
            {
              value: "high",
              icon: "💪",
              label: vi ? "Tốt" : "Strong",
              description: vi ? "Chịu carb tốt." : "Handles carbs well.",
            },
          ]}
        />
      </div>
    </FieldCard>
  )
}

function RoadTrailRaceSection({
  form,
  update,
  vi,
}: {
  form: PlannerForm
  update: <K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) => void
  vi: boolean
}) {
  return (
    <FieldCard
      title={vi ? "Thông tin race" : "Race basics"}
      tooltip={
        vi
          ? "Cự ly và thời gian dự kiến hoàn thành."
          : "Distance and expected finish time."
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <InputWithSuffix
          label={vi ? "Cự ly" : "Distance"}
          tooltip={vi ? "Tổng cự ly race." : "Total race distance."}
          value={form.distance_km}
          suffix="km"
          step={0.1}
          onChange={(v) => update("distance_km", v)}
        />

        <InputWithSuffix
          label={vi ? "Thời gian" : "Time"}
          tooltip={
            vi
              ? "Thời gian bạn dự kiến hoàn thành."
              : "Your expected finish time."
          }
          value={form.expected_time_hours}
          suffix={vi ? "giờ" : "hr"}
          step={0.1}
          onChange={(v) => update("expected_time_hours", v)}
        />
      </div>
    </FieldCard>
  )
}

function TrailDetailsSection({
  form,
  update,
  vi,
}: {
  form: PlannerForm
  update: <K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) => void
  vi: boolean
}) {
  return (
    <FieldCard
      title="Trail details"
      tooltip={
        vi
          ? "Trail cần tính thêm độ cao, địa hình và aid station."
          : "Trail needs elevation, terrain and aid station details."
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InputWithSuffix
          label={vi ? "Elevation gain" : "Elevation gain"}
          tooltip={
            vi
              ? "Tổng độ cao tích lũy của race."
              : "Total elevation gain."
          }
          value={form.elevation_gain_m}
          suffix="m"
          onChange={(v) => update("elevation_gain_m", v)}
        />

        <label>
          <TooltipLabel
            label={vi ? "Địa hình" : "Terrain"}
            tooltip={
              vi
                ? "Địa hình càng kỹ thuật, càng khó ăn/uống đều."
                : "Technical terrain makes steady fueling harder."
            }
          />

          <select
            value={form.technical_level}
            onChange={(e) =>
              update(
                "technical_level",
                e.target.value as PlannerForm["technical_level"]
              )
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white"
          >
            <option value="easy">{vi ? "Dễ" : "Easy"}</option>
            <option value="moderate">{vi ? "Vừa" : "Moderate"}</option>
            <option value="hard">{vi ? "Khó" : "Hard"}</option>
          </select>
        </label>

        <label>
          <TooltipLabel
            label="Aid station"
            tooltip={
              vi
                ? "Aid station thưa thì cần mang nhiều bình nước hơn."
                : "Rare aid stations require more carrying capacity."
            }
          />

          <select
            value={form.aid_station}
            onChange={(e) =>
              update(
                "aid_station",
                e.target.value as PlannerForm["aid_station"]
              )
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white"
          >
            <option value="frequent">{vi ? "Dày" : "Frequent"}</option>
            <option value="normal">{vi ? "Vừa" : "Normal"}</option>
            <option value="rare">{vi ? "Thưa" : "Rare"}</option>
          </select>
        </label>
      </div>
    </FieldCard>
  )
}

function TriathlonRaceSection({
  form,
  update,
  vi,
}: {
  form: PlannerForm
  update: <K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) => void
  vi: boolean
}) {
  return (
    <FieldCard
      title="Triathlon details"
      tooltip={
        vi
          ? "Nhập riêng từng môn để tính dinh dưỡng chính xác hơn."
          : "Enter each leg separately for better fueling."
      }
    >
      <div className="space-y-4">
        <TriathlonLeg
          title="🏊 Swim"
          distanceLabel={vi ? "Cự ly swim" : "Swim distance"}
          timeLabel={vi ? "Thời gian swim" : "Swim time"}
          distance={form.swim_distance_km}
          time={form.swim_time_hours}
          onDistanceChange={(v) => update("swim_distance_km", v)}
          onTimeChange={(v) => update("swim_time_hours", v)}
          vi={vi}
        />

        <TriathlonLeg
          title="🚴 Bike"
          distanceLabel={vi ? "Cự ly bike" : "Bike distance"}
          timeLabel={vi ? "Thời gian bike" : "Bike time"}
          distance={form.bike_distance_km}
          time={form.bike_time_hours}
          onDistanceChange={(v) => update("bike_distance_km", v)}
          onTimeChange={(v) => update("bike_time_hours", v)}
          vi={vi}
        />

        <label className="block">
          <TooltipLabel
            label={vi ? "Tiếp nước bike" : "Bike hydration access"}
            tooltip={
              vi
                ? "Bike dễ mang nước hơn run, nhưng vẫn cần biết khả năng refill."
                : "Bike is easier to carry fluid, but refill access still matters."
            }
          />

          <select
            value={form.bike_hydration_access}
            onChange={(e) =>
              update(
                "bike_hydration_access",
                e.target.value as PlannerForm["bike_hydration_access"]
              )
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white"
          >
            <option value="frequent">{vi ? "Dày" : "Frequent"}</option>
            <option value="normal">{vi ? "Vừa" : "Normal"}</option>
            <option value="rare">{vi ? "Thưa" : "Rare"}</option>
          </select>
        </label>

        <TriathlonLeg
          title="🏃 Run"
          distanceLabel={vi ? "Cự ly run" : "Run distance"}
          timeLabel={vi ? "Thời gian run" : "Run time"}
          distance={form.run_distance_km}
          time={form.run_time_hours}
          onDistanceChange={(v) => update("run_distance_km", v)}
          onTimeChange={(v) => update("run_time_hours", v)}
          vi={vi}
        />

        <label className="block">
          <TooltipLabel
            label={vi ? "Aid station run" : "Run aid station"}
            tooltip={
              vi
                ? "Run thường phụ thuộc nhiều vào aid station."
                : "The run often depends heavily on aid stations."
            }
          />

          <select
            value={form.run_aid_station}
            onChange={(e) =>
              update(
                "run_aid_station",
                e.target.value as PlannerForm["run_aid_station"]
              )
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white"
          >
            <option value="frequent">{vi ? "Dày" : "Frequent"}</option>
            <option value="normal">{vi ? "Vừa" : "Normal"}</option>
            <option value="rare">{vi ? "Thưa" : "Rare"}</option>
          </select>
        </label>

        <div>
          <div className="mb-2 text-sm font-semibold text-zinc-300">
            Transition
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputWithSuffix
              label="T1"
              value={form.t1_minutes}
              suffix="min"
              step={1}
              onChange={(v) => update("t1_minutes", v)}
            />

            <InputWithSuffix
              label="T2"
              value={form.t2_minutes}
              suffix="min"
              step={1}
              onChange={(v) => update("t2_minutes", v)}
            />
          </div>
        </div>
      </div>
    </FieldCard>
  )
}

function TriathlonLeg({
  title,
  distanceLabel,
  timeLabel,
  distance,
  time,
  onDistanceChange,
  onTimeChange,
  vi,
}: {
  title: string
  distanceLabel: string
  timeLabel: string
  distance: number
  time: number
  onDistanceChange: (value: number) => void
  onTimeChange: (value: number) => void
  vi: boolean
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-zinc-300">
        {title}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InputWithSuffix
          label={distanceLabel}
          value={distance}
          suffix="km"
          step={0.1}
          onChange={onDistanceChange}
        />

        <InputWithSuffix
          label={timeLabel}
          value={time}
          suffix={vi ? "giờ" : "hr"}
          step={0.1}
          onChange={onTimeChange}
        />
      </div>
    </div>
  )
}

function EnvironmentSection({
  form,
  update,
  vi,
}: {
  form: PlannerForm
  update: <K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) => void
  vi: boolean
}) {
  return (
    <FieldCard
      title={vi ? "Thời tiết" : "Environment"}
      tooltip={
        vi
          ? "Nhiệt độ và độ ẩm ảnh hưởng mạnh tới nước và sodium."
          : "Temperature and humidity strongly affect fluid and sodium needs."
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <InputWithSuffix
          label={vi ? "Nhiệt độ" : "Temperature"}
          tooltip={
            vi
              ? "Trời nóng làm tăng nhu cầu nước và điện giải."
              : "Heat increases fluid and electrolyte needs."
          }
          value={form.temperature_c}
          suffix="°C"
          onChange={(v) => update("temperature_c", v)}
        />

        <InputWithSuffix
          label={vi ? "Độ ẩm" : "Humidity"}
          tooltip={
            vi
              ? "Độ ẩm cao làm cơ thể khó tản nhiệt hơn."
              : "High humidity makes cooling harder."
          }
          value={form.humidity}
          suffix="%"
          onChange={(v) => update("humidity", v)}
        />
      </div>
    </FieldCard>
  )
}