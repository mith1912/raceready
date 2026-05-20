type Option<T extends string> = {
  value: T
  icon: string
  label: string
  description?: string
}

type Props<T extends string> = {
  value: T[]
  options: Option<T>[]
  onChange: (value: T[]) => void
}

export default function MultiSelectCards<T extends string>({
  value,
  options,
  onChange,
}: Props<T>) {
  function toggle(optionValue: T) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue))
      return
    }

    onChange([...value, optionValue])
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = value.includes(option.value)

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={[
              "rounded-xl border p-3 text-left transition",
              active
                ? "border-emerald-400 bg-emerald-400/10 text-white"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span>{option.icon}</span>

                <span className="text-sm font-semibold">
                  {option.label}
                </span>
              </div>

              <div
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                  active
                    ? "border-emerald-400 bg-emerald-400 text-black"
                    : "border-zinc-700 text-zinc-600",
                ].join(" ")}
              >
                {active ? "✓" : ""}
              </div>
            </div>

            {option.description && (
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {option.description}
              </p>
            )}
          </button>
        )
      })}
    </div>
  )
}