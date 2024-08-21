module.exports = {
  validateTime: (data) => {
    return data?.message?.created_at === data?.message?.updated_at;
  },

  validateAcceptBPP_Terms: (data) => {
    const bapTerms = data.find((tag) => tag.descriptor.code === "BAP_Terms");

    if (bapTerms) {
      const acceptBPP_Terms = bapTerms.list.find(
        (item) => item.descriptor.code === "Accept_BPP_Terms"
      );
      if (acceptBPP_Terms) {
        return acceptBPP_Terms.value === "Y";
      }
    }

    return false;
  },
};
