"use client"

import { useState } from "react"

import RaceInputs from "./RaceInputs"
import ResultView from "./ResultView"
import SportSelector from "./SportSelector"
import { RacePlanResult } from "./resultTypes"
import { PlannerForm, SportType } from "./types"
import HeaderControls from "./HeaderControl"
import NutritionInputs from "./NutritionInput"

const initialForm: PlannerForm = {
  sportType: "trail",
  locale: "vi",
  market: "vn",

  weight_kg: 70,
  experience_level: "intermediate",
  stomach_tolerance: "medium",

  distance_km: 100,
  expected_time_hours: 23,
  temperature_c: 30,
  humidity: 80,

  elevation_gain_m: 6000,
  technical_level: "moderate",
  aid_station: "rare",

  swim_distance_km: 1.9,
  swim_time_hours: 0.6,
  bike_distance_km: 90,
  bike_time_hours: 3,
  run_distance_km: 21.1,
  run_time_hours: 2,
  t1_minutes: 5,
  t2_minutes: 4,
  bike_hydration_access: "normal",
  run_aid_station: "frequent",

  energySources: ["gel", "bar", "real_food","carb_drink"],
  hydrationSources: ["water", "electrolyte_drink"],
  electrolyteSources: ["salt_capsule", "electrolyte_tab"],
  useBcaa: true,
}

export default function RacePlanner() {
  const [form, setForm] = useState<PlannerForm>(initialForm)
  const [result, setResult] = useState<RacePlanResult | null>(null)
  const [loading, setLoading] = useState(false)

  const vi = form.locale === "vi"

  function update<K extends keyof PlannerForm>(
    key: K,
    value: PlannerForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function setSport(sportType: SportType) {
    setForm((prev) => ({
      ...prev,
      sportType,
      distance_km:
        sportType === "road"
          ? 42
          : sportType === "trail"
          ? 100
          : 113,
      expected_time_hours:
        sportType === "road"
          ? 4.5
          : sportType === "trail"
          ? 23
          : 5.5,
    }))
  }

  function buildPayload() {
    const expectedTime =
      form.sportType === "triathlon"
        ? form.swim_time_hours +
          form.bike_time_hours +
          form.run_time_hours +
          (form.t1_minutes + form.t2_minutes) / 60
        : form.expected_time_hours

    const base = {
      sportType: form.sportType,
      locale: form.locale,
      market: form.market,

      user: {
        weight_kg: form.weight_kg,
        experience_level: form.experience_level,
        stomach_tolerance: form.stomach_tolerance,
      },

      race: {
        distance_km: form.distance_km,
        expected_time_hours: expectedTime,
      },

      env: {
        temperature_c: form.temperature_c,
        humidity: form.humidity,
      },

      nutrition: {
        energySources: form.energySources,
        hydrationSources: form.hydrationSources,
        electrolyteSources: form.electrolyteSources,
        useBcaa: form.useBcaa,
      },
    }

    if (form.sportType === "trail") {
      return {
        ...base,
        trail: {
          elevation_gain_m: form.elevation_gain_m,
          technical_level: form.technical_level,
          aid_station: form.aid_station,
        },
      }
    }

    if (form.sportType === "triathlon") {
      return {
        ...base,
        triathlon: {
          swim_distance_km: form.swim_distance_km,
          swim_time_hours: form.swim_time_hours,

          bike_distance_km: form.bike_distance_km,
          bike_time_hours: form.bike_time_hours,

          run_distance_km: form.run_distance_km,
          run_time_hours: form.run_time_hours,

          t1_minutes: form.t1_minutes,
          t2_minutes: form.t2_minutes,

          bike_hydration_access: form.bike_hydration_access,
          run_aid_station: form.run_aid_station,
        },
      }
    }

    return base
  }

  async function generatePlan() {
    setLoading(true)

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      })

      const data = (await res.json()) as RacePlanResult

      setResult(data)
      localStorage.setItem("lastRacePlan", JSON.stringify(data))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-5 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              RaceReady MVP
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Race Fuel Planner
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              {vi
                ? "Tính gel, nước, muối, điện giải và timeline cho road, trail, triathlon."
                : "Plan gels, fluids, salt, electrolytes and timeline for road, trail and triathlon."}
            </p>
          </div>

          <HeaderControls
            locale={form.locale}
            market={form.market}
            onLocaleChange={(v) => update("locale", v)}
            onMarketChange={(v) => update("market", v)}
          />
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-3 text-sm font-semibold text-white">
                {vi ? "Chọn môn" : "Choose sport"}
              </div>

              <SportSelector
                value={form.sportType}
                onChange={setSport}
                locale={form.locale}
              />
            </div>

            <RaceInputs form={form} setForm={setForm} />
            <NutritionInputs form={form} setForm={setForm} />

            <button
              onClick={generatePlan}
              disabled={loading}
              className="sticky bottom-4 z-20 w-full rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {loading
                ? vi
                  ? "Đang tính..."
                  : "Generating..."
                : vi
                ? "Generate Race Plan"
                : "Generate Race Plan"}
            </button>
          </section>

          <section>
            {result ? (
              <ResultView result={result} />
            ) : (
              <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/60 p-8 text-center">
                <div>
                  <div className="text-5xl">🏁</div>

                  <h2 className="mt-4 text-xl font-bold">
                    {vi
                      ? "Race plan sẽ hiện ở đây"
                      : "Your race plan appears here"}
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                    {vi
                      ? "Chọn thông tin race và nguồn dinh dưỡng bạn muốn dùng."
                      : "Choose race details and the nutrition sources you prefer."}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}