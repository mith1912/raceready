import { LucideIcon } from "lucide-react"
import InfoTooltip from "./InfoTooltip"

type Option<T extends string> = {
  value: T
  label: string
  description: string
  icon: LucideIcon
  color?: string
}

export default function CompactMultiSelect<T extends string>({
  title,
  tooltip,
  value,
  options,
  onChange,
}: {
  title: string
  tooltip?: string
  value: T[]
  options: Option<T>[]
  onChange: (value: T[]) => void
}) {
  function toggle(v: T) {
    onChange(
      value.includes(v)
        ? value.filter((item) => item !== v)
        : [...value, v]
    )
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
        {title}
        {tooltip && <InfoTooltip content={tooltip} />}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value.includes(option.value)
          const Icon = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition",
                active
                  ? "border-emerald-400 bg-emerald-400/10 text-white"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-4 w-4",
                  active
                    ? option.color ?? "text-emerald-300"
                    : "text-zinc-500",
                ].join(" ")}
              />
              <span>{option.label}</span>
              <InfoTooltip content={option.description} />
            </button>
          )
        })}
      </div>
    </div>
  )
}