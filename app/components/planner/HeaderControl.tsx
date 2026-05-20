import { PlannerForm } from "./types"

type Props = {
  locale: PlannerForm["locale"]
  market: PlannerForm["market"]
  onLocaleChange: (value: PlannerForm["locale"]) => void
  onMarketChange: (value: PlannerForm["market"]) => void
}

export default function HeaderControls({
  locale,
  market,
  onLocaleChange,
  onMarketChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() =>
          onLocaleChange(locale === "vi" ? "en" : "vi")
        }
        className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-medium text-zinc-200"
      >
        {locale === "vi" ? "🇻🇳 VI" : "🇺🇸 EN"}
      </button>

      <select
        value={market}
        onChange={(e) =>
          onMarketChange(e.target.value as PlannerForm["market"])
        }
        className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-medium text-zinc-200"
      >
        <option value="vn">🇻🇳 VN</option>
        <option value="us">🇺🇸 US</option>
        <option value="eu">🇪🇺 EU</option>
      </select>
    </div>
  )
}