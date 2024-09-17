export function getBadgeColor(status: string | null, _default = "slate") {
  return _getStatusColor(statusColor(status, _default));
}
export function statusColor(status, _default = "slate") {
  const color: Colors | undefined = status
    ? StatusColorMap[(status?.toLowerCase() || "").replace(" ", "_")]
    : _default || ("slate" as any);
  return color;
}
export function _getStatusColor(color) {
  if (!color) color = "slate";
  return `bg-${color}-500 hover:bg-${color}-600`;
}
const StatusColorMap: Record<string, Colors> = {
  queued: "orange",
  completed: "green",
  available: "green",
  started: "blue",
  scheduled: "blue",
  incomplete: "orange",
  pickup: "fuchsia",
  unknown: "orange",
  late: "red",
  in_transit: "fuchsia",
  approved: "emerald",
  verified: "emerald",
  assigned: "green",
  order_placed: "sky",
  delivery: "emerald",
  arrived_warehouse: "emerald",
  item_not_available: "orange",
  payment_cancelled: "orange",
  prod_queued: "orange",
  install: "purple",
  deco: "orange",
  evaluating: "orange",
  punchout: "emerald",
} as const;
// const __colors = Object.values(StatusColorMap) as const;
export type Colors =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "blueGray";
export interface Progressor {
  color;
  percentage;
  score;
  total;
}
export function getProgress(score, total): Progressor | null {
  if (!score || !total) return null;
  const p = ((score || 0) / (total || 1)) * 100;
  let color = "";
  if (p < 25) {
    color = "red";
  } else if (p < 50) {
    color = "yellow";
  } else if (p < 75) {
    color = "orange";
  } else {
    color = "green";
  }
  return {
    color,
    percentage: p,
    score,
    total,
  };
}
