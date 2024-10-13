import { useEffect, useState } from "react";

import { payData } from "./data";

export function useProcessor() {
  const _reversedData = payData?.split("\n").reverse();
  let data = {
    timeFrame: [],
    date: null,
    raw: [],
    totalMinute: {
      today: null,
      payTime: null,
    },
  };
  let res: any[] = [];
  function push() {
    const s = JSON.parse(JSON.stringify(data));
    // const timeOccurrence =
    res.push(s);
  }
  function processLine(line, respIndex) {
    line = line.trim();
    let insertLine = line;
    // if (data.timeFrame.length) {
    // const regex = /(\w{3} \d{2})\s+([\d:.]+)(?:\s*==\s*([\d:.]+))?/;
    // const regex = /^-?\s*#?\s*(\w{3} \d{2})\s+(\S+)\s*==\s*(\S+)/;
    const regex = /^-?\s*#?\s*(\w{3} \d{2}):?\s+(\S+)(?:\s*==\s*([\d:.]+))?/;

    const dateMatch = line.match(regex);
    if (line?.includes("AUG 19")) {
      console.log({ dateMatch });
    }
    if (dateMatch && data.date) {
      //   res.push(JSON.parse(JSON.stringify(data)));
      push();
      resetData();
    }
    if (!data.date) {
      if (dateMatch) {
        data.date = dateMatch[1];
        data.totalMinute.today = dateMatch[2];
        data.totalMinute.payTime = dateMatch[3];
        data.raw.unshift(`${line} ->date`);
        return;
        // console.log(data.date);
        // return null;
      }
    }
    // }
    let time = converTime(line);
    if (time) {
      if (data.date) {
        // res.push(JSON.parse(JSON.stringify(data)));
        push();
        resetData();
      }
      data.timeFrame.push(time);
      data.raw.unshift(`${line} ->time`);
      return;
    }
    if (line) {
      data.raw.unshift(line);
    }
  }
  function resetData() {
    // data = {
    //   timeFrame: [],
    //   date: null,
    //   totalMinute: {
    //     today: null,
    //     payTime: null,
    //   },
    //   raw: [],
    // };
    data.timeFrame = [];
    data.date = null;
    data.totalMinute.today = null;
    data.totalMinute.payTime = null;
    data.raw = [];
  }
  function converTime(line) {
    if (
      /^\d{2}:\d{2}-\d{2}:\d{2}$/.test(line) ||
      /^\d{2}[:.]\d{2}-\d{2}[:.]\d{2}$/.test(line)
    ) {
      //   console.log("TIME>>>>>", line);

      const [startTime, endTime] = line.split("-");
      return {
        startTime,
        endTime,
      };
    }
    return null;
  }
  const [json, setJson] = useState([]);
  useEffect(() => {
    let respIndex = 0;
    // console.log(_reversedData);
    _reversedData
      //   .filter((a, b) => b < 90)
      .map((line, i) => {
        let proc = processLine(line, respIndex);
        // if (proc) {
        //   res.unshift({ ...proc, respIndex });
        //   respIndex += 1;
        // }
      });
    // res.push(JSON.parse(JSON.stringify(data)));
    push();
    setJson((old) => {
      return res;
    });
  }, []);

  return {
    json,
  };
}
