import dayjs from "dayjs";

export const adjustedTime = () => {
  const now = dayjs();
  return now;
  // Get the current minute
  const currentMinute = now.minute();

  // Calculate the nearest 5-minute interval
  let adjustedTime;
  if (currentMinute % 5 === 0) {
    // If it's already a multiple of 5, keep it as is
    adjustedTime = now;
  } else if (currentMinute % 5 < 3) {
    // If closer to the previous 5, round down
    adjustedTime = now.minute(currentMinute - (currentMinute % 5));
  } else {
    // If closer to the next 5, round up
    adjustedTime = now.minute(currentMinute + (5 - (currentMinute % 5)));
  }
  return adjustedTime;
};
