import TimelinePreview from "./TimelinePreview";
import ProductSuggestions from "./ProductSuggestions";
import { RacePlanResult } from "./resultTypes";

type Props = {
  result: RacePlanResult;
};

export default function ResultView({ result }: Props) {
  const locale = result.meta.locale;

  return (
    <div className="space-y-4">
      <HeroResult result={result} />

      <RaceKitFrame result={result} />

      <TimelinePreview timeline={result.timeline} locale={locale} />

      <CalculationDetails result={result} />

      {result.notes.length > 0 && (
        <NotesCard notes={result.notes} locale={locale} />
      )}

      <ProductSuggestions data={result.suggestedProducts} locale={locale} />

      {result.warnings.length > 0 && <WarningsCard result={result} />}
    </div>
  );
}

function HeroResult({ result }: { result: RacePlanResult }) {
  const vi = result.meta.locale === "vi";

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-zinc-950 p-5">
      <div className="text-xs uppercase tracking-widest text-emerald-300">
        RaceReady Plan
      </div>

      <h2 className="mt-2 text-xl font-bold text-white">{result.headline}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <ContextPill label={result.meta.raceLabel} />
        <ContextPill
          label={`⏱ ${formatHours(result.meta.expectedTimeHours)}`}
        />
        <ContextPill
          label={
            vi
              ? `💧 ${result.raceKit.hydration.totalLiters}L tổng nước`
              : `💧 ${result.raceKit.hydration.totalLiters}L total fluids`
          }
        />
      </div>
    </div>
  );
}

