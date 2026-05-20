import { RaceKit, TimelineItem } from "../../types"

export function buildTimeline(params: {
  durationHours: number
  raceKit: RaceKit
  includeRealFood?: boolean
  phase?: "bike" | "run"
}): TimelineItem[] {
  const totalMinutes = params.durationHours * 60

  const timeline: TimelineItem[] = []

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: params.raceKit.energy.gels,
    type: "gel",
    labelKey: "timeline_gel",
    startOffsetMinutes: 0,
    phase: params.phase,
  })

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: params.raceKit.energy.bars,
    type: "bar",
    labelKey: "timeline_bar",
    startOffsetMinutes: 45,
    phase: params.phase,
  })

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: params.raceKit.energy.carbDrinkServings,
    type: "carb_drink",
    labelKey: "timeline_carb_drink",
    startOffsetMinutes: 30,
    phase: params.phase,
  })

  if (params.includeRealFood) {
    addRepeatedItems({
      timeline,
      totalMinutes,
      count: params.raceKit.energy.realFoodServings,
      type: "real_food",
      labelKey: "timeline_real_food",
      startOffsetMinutes: 120,
      phase: params.phase,
    })
  }

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: Math.ceil(params.raceKit.hydration.waterLiters),
    type: "water",
    labelKey: "timeline_water",
    startOffsetMinutes: 25,
    phase: params.phase,
  })

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: Math.ceil(
      params.raceKit.hydration.electrolyteDrinkLiters / 0.5
    ),
    type: "electrolyte_drink",
    labelKey: "timeline_electrolyte_drink",
    startOffsetMinutes: 50,
    phase: params.phase,
  })

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: params.raceKit.electrolytes.saltCapsules,
    type: "salt_capsule",
    labelKey: "timeline_salt_capsule",
    startOffsetMinutes: 0,
    phase: params.phase,
  })

  addRepeatedItems({
    timeline,
    totalMinutes,
    count: params.raceKit.electrolytes.electrolyteTabs,
    type: "electrolyte_tab",
    labelKey: "timeline_electrolyte_tab",
    startOffsetMinutes: 55,
    phase: params.phase,
  })

  if (params.raceKit.extras.bcaaServings > 0) {
    timeline.push({
      minute: Math.round(totalMinutes * 0.45),
      type: "bcaa",
      labelKey: "timeline_bcaa",
      phase: params.phase,
    })
  }

  return timeline.sort((a, b) => a.minute - b.minute)
}

function addRepeatedItems(params: {
  timeline: TimelineItem[]
  totalMinutes: number
  count: number
  type: TimelineItem["type"]
  labelKey: string
  startOffsetMinutes: number
  phase?: "bike" | "run"
}) {
  if (params.count <= 0) return

  const interval = params.totalMinutes / params.count

  for (let i = 0; i < params.count; i++) {
    const minute = Math.round(
      Math.min(
        params.totalMinutes - 1,
        params.startOffsetMinutes + i * interval
      )
    )

    params.timeline.push({
      minute,
      type: params.type,
      labelKey: params.labelKey,
      phase: params.phase,
    })
  }
}