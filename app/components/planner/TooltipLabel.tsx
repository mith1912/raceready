"use client"

type Props = {
  label: string
  tooltip?: string
}

export default function TooltipLabel({ label, tooltip }: Props) {
  return (
    <div className="mb-2 flex items-center gap-1.5">
      <span className="text-sm font-medium text-zinc-200">
        {label}
      </span>

      {tooltip && (
        <div className="group relative">
          <button
            type="button"
            className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-700 text-[10px] text-zinc-500"
          >
            ?
          </button>

          <div className="absolute left-5 top-0 z-30 hidden w-56 rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-xs leading-5 text-zinc-300 shadow-xl group-hover:block">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}