function RaceKitFrame({ result }: { result: RacePlanResult }) {
  const vi = result.meta.locale === "vi";
  const kit = result.raceKit;
  const targets = result.targets;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
      <div>
        <h3 className="text-lg font-bold text-white">
          {vi ? "Chuẩn bị race" : "Race Kit"}
        </h3>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {vi
            ? "Những thứ cần chuẩn bị trước race day."
            : "What to prepare before race day."}
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <KitSection
          title={vi ? "Năng lượng" : "Energy"}
          icon="⚡"
          description={
            vi
              ? "Nguồn carb giúp duy trì năng lượng ổn định."
              : "Carbohydrate sources to maintain stable energy."
          }
          target={
            vi
              ? `Mục tiêu: ~${targets.carbs.perHourG}g carb/giờ`
              : `Target: ~${targets.carbs.perHourG}g carbs/hour`
          }
          items={[
            {
              icon: "⚡",
              label: vi ? "Gel" : "Gels",
              value: `${kit.energy.gels}`,
              unit: vi ? "gói" : "packs",
            },
            {
              icon: "🍫",
              label: vi ? "Thanh năng lượng" : "Energy bars",
              value: `${kit.energy.bars}`,
              unit: vi ? "thanh" : "bars",
            },
            {
              icon: "🧃",
              label: vi ? "Bột năng lượng" : "Carb drink",
              value: `${kit.energy.carbDrinkServings}`,
              unit: vi ? "phần" : "portions",
            },
            {
              icon: "🍙",
              label: vi ? "Đồ ăn thật" : "Real food",
              value: `${kit.energy.realFoodServings}`,
              unit: vi ? "phần" : "portions",
            },
          ]}
          note={
            vi
              ? "Nên xoay vòng các nguồn năng lượng để đỡ ngán."
              : "Rotate fuel types to reduce flavor fatigue."
          }
        />

        <KitSection
          title={vi ? "Nước uống" : "Hydration"}
          icon="💧"
          description={
            vi
              ? "Kế hoạch nước uống ước tính cho toàn race."
              : "Estimated fluid plan for the whole race."
          }
          target={
            vi
              ? `Tổng: ~${kit.hydration.totalLiters}L nước`
              : `Total: ~${kit.hydration.totalLiters}L fluids`
          }
          items={[
            {
              icon: "💧",
              label: vi ? "Nước lọc" : "Water",
              value: `${kit.hydration.waterLiters}`,
              unit: "L",
            },
            {
              icon: "🥤",
              label: vi ? "Nước điện giải" : "Electrolyte drink",
              value: `${kit.hydration.electrolyteDrinkLiters}`,
              unit: "L",
            },            
            {
              icon: "🍼",
              label: vi ? "Bình cần mang" : "Bottles to carry",
              value: `${kit.hydration.bottleCount500ml}`,
              unit: vi ? "bình 500ml" : "× 500ml",
            },
          ]}
          note={
            vi
              ? "Không cần mang toàn bộ nước cùng lúc. Hãy refill tại aid station."
              : "Do not carry all fluids at once. Refill at aid stations."
          }
        />

        <KitSection
          title={vi ? "Muối & điện giải" : "Salt & Electrolytes"}
          icon="🧂"
          description={
            vi
              ? "Hỗ trợ bù sodium khi trời nóng, ra mồ hôi nhiều hoặc race dài."
              : "Sodium support for heat, sweat and long duration."
          }
          target={
            vi
              ? `Mục tiêu: ~${targets.sodium.perHourMg}mg sodium/giờ`
              : `Target: ~${targets.sodium.perHourMg}mg sodium/hour`
          }
          items={[
            {
              icon: "🧂",
              label: vi ? "Viên muối" : "Salt capsules",
              value: `${kit.electrolytes.saltCapsules}`,
              unit: vi ? "viên" : "caps",
            },
            {
              icon: "💊",
              label: vi ? "Viên điện giải" : "Electrolyte tabs",
              value: `${kit.electrolytes.electrolyteTabs}`,
              unit: vi ? "viên" : "tabs",
            },
          ]}
          note={
            vi
              ? "Nước điện giải ở phần Nước uống cũng góp phần bổ sung sodium."
              : "Electrolyte drink in Hydration also contributes sodium."
          }
        />

        {(kit.extras.emergencyGels > 0 || kit.extras.bcaaServings > 0) && (
          <KitSection
            title={vi ? "Dự phòng" : "Extras"}
            icon="🎒"
            description={
              vi
                ? "Một vài món dự phòng cho race dài hoặc tình huống bất ngờ."
                : "A few backup items for long races or unexpected situations."
            }
            items={[
              {
                icon: "⚡",
                label: vi ? "Gel dự phòng" : "Emergency gels",
                value: `${kit.extras.emergencyGels}`,
                unit: vi ? "gói" : "packs",
              },
              {
                icon: "🧬",
                label: "BCAA",
                value: `${kit.extras.bcaaServings}`,
                unit: vi ? "phần" : "servings",
              },
            ].filter((item) => Number(item.value) > 0)}
          />
        )}
      </div>
    </div>
  );
}

function KitSection({
  title,
  icon,
  description,
  target,
  items,
  note,
}: {
  title: string;
  icon: string;
  description: string;
  target?: string;
  items: {
    icon: string;
    label: string;
    value: string;
    unit: string;
  }[];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-white">
            <span className="mr-1">{icon}</span>
            {title}
          </h4>

          <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
        </div>

        {target && (
          <div className="shrink-0 rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-400">
            {target}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-zinc-950 p-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>

            <div className="mt-2 flex items-end gap-1">
              <div className="text-2xl font-bold text-white">{item.value}</div>

              <div className="pb-1 text-xs text-zinc-500">{item.unit}</div>
            </div>
          </div>
        ))}
      </div>

      {note && <p className="mt-3 text-xs leading-5 text-zinc-500">{note}</p>}
    </div>
  );
}

// function TimelineFooter({ locale }: { locale: "en" | "vi" }) {
//   const vi = locale === "vi"

//   return (
//     <div className="rounded-xl bg-zinc-900 p-3 text-xs leading-5 text-zinc-500">
//       {vi
//         ? "Các giờ tiếp theo sẽ lặp lại nhịp tiếp năng lượng tương tự."
//         : "The next hours follow a similar fueling rhythm."}
//     </div>
//   )
// }

