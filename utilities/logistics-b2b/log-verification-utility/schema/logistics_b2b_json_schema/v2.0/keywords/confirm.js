module.exports = {
    validateTime : (data) => {
        return data.message.order.created_at === data.message.order.updated_at;
    },

    validateAcceptBPP_Terms: (data) => {
        const tags = data?.message?.tags || [];
        const bapTerms = tags.find(tag => tag.descriptor.code === 'BAP_Terms');
    
        if (bapTerms) {
            const acceptBPP_Terms = bapTerms.list.find(item => item.descriptor.code === 'Accept_BPP_Terms');
            if (acceptBPP_Terms) {
                return acceptBPP_Terms.value === 'Y';
            }
        }

        return false;
    },
};