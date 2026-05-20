"use client";

import { useState } from "react";
import { TimelineItem, TimelineItemType } from "./resultTypes";

type TimelineIcon = {
  icon: string;
  labelVi: string;
  labelEn: string;
};

type TimelineCluster = {
  minute: number;
  items: TimelineItem[];
};

const ICONS: Record<TimelineItemType, TimelineIcon> = {
  gel: {
    icon: "⚡",
    labelVi: "Gel",
    labelEn: "Gel",
  },
  bike_fuel: {
    icon: "⚡",
    labelVi: "Gel / năng lượng",
    labelEn: "Bike fuel",
  },
  run_fuel: {
    icon: "⚡",
    labelVi: "Gel / năng lượng",
    labelEn: "Run fuel",
  },
  bar: {
    icon: "🍫",
    labelVi: "Thanh năng lượng",
    labelEn: "Energy bar",
  },
  carb_drink: {
    icon: "🧃",
    labelVi: "Nước carb",
    labelEn: "Carb drink",
  },
  real_food: {
    icon: "🍙",
    labelVi: "Đồ ăn thật",
    labelEn: "Real food",
  },
  water: {
    icon: "💧",
    labelVi: "Nước",
    labelEn: "Water",
  },
  electrolyte_drink: {
    icon: "🥤",
    labelVi: "Nước điện giải",
    labelEn: "Electrolyte drink",
  },
  salt_capsule: {
    icon: "🧂",
    labelVi: "Viên muối",
    labelEn: "Salt capsule",
  },
  electrolyte_tab: {
    icon: "💊",
    labelVi: "Viên điện giải",
    labelEn: "Electrolyte tab",
  },
  bcaa: {
    icon: "🧬",
    labelVi: "BCAA",
    labelEn: "BCAA",
  },
  transition: {
    icon: "🔁",
    labelVi: "Transition",
    labelEn: "Transition",
  },
};

export default function TimelinePreview({
  timeline,
  locale,
}: {
  timeline: TimelineItem[];
  locale: "en" | "vi";
}) {
  const vi = locale === "vi";

  const [selectedCluster, setSelectedCluster] = useState<{
    cluster: TimelineCluster;
    hour: number;
  } | null>(null);

  

  const grouped = groupByHour(timeline);

  const hours = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);
const shouldCollapseLongTimeline = hours.length > 8

const [showAllHours, setShowAllHours] = useState(
  !shouldCollapseLongTimeline
)
  const initiallyVisibleHourCount = 8

const visibleHours = showAllHours
  ? hours
  : hours.slice(0, initiallyVisibleHourCount)

