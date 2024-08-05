module.exports = {
     isQuoteMatching : (data) => {
        if (!data || !data.message || !data.message.order || !data.message.order.quote) {
          return false; 
        }
        const quote = data.message.order.quote;
        if (!quote.price || !quote.breakup) {
          return false;
        }
      
        let quotePrice = parseFloat(quote.price.value);
        const breakupArr = quote.breakup;
        let totalBreakup = 0;
      
        breakupArr.forEach((breakup) => {
          totalBreakup += parseFloat(breakup.price.value || 0);
        });

        totalBreakup = parseFloat(totalBreakup).toFixed(2);
        quotePrice = parseFloat(quotePrice).toFixed(2);
      
        console.log(quotePrice, totalBreakup);
      
        return quotePrice === totalBreakup;
      },

    validateQuote : (data) => {
        return data.message.order.payments.params.amount === data.message.order.quote.price.value;    
    },
    
};