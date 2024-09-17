"use client";

import { _getStatusColor, statusColor } from "@acme/utils";

import { cn } from "..";
import { Badge } from "../badge";

interface Props {
  status?;
  children?;
  sm?: boolean;
  color?;
}
export default function StatusBadge({ status, color, children, sm }: Props) {
  if (!status) status = children;
  const _color = statusColor(status);
  return (
    <div className="inline-flex items-center gap-2 font-semibold">
      <div className={cn("h-1.5 w-1.5", `bg-${_color}-500`)}></div>
      <div className={cn(`text-${_color}-500`, "text-xs uppercase")}>
        {status}
      </div>
    </div>
  );
  return (
    <Badge
      className={cn(
        color ? _getStatusColor(color) : _color,
        "whitespace-nowrap",
        sm && "p-1 leading-none",
      )}
    >
      {status}
    </Badge>
  );
}
