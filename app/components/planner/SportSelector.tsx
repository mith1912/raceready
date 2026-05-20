import SmartOptionGroup from "./SmartOptionGroup"
import { SportType } from "./types"


type Props = {
  value: SportType
  onChange: (value: SportType) => void
  locale: "en" | "vi"
}

export default function SportSelector({
  value,
  onChange,
  locale,
}: Props) {
  const vi = locale === "vi"

  return (
    <SmartOptionGroup
      value={value}
      onChange={onChange}
      options={[
        {
          value: "road",
          icon: "🏃",
          label: "Road",
          description: vi
            ? "Marathon, half marathon."
            : "Marathon, half marathon.",
        },
        {
          value: "trail",
          icon: "⛰️",
          label: "Trail",
          description: vi
            ? "Trail, ultra, leo dốc."
            : "Trail, ultra, elevation.",
        },
        {
          value: "triathlon",
          icon: "🏊‍♂️",
          label: "Triathlon",
          description: vi
            ? "Swim, bike, run."
            : "Swim, bike, run.",
        },
      ]}
    />
  )
}