const hiddenHourCount = Math.max(
  0,
  hours.length - visibleHours.length
)

  const usedTypes = Array.from(new Set(timeline.map((item) => item.type)));

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          {vi ? "Timeline nạp năng lượng" : "Fueling timeline"}
        </h3>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {vi
            ? "Mỗi hàng là một giờ race. Icon được đặt theo phút trong giờ đó."
            : "Each row is one race hour. Icons are positioned by minute."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-b border-zinc-800 pb-4">
        {usedTypes.map((type) => {
          const item = getIcon(type);

          return (
            <div
              key={type}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400"
            >
              <span className="text-base">{item.icon}</span>
              <span>{vi ? item.labelVi : item.labelEn}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-7">
        {visibleHours.map((hour) => {
          const items = grouped[hour];
          const clusters = groupByMinute(items);

          return (
            <HourTimelineRow
              key={hour}
              hour={hour}
              clusters={clusters}
              selectedCluster={selectedCluster}
              setSelectedCluster={setSelectedCluster}
              locale={locale}
            />
          );
        })}
      </div>

      {shouldCollapseLongTimeline && (
  <button
    type="button"
    onClick={() => setShowAllHours((prev) => !prev)}
    className="mt-6 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center text-sm font-medium text-zinc-300 transition hover:border-emerald-400/50 hover:text-white"
  >
    {showAllHours
      ? vi
        ? "Thu gọn timeline"
        : "Collapse timeline"
      : vi
      ? `Xem thêm ${hiddenHourCount} giờ còn lại`
      : `Show ${hiddenHourCount} more hours`}
  </button>
)}
    </div>
  );
}

function HourTimelineRow({
  hour,
  clusters,
  selectedCluster,
  setSelectedCluster,
  locale,
}: {
  hour: number;
  clusters: TimelineCluster[];
  selectedCluster: {
    cluster: TimelineCluster;
    hour: number;
  } | null;
  setSelectedCluster: React.Dispatch<
    React.SetStateAction<{
      cluster: TimelineCluster;
      hour: number;
    } | null>
  >;
  locale: "en" | "vi";
}) {
  const vi = locale === "vi";

  return (
    <div
      className={[
        "relative",
        selectedCluster?.hour === hour ? "z-30" : "z-10",
      ].join(" ")}
    >
      <div className="mb-2 text-xs font-semibold text-zinc-500">
        {vi ? `Giờ thứ ${hour + 1}` : `Hour ${hour + 1}`}
      </div>

      <div className="relative overflow-visible">
        <div className="relative h-10 overflow-visible rounded-2xl border border-zinc-700/70 bg-zinc-900/70">
          <MinuteBaseMarker position="left" label={vi ? "0 phút" : "0 min"} />
          <MinuteBaseMarker position="middle" label="30" />
          <MinuteBaseMarker
            position="right"
            label={vi ? "60 phút" : "60 min"}
          />

          {clusters.map((cluster) => {
            const minuteInHour = cluster.minute % 60;
            const rawLeft = getLeftPercent(cluster.minute);
            const safeLeft = getSafeLeftPercent(cluster.minute);

            const isSelected =
              selectedCluster?.cluster.minute === cluster.minute &&
              selectedCluster?.hour === hour;

            const shouldShowMinuteLabel = !isNearBaseMarker(minuteInHour);

            return (
              <div
                key={`cluster-${hour}-${cluster.minute}`}
                className="absolute top-0 h-full -translate-x-1/2"
                style={{
                  left: `${safeLeft}%`,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCluster(
                      isSelected
                        ? null
                        : {
                            cluster,
                            hour,
                          },
                    )
                  }
                  className={[
                    "relative z-20 flex h-full min-w-10 items-center justify-center rounded-2xl border bg-zinc-950/95 px-3 shadow-lg transition hover:scale-105",
                    isSelected
                      ? "border-emerald-400 ring-2 ring-emerald-400/20"
                      : "border-emerald-500/30",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "gap-1",
                      cluster.items.length >= 4
                        ? "grid grid-cols-2"
                        : "flex items-center",
                    ].join(" ")}
                  >
                    {cluster.items.slice(0, 4).map((event, index) => {
                      const icon = getIcon(event.type);

                      return (
                        <span
                          key={`${event.type}-${index}`}
                          className="flex h-4 w-4 items-center justify-center text-base leading-none"
                        >
                          {icon.icon}
                        </span>
                      );
                    })}
                  </div>

                  {cluster.items.length > 4 && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-black">
                      +{cluster.items.length - 4}
                    </span>
                  )}
                </button>

                {shouldShowMinuteLabel && (
                  <div
                    className={[
                      "absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 font-mono text-xs font-semibold text-emerald-400",
                      rawLeft < 8 || rawLeft > 92 ? "hidden" : "",
                    ].join(" ")}
                  >
                    {minuteInHour}
                  </div>
                )}

                {isSelected && (
                  <div
                    className={[
                      "absolute z-[100] mt-3 w-52 rounded-xl border border-zinc-700 bg-zinc-950 p-2 shadow-2xl",
                      safeLeft > 80
                        ? "right-0"
                        : safeLeft < 20
                          ? "left-0"
                          : "left-1/2 -translate-x-1/2",
                    ].join(" ")}
                  >
                    <div className="mb-1 font-mono text-[11px] font-semibold text-emerald-300">
                      {formatMinute(cluster.minute)}
                    </div>

                    <div className="space-y-1">
                      {cluster.items.slice(0, 4).map((event, index) => {
                        const icon = getIcon(event.type);

                        return (
                          <div
                            key={`${event.minute}-${event.type}-tip-${index}`}
                            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-2 py-1.5 text-xs text-zinc-200"
                          >
                            <span>{icon.icon}</span>
                            <span className="truncate">
  {formatMinute(event.minute)} · {event.label}
</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative h-7">
          <MinuteLabel position="left" label={vi ? "0 phút" : "0 min"} />
          <MinuteLabel position="middle" label="30" />
          <MinuteLabel position="right" label={vi ? "60 phút" : "60 min"} />
        </div>
      </div>
    </div>
  );
}

function MinuteBaseMarker({
  position,
  label,
}: {
  position: "left" | "middle" | "right";
  label: string;
}) {
  const positionClass =
    position === "left"
      ? "left-0"
      : position === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={[
        "pointer-events-none absolute top-full h-7",
        positionClass,
      ].join(" ")}
      aria-label={label}
    />
  );
}

function MinuteLabel({
  position,
  label,
}: {
  position: "left" | "middle" | "right";
  label: string;
}) {
  const positionClass =
    position === "left"
      ? "left-0"
      : position === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={[
        "absolute top-2 font-mono text-xs text-zinc-500",
        positionClass,
      ].join(" ")}
    >
      {label}
    </div>
  );
}

function getIcon(type: TimelineItemType) {
  return ICONS[type];
}

function formatMinute(minute: number) {
  const h = Math.floor(minute / 60);
  const m = minute % 60;

  return `${h}:${String(m).padStart(2, "0")}`;
}

function groupByHour(items: TimelineItem[]) {
  return items.reduce<Record<number, TimelineItem[]>>((acc, item) => {
    const hour = Math.floor(item.minute / 60);

    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(item);

    return acc;
  }, {});
}

function groupByMinute(items: TimelineItem[]): TimelineCluster[] {
  const CLUSTER_THRESHOLD_MINUTES = 5

  const sortedItems = [...items].sort(
    (a, b) => a.minute - b.minute
  )

  const clusters: TimelineCluster[] = []

  for (const item of sortedItems) {
    const lastCluster = clusters[clusters.length - 1]

    if (!lastCluster) {
      clusters.push({
        minute: item.minute,
        items: [item],
      })
      continue
    }

    const lastClusterEndMinute = Math.max(
      ...lastCluster.items.map((clusterItem) => clusterItem.minute)
    )

    const shouldMerge =
      Math.abs(item.minute - lastClusterEndMinute) <=
      CLUSTER_THRESHOLD_MINUTES

    if (shouldMerge) {
      lastCluster.items.push(item)

      // Dùng phút trung bình để position cluster cho cân bằng hơn
      lastCluster.minute = Math.round(
        averageMinute(lastCluster.items)
      )
    } else {
      clusters.push({
        minute: item.minute,
        items: [item],
      })
    }
  }

  return clusters.sort((a, b) => a.minute - b.minute)
}

function averageMinute(items: TimelineItem[]) {
  const total = items.reduce(
    (sum, item) => sum + item.minute,
    0
  )

  return total / items.length
}

function getLeftPercent(minute: number) {
  const minuteInHour = minute % 60;
  return Math.min(100, Math.max(0, (minuteInHour / 60) * 100));
}

function getSafeLeftPercent(minute: number) {
  const raw = getLeftPercent(minute);

  if (raw < 6) return 6;
  if (raw > 94) return 94;

  return raw;
}

function isNearBaseMarker(minuteInHour: number) {
  const baseMarkers = [0, 30, 60];

  return baseMarkers.some((marker) => Math.abs(minuteInHour - marker) < 5);
}
