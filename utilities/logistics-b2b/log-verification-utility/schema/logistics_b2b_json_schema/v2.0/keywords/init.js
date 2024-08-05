module.exports = {

    // This function validates that the fulfillment stops are all different.
    validateFulfillmentStops : (data) => {
        const order = data.message.order;
      
        if (!order.fulfillments || order.fulfillments.length === 0) {
          return false; 
        }
      
        for (const fulfillment of order.fulfillments) {
          if (fulfillment.stops && fulfillment.stops.length > 1) {
            const gpsSet = new Set();
      
            for (const stop of fulfillment.stops) {
              if (gpsSet.has(stop.location.gps)) {
                return false; // Duplicate GPS found
              }
              gpsSet.add(stop.location.gps);
            }
          } else {
            return false; // Each fulfillment must have at least two stops
          }
        }
      
        return true;
    },

    // This function validates that the billing order timestamp matches the context timestamp
    validateBillingTimeStamp : (data) => {
        billingOrderTimestamp = data.message.order.billing.time.timestamp;
        contextOrderTimestamp = data.context.timestamp;
        return billingOrderTimestamp === contextOrderTimestamp;
    }

    
};