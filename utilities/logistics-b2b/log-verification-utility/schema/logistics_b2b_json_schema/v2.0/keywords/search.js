module.exports = {
  hasStartAndEndStops : (data) => {
    const stops = data?.message?.intent?.fulfillments?.stops || [];
  
    const hasStart = stops.some(stop => stop.type === 'start');
    const hasEnd = stops.some(stop => stop.type === 'end');
  
    return hasStart && hasEnd;
  },
  isStartTimeValid : (data) => {
    const stops = data?.message?.intent?.fulfillments?.stops || [];
    const startStop = stops.find(stop => stop.type === 'start');
  
    if (!startStop || !startStop.time?.range) {
      return false;
    }
  
    const { start, end } = startStop.time.range;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
  
    return startTime < endTime;
  }
};
