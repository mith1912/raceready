"use client"

import { HelpCircle } from "lucide-react"
import { useState } from "react"

export default function InfoTooltip({
  content,
}: {
  content: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="text-zinc-500 hover:text-emerald-300"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>

      {open && (
        <span className="absolute left-1/2 top-5 z-50 w-56 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-xs leading-5 text-zinc-300 shadow-2xl">
          {content}
        </span>
      )}
    </span>
  )
}