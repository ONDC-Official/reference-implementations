const dao = require("../../dao/dao");

function setBuyerAppFinderFeeValue(data) {
  try {
      console.log("Checking buyer app finder fee in /search");
  
      data.tags.forEach((tag) => {
        if (tag?.descriptor?.code === "bap_terms" && tag?.list) {
          tag.list.forEach((val) => {
            if (val?.descriptor?.code === "finder_fee_type") {
              dao.setValue("buyerFinderFeeType", val?.value);
            }
            if (val?.descriptor?.code === "finder_fee_amount") {
              dao.setValue("buyerFinderFeeAmount", val?.value);
            }
          });
        }
      });
  } catch (error) {}
};

function setProviderValue(data, errObj) {
    try {
        let citycode = data?.context?.location?.city?.code;
        data = data.message.catalog;
        console.log(`Saving provider items array in /on_search api`);
        if (data["providers"]) {
            let providers = data["providers"];

            dao.setValue("providersArr", providers);

            // check if provider can be a single quantity

            providers.forEach((provider, i) => {
            console.log(citycode, provider?.creds);
            if (citycode === "std:999" && !provider.creds) {
              errObj.msngCreds = `Creds are required for exports in /providers`;
            }
            let itemsArr = provider.items;
            const providerId = provider.id;

            console.log("itemArr -- ", itemsArr);

            dao.setValue(`${providerId}itemsArr`, itemsArr);
            });
        }
        } catch (error) {
        console.log(
            `!!Error while checking providers array in /on_search api`,
            error
        );
      }
    return errObj;
};

module.exports = {
    setBuyerAppFinderFeeValue,
    setProviderValue
};