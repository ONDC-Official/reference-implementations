module.exports = {
    
    // This function checks if the data has fulfillments with a delivery type and RTO type
    hasRequiredFulfillments : (data) => {
        const fulfillments = data?.message?.catalog?.fulfillments || [];
      
        const hasDelivery = fulfillments.some(fulfillment => fulfillment.type === 'Delivery');
        const hasRTO = fulfillments.some(fulfillment => fulfillment.type === 'RTO');
      
        return hasDelivery && hasRTO;
    },
    
    // This function checks item timestamp is correct for the given TAT and context timestamp
    validateItemTimestamps : (data) => {
        const fulfillments = data?.message?.catalog?.fulfillments || [];
        const items = data?.message?.catalog?.providers?.[0]?.items || [];
        const contextTimestamp = new Date(data?.context?.timestamp || '');
      
        const getDurationInDays = (duration) => {
          const match = duration.match(/^P(\d+)D$/);
          return match ? parseInt(match[1], 10) : 0;
        };
      
        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };
      
        const validateTimestamp = (item) => {
          const duration = item.time?.duration || '';
          const expectedDays = getDurationInDays(duration);
      
          if (expectedDays === 0) return true; // No duration or invalid format
      
          const currentTimestamp = new Date(contextTimestamp);
          currentTimestamp.setUTCDate(contextTimestamp.getUTCDate() + expectedDays);
          const expectedDate = formatDate(currentTimestamp);
      
          const itemTimestamp = new Date(item.time?.timestamp || '');
          const itemDate = formatDate(itemTimestamp);
      
          return itemDate === expectedDate;
        };
      
        return items.every(validateTimestamp);
    },

    // This function checks if the item IDs are valid
    validateItemIDs : (data) => {
        const fulfillments = data?.message?.catalog?.fulfillments || [];
        const categories = data?.message?.catalog?.providers?.[0]?.categories || [];
        const items = data?.message?.catalog?.providers?.[0]?.items || [];
      
        // Create maps for easy validation
        const fulfillmentMap = new Map(fulfillments.map(f => [f.id, f]));
        const categoryMap = new Map(categories.map(c => [c.id, c]));
      
        const validateItemIds = (item) => {
          const validCategoryIds = item.category_ids || [];
          const validFulfillmentIds = item.fulfillment_ids || [];
      
          return validCategoryIds.every(id => categoryMap.has(id)) &&
                 validFulfillmentIds.every(id => fulfillmentMap.has(id));
        };
      
        return items.every(validateItemIds);
    },
};