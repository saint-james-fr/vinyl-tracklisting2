export const secondsToMinute = (seconds: number): MinuteSecond => {
  const minutes = Math.floor(seconds / 60);
  const leftover = seconds % 60;
  const result: MinuteSecond = [minutes, leftover];
  return result;
};

export const formatTime = (second: number): string | number => {
  return second < 10 ? "0" + second : second;
};
