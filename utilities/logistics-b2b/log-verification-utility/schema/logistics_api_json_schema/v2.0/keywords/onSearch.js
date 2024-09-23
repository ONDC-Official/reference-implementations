module.exports = {
  // This function checks if the data has fulfillments with a delivery type and RTO type
  hasRequiredFulfillments: (data) => {
    const hasDelivery = data.some(
      (fulfillment) => fulfillment.type === "Delivery"
    );
    const hasRTO = data.some(
      (fulfillment) => fulfillment.type === "RTO"
    );

    return hasDelivery && hasRTO;
  },
};
