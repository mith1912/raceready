import { EngineResult } from "../type"


export function addElectrolyteTimeline(params: {
  timeline: EngineResult["timeline"]
  totalMinutes: number
  electrolyteSource?: string
  saltTabs: number
  sportsDrink500mlBottles?: number
  bcaaServings?: number
}) {
  const {
    timeline,
    totalMinutes,
    electrolyteSource = "mixed",
    saltTabs,
    sportsDrink500mlBottles = 0,
    bcaaServings = 0,
  } = params

  if (
    electrolyteSource === "salt_tabs" ||
    electrolyteSource === "mixed"
  ) {
    if (saltTabs > 0) {
      const interval = totalMinutes / saltTabs

      for (let i = 0; i < saltTabs; i++) {
        timeline.push({
          minute: Math.round(i * interval),
          type: "electrolyte",
          labelKey: "timeline_salt_tab",
        })
      }
    }
  }

  if (electrolyteSource === "table_salt") {
    for (let minute = 60; minute < totalMinutes; minute += 90) {
      timeline.push({
        minute,
        type: "salt",
        labelKey: "timeline_table_salt",
      })
    }
  }

  if (
    electrolyteSource === "sports_drink" ||
    electrolyteSource === "mixed"
  ) {
    if (sportsDrink500mlBottles > 0) {
      const interval = totalMinutes / sportsDrink500mlBottles

      for (let i = 0; i < sportsDrink500mlBottles; i++) {
        timeline.push({
          minute: Math.round(i * interval),
          type: "sports_drink",
          labelKey: "timeline_sports_drink",
        })
      }
    }
  }

  if (bcaaServings > 0) {
    timeline.push({
      minute: Math.round(totalMinutes * 0.45),
      type: "bcaa",
      labelKey: "timeline_bcaa",
    })
  }
}