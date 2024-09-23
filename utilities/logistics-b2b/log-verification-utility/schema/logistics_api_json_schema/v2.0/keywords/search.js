module.exports = {
  isEndTimeGreater: (data) => {
    const startTime = parseInt(data?.start);
    const endTime = parseInt(data?.end);
    return startTime < endTime;
  },
  hasStartAndEndStops: (data) => {
    const hasStart = data.some((stop) => stop.type === "start");
    const hasEnd = data.some((stop) => stop.type === "end");

    return hasStart && hasEnd;
  },

  isStartTimeValid: (data) => {
    const startStop = data?.stops ? data?.stops.find((stop) => stop.type === "start") : undefined;
    if (!startStop || !startStop.time?.range) {
      return false;
    }

    const { start, end } = startStop.time.range;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return startTime < endTime;
  },
};
