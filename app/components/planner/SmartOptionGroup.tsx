type Option<T extends string> = {
  value: T
  label: string
  icon?: string
  description?: string
}

type Props<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  columns?: "2" | "3"
}

export default function SmartOptionGroup<T extends string>({
  value,
  options,
  onChange,
  columns = "3",
}: Props<T>) {
  return (
    <div
      className={
        columns === "2"
          ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
          : "grid grid-cols-1 gap-2 sm:grid-cols-3"
      }
    >
      {options.map((option) => {
        const active = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "rounded-xl border p-3 text-left transition",
              active
                ? "border-emerald-400 bg-emerald-400/10 text-white"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              {option.icon && (
                <span className="text-base">{option.icon}</span>
              )}

              <span className="text-sm font-semibold">
                {option.label}
              </span>
            </div>

            {option.description && (
              <div className="mt-1 text-xs leading-4 text-zinc-500">
                {option.description}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}