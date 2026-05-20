
import { translations } from "../i18n/i18n"
import { EngineResult, Locale, RaceInput } from "../types"
import { buildSuggestedProducts } from "./productPresenter"

export function buildRaceUiResponse(
  engine: EngineResult,
  input: RaceInput
) {
  const locale: Locale = input.locale ?? "en"
  const t = translations[locale]
  const vi = locale === "vi"

  const expectedTimeHours = getExpectedTimeHours(input)

  const headline = buildHeadline({
    input,
    locale,
  })

  const timeline = engine.timeline.map((item) => ({
    minute: item.minute,
    type: item.type,
    phase: item.phase,
    label:
      t.timeline[
        item.labelKey as keyof typeof t.timeline
      ] ?? item.labelKey,
  }))

  const warnings = engine.warnings.map((warning) => ({
    level: "medium" as const,
    message:
      t.warnings[
        warning as keyof typeof t.warnings
      ] ?? warning,
  }))

  const notes = buildNotes({
    input,
    locale,
  })

  return {
    meta: {
      locale,
      market:
        input.market ??
        (locale === "vi" ? "vn" : "us"),

      sportType: input.sportType,

      raceLabel: buildRaceLabel({
        input,
        locale,
      }),

      expectedTimeHours,

      distanceKm: input.race.distance_km,
    },

    headline,

    targets: engine.targets,

    raceKit: engine.raceKit,

    timeline,

    warnings,

    notes,

    suggestedProducts:
      buildSuggestedProducts(engine, input),
  }
}

function getExpectedTimeHours(input: RaceInput) {
  if (input.sportType !== "triathlon") {
    return input.race.expected_time_hours
  }

  const tri = input.triathlon

  if (!tri) {
    return input.race.expected_time_hours
  }

  return (
    tri.swim_time_hours +
    tri.bike_time_hours +
    tri.run_time_hours +
    ((tri.t1_minutes ?? 0) +
      (tri.t2_minutes ?? 0)) /
      60
  )
}

function buildRaceLabel(params: {
  input: RaceInput
  locale: Locale
}) {
  const { input, locale } = params
  const vi = locale === "vi"

  if (input.sportType === "road") {
    return vi
      ? `${input.race.distance_km}K Road`
      : `${input.race.distance_km}K Road`
  }

  if (input.sportType === "trail") {
    return vi
      ? `${input.race.distance_km}K Trail`
      : `${input.race.distance_km}K Trail`
  }

  if (input.sportType === "triathlon") {
    const tri = input.triathlon

    if (!tri) {
      return "Triathlon"
    }

    return vi
      ? `Triathlon ${tri.swim_distance_km}K swim · ${tri.bike_distance_km}K bike · ${tri.run_distance_km}K run`
      : `Triathlon ${tri.swim_distance_km}K swim · ${tri.bike_distance_km}K bike · ${tri.run_distance_km}K run`
  }

  return input.sportType
}

function buildHeadline(params: {
  input: RaceInput
  locale: Locale
}) {
  const { input, locale } = params
  const vi = locale === "vi"

  if (
    input.sportType === "trail" &&
    (input.trail?.elevation_gain_m ?? 0) > 3000 &&
    input.env.temperature_c > 28
  ) {
    return vi
      ? "Trời nóng và nhiều leo dốc làm tăng nhu cầu nước, carb và điện giải."
      : "Hot weather and long climbs increase fluid, carb and electrolyte demand."
  }

  if (input.env.temperature_c > 28) {
    return vi
      ? "Thời tiết nóng làm tăng nhu cầu nước và điện giải."
      : "Hot weather increases fluid and electrolyte demand."
  }

  if (
    input.sportType === "trail" &&
    (input.trail?.elevation_gain_m ?? 0) > 1500
  ) {
    return vi
      ? "Nhiều đoạn leo dốc làm tăng nhu cầu năng lượng."
      : "Long climbs increase your fueling demand."
  }

  if (input.sportType === "triathlon") {
    return vi
      ? "Triathlon nên ưu tiên nạp năng lượng ở phần bike và giữ đơn giản khi chạy."
      : "For triathlon, prioritize fueling on the bike and keep the run simple."
  }

  return vi
    ? "Kế hoạch dinh dưỡng đơn giản cho race của bạn."
    : "A simple fueling plan for your race."
}

function buildNotes(params: {
  input: RaceInput
  locale: Locale
}) {
  const { input, locale } = params
  const vi = locale === "vi"

  const notes: string[] = []

  notes.push(
    vi
      ? "Không cần mang toàn bộ lượng nước cùng lúc. Hãy refill tại aid station hoặc điểm tiếp nước."
      : "You do not need to carry all fluids at once. Refill at aid stations or water stops."
  )

  notes.push(
    vi
      ? "Các con số là ước tính ban đầu. Hãy test trong long run trước race."
      : "These numbers are starting estimates. Test them during long runs before race day."
  )

  if (input.sportType === "trail") {
    notes.push(
      vi
        ? "Trail có nhịp độ thay đổi nhiều, nên dùng kết hợp gel, bar, nước carb và đồ ăn thật."
        : "Trail pace varies a lot, so combining gels, bars, carb drink and real food is usually easier."
    )
  }

  if (input.sportType === "triathlon") {
    notes.push(
      vi
        ? "Phần bike là thời điểm dễ nạp năng lượng nhất. Phần run nên ưu tiên gel/liquid dễ tiêu."
        : "The bike is usually the easiest time to fuel. On the run, prefer easy-to-digest gels and liquids."
    )
  }

  if (input.user.stomach_tolerance === "low") {
    notes.push(
      vi
        ? "Nếu dạ dày nhạy cảm, hãy chia nhỏ lượng nạp và tránh thử sản phẩm mới trong ngày race."
        : "If your stomach is sensitive, take smaller amounts more often and avoid trying new products on race day."
    )
  }

  return notes
}