export const secondsToMinute = (seconds: number): MinuteSecond => {
  const minutes = Math.floor(seconds / 60);
  const leftover = seconds % 60;
  const result: MinuteSecond = [minutes, leftover];
  return result;
};