function CalculationDetails({ result }: { result: RacePlanResult }) {
  const vi = result.meta.locale === "vi";
  const sodium = result.raceKit.sodiumBreakdown;

  return (
    <details className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-white">
        {vi ? "Chi tiết tính toán" : "Calculation details"}
      </summary>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <DetailMetric
          label={vi ? "Carb / giờ" : "Carbs / hour"}
          value={`${result.targets.carbs.perHourG}g`}
        />

        <DetailMetric
          label={vi ? "Nước / giờ" : "Fluid / hour"}
          value={`${result.targets.fluid.perHourMl}ml`}
        />

        <DetailMetric
          label={vi ? "Sodium / giờ" : "Sodium / hour"}
          value={`${result.targets.sodium.perHourMg}mg`}
        />

        <DetailMetric
          label={vi ? "Tổng carb" : "Total carbs"}
          value={`${result.targets.carbs.totalG}g`}
        />

        <DetailMetric
          label={vi ? "Tổng nước" : "Total fluid"}
          value={`${(result.targets.fluid.totalMl / 1000).toFixed(1)}L`}
        />

        <DetailMetric
          label={vi ? "Tổng sodium" : "Total sodium"}
          value={`${formatNumber(result.targets.sodium.totalMg)}mg`}
        />
      </div>

      <div className="mt-4 rounded-xl bg-zinc-900 p-3">
        <div className="text-xs font-semibold text-zinc-300">
          {vi
            ? "Sodium đã có từ gel, nước và đồ uống"
            : "Sodium already covered by fuel and drinks"}
        </div>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {vi
            ? "Phần này giúp tránh tính dư viên muối/điện giải, vì gel, Bột năng lượng và nước điện giải thường đã có sodium."
            : "This avoids over-counting salt capsules because gels, carb drink and electrolyte drink may already contain sodium."}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <DetailMetric
            label={vi ? "Tổng từ gel" : "Total from gels"}
            value={`${formatNumber(sodium.fromGelMg)}mg`}
          />

          <DetailMetric
            label={vi ? "Tổng từ bar" : "Total from bars"}
            value={`${formatNumber(sodium.fromBarsMg)}mg`}
          />

          <DetailMetric
            label={vi ? "Tổng từ Bột năng lượng" : "Total from carb drink"}
            value={`${formatNumber(sodium.fromCarbDrinkMg)}mg`}
          />

          <DetailMetric
            label={
              vi ? "Tổng từ nước điện giải" : "Total from electrolyte drink"
            }
            value={`${formatNumber(sodium.fromElectrolyteDrinkMg)}mg`}
          />

          <DetailMetric
            label="Total from BCAA"
            value={`${formatNumber(sodium.fromBcaaMg)}mg`}
          />

          <DetailMetric
            label={vi ? "Còn cần bù bằng viên" : "Remaining from capsules/tabs"}
            value={`${formatNumber(sodium.remainingMg)}mg`}
          />
        </div>
      </div>
    </details>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

function NotesCard({
  notes,
  locale,
}: {
  notes: string[];
  locale: "en" | "vi";
}) {
  const vi = locale === "vi";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <h3 className="text-sm font-semibold text-white">
        {vi ? "Lưu ý" : "Notes"}
      </h3>

      <ul className="mt-3 space-y-2">
        {notes.map((note, index) => (
          <li
            key={`${note}-${index}`}
            className="text-sm leading-6 text-zinc-300"
          >
            • {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WarningsCard({ result }: { result: RacePlanResult }) {
  const vi = result.meta.locale === "vi";

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
      <h3 className="text-sm font-semibold text-yellow-200">
        {vi ? "Cảnh báo nhỏ" : "Small warnings"}
      </h3>

      <ul className="mt-3 space-y-2">
        {result.warnings.map((warning, index) => (
          <li
            key={`${warning.message}-${index}`}
            className="text-sm leading-6 text-yellow-100/80"
          >
            • {warning.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContextPill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-zinc-700 bg-black/30 px-3 py-1 text-xs text-zinc-300">
      {label}
    </div>
  );
}

function formatHours(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);

  if (m <= 0) return `${h}h`;

  return `${h}h ${m}m`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}
