"use client";

import { useEffect, useState } from "react";

import { cn } from "@acme/ui";
import { ScrollArea } from "@acme/ui/scroll-area";

import { payData } from "./data";
import { useProcessor } from "./utils";

export default function ScrapeClockInPage({}) {
  const data = payData?.split("\n");
  const proc = useProcessor();
  return (
    <div className="m-4 flex h-screen bg-muted">
      <ScrollArea className="flex-1 overflow-auto p-4">
        {/* <div className="flex-1 bg-red-200 p-4 text-sm">
          {data?.map((s, i) => <p key={i}>{s}</p>)}
        </div> */}
        <div className="flex-1 space-y-4 overflow-x-hidden">
          {proc.json?.map(({ raw, ...rest }, i) => (
            <div className={cn("flex max-w-sm")} key={i}>
              <div className="flex-1">
                {/* {JSON.stringify(rest)} */}
                <div className="flex justify-between">
                  <span>{rest.date}</span>
                  <span>{rest.totalMinute?.today}</span>
                  <span>{rest.totalMinute?.payTime}</span>
                </div>
                {rest?.timeFrame?.map((time, timeI) => (
                  <div key={timeI}>
                    <span>{time.startTime}</span>
                    <span>-</span>
                    <span>{time.endTime}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex-1 bg-red-200 p-4 text-sm">
                  {raw?.map((s, i) => <div key={i}>{s}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
