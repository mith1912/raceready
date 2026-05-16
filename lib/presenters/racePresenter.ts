import { EngineResult } from "../engine/type";
import { translations } from "../i18n/i18n";
import { RaceInput } from "../types";
import { buildSuggestedProducts } from "./productPresenter";

export function buildRaceUiResponse(
  engine: EngineResult,
  input: RaceInput,
  locale: "en" | "vi" = "en",
) {
  const t = translations[locale];

  const totalHours = input.race.expected_time_hours;

  // =========================
  // FORMATTERS
  // =========================

  const hydrationLiters = (engine.metrics.totalHydration / 1000).toFixed(1);

  const gelInterval =
    engine.items.gels > 0
      ? Math.round((totalHours * 60) / engine.items.gels)
      : 0;

  // =========================
  // HEADLINE
  // =========================

  let headline: string = t.balanced;

  if (input.env.temperature_c > 28) {
    headline = t.hotHeadline;
  }

  if (
    input.sportType === "trail" &&
    (input.trail?.elevation_gain_m ?? 0) > 1500
  ) {
    headline = t.climbingHeadline;
  }

  // =========================
  // TIMELINE LABELS
  // =========================

  const timeline = engine.timeline.map((item) => ({
    minute: item.minute,

    type: item.type,

    label:
      t.timeline[item.labelKey as keyof typeof t.timeline] ?? item.labelKey,
  }));

  // =========================
  // WARNINGS
  // =========================

  const warnings = engine.warnings.map((warning) => ({
    level: "medium",
    message: t.warnings[warning as keyof typeof t.warnings],
  }));

  // =========================
  // PACKING LIST
  // =========================

  const packingList = engine.packingList.map((item) => ({
    label: t.packing[item as keyof typeof t.packing],
  }));

  // =========================
  // COACH NOTES
  // =========================

  const coachNotes: string[] = [t.coachFuel];

  if (input.sportType === "trail") {
    coachNotes.push(t.coachTrail);
  }

  if (input.env.temperature_c > 28) {
    coachNotes.push(t.coachHydration);
  }

  if (input.user.stomach_tolerance === "low") {
    coachNotes.push(t.coachGut);
  }

  if (totalHours >= 10) {
    coachNotes.push(t.coachUltra);
  }

  const suggestedProducts = buildSuggestedProducts(engine, input);

  // =========================
  // RESPONSE
  // =========================

  return {
    meta: {
      locale,

      sportType: input.sportType,

      expectedTimeHours: totalHours,

      distanceKm: input.race.distance_km,
    },

    summary: {
      headline,

      carbs_g: Math.round(engine.metrics.totalCarbs),

      hydration_ml: Math.round(engine.metrics.totalHydration),

      sodium_mg: Math.round(engine.metrics.totalSodium),
    },

    cards: {
      fuel: {
        title: t.fuelStrategy,

        primary: `${engine.items.gels} gels + ` + `${engine.items.bars} bars`,

        secondary: `${engine.items.drinkMixServings} ${t.drinkMixServings}`,

        description: t.fuelDesc,
      },

      hydration: {
        title: t.hydration,

        primary: `${hydrationLiters}L`,

        secondary: `${engine.items.bottles} ` + `${t.bottles}`,

        description: t.hydrationDesc,
      },

      electrolytes: {
        title: t.electrolytes,

        primary: `${engine.items.saltTabs} ` + `${t.saltTabs}`,

        secondary: `${Math.round(engine.metrics.totalSodium)}mg sodium`,

        description: t.sodiumDesc,
      },
    },
    electrolyteOptions: engine.electrolyteOptions
      ? {
          title: t.electrolyteOptions,

          preferredSource: engine.electrolyteOptions.preferredSource,

          remainingSodium: engine.electrolyteOptions.remainingSodium,

          options: [
            {
              type: "salt_tabs",
              label: t.saltTabsOption,
              value: `${engine.electrolyteOptions.options.saltTabs} ${t.saltTabs}`,
            },
            {
              type: "table_salt",
              label: t.tableSaltOption,
              value: `${engine.electrolyteOptions.options.tableSaltGrams}g`,
            },
            {
              type: "sports_drink",
              label: t.sportsDrinkOption,
              value: `${engine.electrolyteOptions.options.sportsDrink500mlBottles} x 500ml`,
            },
          ],
        }
      : null,
    suggestedProducts: {
      title: t.suggestedProductsTitle,
      ...buildSuggestedProducts(engine, input),
    },
    timeline,

    warnings,

    packingList,

    coachNotes,
  };
}
