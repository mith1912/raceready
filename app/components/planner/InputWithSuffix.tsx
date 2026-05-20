import TooltipLabel from "./TooltipLabel"

type Props = {
  label: string
  tooltip?: string
  value: number
  suffix: string
  min?: number
  step?: number
  onChange: (value: number) => void
}

export default function InputWithSuffix({
  label,
  tooltip,
  value,
  suffix,
  min = 0,
  step = 1,
  onChange,
}: Props) {
  return (
    <label className="block">
      <TooltipLabel label={label} tooltip={tooltip} />

      <div className="flex overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
        />

        <div className="flex items-center border-l border-zinc-800 px-3 text-xs text-zinc-500">
          {suffix}
        </div>
      </div>
    </label>
  )
}