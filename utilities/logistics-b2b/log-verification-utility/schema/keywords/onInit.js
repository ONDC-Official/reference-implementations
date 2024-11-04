module.exports = {
  isQuoteMatching: (data) => {
    let quotePrice = parseFloat(data?.price?.value);
    const breakupArr = data?.breakup;
    let totalBreakup = 0;
    
    breakupArr.forEach((breakup) => {
      totalBreakup += parseFloat(breakup?.price?.value);
    });
    
    // Use Math.round to ensure the precision is consistent
    totalBreakup = Math.round(totalBreakup * 100) / 100;
    quotePrice = Math.round(quotePrice * 100) / 100;
  
    console.log(totalBreakup.toFixed(2), quotePrice.toFixed(2));
    
    if (totalBreakup !== quotePrice) return false;
    else return true;
  },
  
};
