module.exports = {
    validateBillDetails : (data) => {
        const orderAmount = parseFloat(data?.message?.order?.quote?.price?.value || '0');
        const tags = data?.message?.order?.tags || [];

        const deliveryTermsTag = tags.find(tag => tag.descriptor.code === 'Delivery_Terms');
        const docWayBillNoProvided = deliveryTermsTag?.list?.some(item => item.descriptor.code === 'Doc_Way_Bill_No');

        if (orderAmount > 50000) {
            if (!docWayBillNoProvided) {
                return false;
            }
        } else {
            if (docWayBillNoProvided) {
                return false;
            }
        }
        return true;
    },
};