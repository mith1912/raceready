import InfoTooltip from "./InfoTooltip"

export default function SelectField<T extends string>({
  label,
  tooltip,
  value,
  options,
  onChange,
}: {
  label: string
  tooltip?: string
  value: T
  options: {
    value: T
    label: string
  }[]
  onChange: (value: T) => void
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-zinc-200">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-emerald-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}