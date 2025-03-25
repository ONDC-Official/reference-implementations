const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");
const { reverseGeoCodingCheck } = require("../reverseGeoCoding");

const checkOnSearch = async (data, msgIdSet) => {
  const onSrchObj = {};
  let onSearch = data;
  let domain = onSearch.context.domain;
  let domCode = domain.split("ONDC:")[1];
  onSearch = onSearch.message.catalog;
  const payments = onSearch?.payments;

  //saving fulfillments
  try {
    console.log("checking attr");
    console.log(constants.ATTR_DOMAINS.includes(domain));
  } catch (error) {
    console.log(error);
  }
  const fulfillments = onSearch?.fulfillments;

  dao.setValue("fulfillmentsArr", fulfillments);

  try {
    console.log(`Saving provider items array in /on_search api`);
    if (onSearch["providers"]) {
      let providers = onSearch["providers"];
      dao.setValue("providersArr", providers);
      providers.forEach((provider, i) => {
        let itemsArr = provider.items;
        const providerId = provider.id;

        dao.setValue(`${providerId}itemsArr`, itemsArr);
      });
    }
  } catch (error) {
    console.log(
      `!!Error while checking providers array in /on_search api`,
      error
    );
  }

  if (onSearch.hasOwnProperty("providers")) {
    const providers = onSearch["providers"];
    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      if (provider.hasOwnProperty("locations")) {
        const locations = provider.locations;
        for (let j = 0; j < locations.length; j++) {
          const { id, gps, area_code } = locations[j];
          try {
            const [lat, long] = gps.split(",");
            const match = await reverseGeoCodingCheck(lat, long, area_code);
            if (!match) {
              onSrchObj[
                "bpp/provider:location:" + id + ":RGC"
              ] = `Reverse Geocoding for location ID ${id} failed for provider with id '${provider?.id}'. Area Code ${area_code} not matching with ${lat},${long} Lat-Long pair.`;
            }
          } catch (error) {
            console.log("bpp/providers error: ", error);
          }
        }
      }

      try {
        console.log("Checking provider serviceability");

        let providerTags = provider?.tags;
        let providerTagSet = new Set();
        if (providerTags) {
          providerTags.forEach((tag, j) => {
            if (providerTagSet.has(tag?.descriptor?.code)) {
              let itemKey = `duplicatePrvdrTag${j}`;
              onSrchObj[
                itemKey
              ] = `${descriptor?.code} is a duplicate tag in /providers/tags`;
            } else {
              providerTagSet.add(tag?.descriptor?.code);
            }

            if (tag?.descriptor?.code === "serviceability" && tag?.list) {
              mandatoryTags = constants.SERVICEABILITY;
              let missingTags = utils.findMissingTags(
                tag?.list,
                "serviceability",
                mandatoryTags
              );
              if (missingTags.length > 0) {
                onSrchObj.mssngTagErr = `'${missingTags}' code/s required in providers/tags for serviceability`;
              }
              tag?.list.forEach((list) => {
                const { descriptor, value } = list;
                if (descriptor.code === "category") {
                  if (!value.startsWith(domCode)) {
                    onSrchObj.srvcCatgryErr = `Serviceability category must be defined for the same domain code as in context - ${domCode}`;
                  }
                }
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }

      let locations = provider.locations;
      provider.items.forEach((item, k) => {
        let payment_ids = item.payment_ids;
        let location_ids = item.location_ids;
        let category_ids = item.category_ids;
        let itemTags = item?.tags;
        let customization = false;

        itemTags.forEach((tag, i) => {
          let { descriptor, list } = tag;
          if (descriptor.code === "attribute") {
            list.forEach((listTag) => {
              if (
                listTag.descriptor.code === "type" &&
                _.toLower(listTag.value) === "customization"
              )
                customization = true;
            });
          }
        });

        if (!customization && itemTags) {
          itemTags.forEach((tag) => {
            if (tag?.descriptor?.code === "reschedule_terms" && tag?.list) {
              mandatoryTags = constants.RESCHEDULE_TERMS;
              let missingTags = utils.findMissingTags(
                tag?.list,
                "reschedule_terms",
                mandatoryTags
              );
              if (missingTags.length > 0) {
                onSrchObj.mssngRescdlTagErr = `'${missingTags}' code/s required in providers/tags for ${tag?.descriptor?.code}`;
              }
            }
          });
        } else if(!customization && !itemTags) {
          onSrchObj.reschdlTrmErr = `reschedule_terms tag is required for a parent item in items/tags`;
        }
        try {
          console.log(
            "Comparing fulfillment_ids in /items and /fulfillments in /on_search"
          );

          let fulfillment_ids = item.fulfillment_ids;
          let fulfillmentSet = new Set();
          if (fulfillment_ids) {
            for (let fulfillment of fulfillments) {
              fulfillmentSet.add(fulfillment.id);
            }

            let missingIds = [];

            for (let id of fulfillment_ids) {
              if (!fulfillmentSet.has(id)) {
                missingIds.push(id);
              }
            }

            if (missingIds.length > 0) {
              let itemKey = `missingFlmntIds-${k}-err`;
              onSrchObj[
                itemKey
              ] = `Fulfillment id/s ${missingIds} in /items does not exist in /fulfillments`;
            }
          }
        } catch (error) {
          console.log(error);
        }
        try {
          console.log(
            "Comparing location_ids in /items and /providers/locations in /on_search"
          );

          let locationSet = new Set();
          if (location_ids) {
            for (let loc of locations) {
              locationSet.add(loc?.id);
            }

            let missingIds = [];

            for (let id of location_ids) {
              if (!locationSet.has(id)) {
                missingIds.push(id);
              }
            }

            if (missingIds.length > 0) {
              let itemKey = `missingLoc-${k}-err`;
              onSrchObj[
                itemKey
              ] = `Location id/s ${missingIds} in /items does not exist in /providers/locations`;
            }
          }
        } catch (error) {
          console.log(error);
        }
        try {
          console.log(
            "Comparing payment_ids in /items and /payments in /on_search"
          );

          let paymentSet = new Set();
          if (payment_ids) {
            for (let payment of payments) {
              paymentSet.add(payment.id);
            }

            let missingIds = [];

            for (let id of payment_ids) {
              if (!paymentSet.has(id)) {
                missingIds.push(id);
              }
            }

            if (missingIds.length > 0) {
              let itemKey = `missingpymntIds-${k}-err`;
              onSrchObj[
                itemKey
              ] = `Payment id/s ${missingIds} in /items does not exist in /payments`;
            }
          }
        } catch (error) {
          console.log(error);
        }
        try {
          console.log(
            "Comparing category_ids in /items and /categories in /on_search"
          );
          const categories = provider?.categories;
          let categorySet = new Set();
          if (category_ids && customization) {
            for (let category of categories) {
              categorySet.add(category.id);
            }

            let missingIds = [];

            for (let id of category_ids) {
              if (!categorySet.has(id)) {
                missingIds.push(id);
              }
            }

            if (missingIds.length > 0) {
              let itemKey = `missingcategoryIds-${k}-err`;
              onSrchObj[
                itemKey
              ] = `Category id/s ${missingIds} in /items does not exist in /categories`;
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  return onSrchObj;
};
module.exports = checkOnSearch;
