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

      try {
        console.log("Checking item tags");
        let items = provider?.items;
        items.forEach((item) => {
          let itemTags = item?.tags;
          if (itemTags) {
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
          } else {
            onSrchObj.reschdlTrmErr = `reschedule_terms tag is required for an item in items/tags`;
          }
        });
      } catch (error) {
        console.log(error);
      }

      let locations = provider.locations;
      provider.items.forEach((item, k) => {
        let payment_ids = item.payment_ids;
        let location_ids = item.location_ids;
        let category_ids = item.category_ids;
        let itemTags = item?.tags;
        let mandatoryAttr = [];
        let missingAttr = [];
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

        // let itemTagsSet = new Set();
        // itemTags.forEach((tag, i) => {
        //   let { descriptor, list } = tag;

        //   if (
        //     itemTagsSet.has(descriptor?.code) &&
        //     descriptor?.code !== "price_slab"
        //   ) {
        //     let itemKey = `duplicateTag${k}`;
        //     onSrchObj[
        //       itemKey
        //     ] = `${descriptor?.code} is a duplicate tag in /items/tags`;
        //   } else {
        //     itemTagsSet.add(descriptor?.code);
        //   }

        //   if (descriptor?.code === "g2") {
        //     mandatoryAttr = constants.G2TAGS;
        //     missingAttr = utils.findMissingTags(
        //       list,
        //       descriptor.code,
        //       mandatoryAttr
        //     );

        //     if (missingAttr.length > 0) {
        //       let itemKey = `missingTagErr-${k}-err`;
        //       onSrchObj[
        //         itemKey
        //       ] = `'${missingAttr}' required for 'g2' tag in items/tags`;
        //     }
        //   }
        //   if (descriptor?.code === "origin") {
        //     list.forEach((tag) => {
        //       if (tag.descriptor.code === "country") {
        //         const alpha3Pattern = /^[A-Z]{3}$/;
        //         console.log("origin", alpha3Pattern.test(tag?.value));
        //         if (!alpha3Pattern.test(tag?.value)) {
        //           onSrchObj.originFrmtErr = `Country of origin should be in a valid 'ISO 3166-1 alpha-3' format e.g. IND, SGP`;
        //         } else {
        //           if (!constants.VALIDCOUNTRYCODES.includes(tag?.value)) {
        //             let itemKey = `originFrmtErr1-${k}-err`;
        //             onSrchObj[
        //               itemKey
        //             ] = `'${tag?.value}' is not a valid 'ISO 3166-1 alpha-3' country code`;
        //           }
        //         }
        //       }
        //     });
        //   }
        // });
        // let missingTags = [];

        // for (let tag of constants.ON_SEEARCH_ITEMTAGS) {
        //   if (!itemTagsSet.has(tag)) {
        //     missingTags.push(tag);
        //   }
        // }

        // if (missingTags.length > 0) {
        //   let itemKey = `missingItemTags-${k}-err`;
        //   onSrchObj[
        //     itemKey
        //   ] = `'${missingTags}' tag/s  required in /items/tags`;
        // }

        //checking offers
        const offers = provider?.offers;

        // Function to check if the offer contains the mandatory descriptor codes
        function validateOfferDetails(offer, i) {
          const offerCode = offer.descriptor.code;
          if (!constants.allowedOfferCodes.includes(offerCode)) {
            let itemKey = `offer-${i}-codeErr`;
            onSrchObj[itemKey] = `Offer ${
              offer.id
            } has an invalid descriptor code: ${offerCode}. Allowed codes are: ${constants.allowedOfferCodes.join(
              ", "
            )}`;
          }

          const requiredCodes = constants.mandatoryOfferTags[offerCode];

          // Find the 'offers_details' tag in the offer's tags array
          const offerDetailsTag = offer.tags.find(
            (tag) => tag.descriptor.code === "offers_details"
          );

          if (!offerDetailsTag) {
            let itemKey = `offer-${i}-tagErr`;
            onSrchObj[
              itemKey
            ] = `Offer ${offer.id} is missing the 'offers_details' tag.`;
          }

          // Get the list of descriptor codes in the 'offers_details' tag
          const offerDescriptorCodes = offerDetailsTag.list.map(
            (item) => item.descriptor.code
          );

          // Check if all required codes are present
          const missingCodes = requiredCodes?.filter(
            (code) => !offerDescriptorCodes.includes(code)
          );

          if (missingCodes?.length > 0) {
            let itemKey = `offer-${i}-detailErr`;
            onSrchObj[itemKey] = `Offer ${
              offer.id
            } is missing mandatory descriptor codes: ${missingCodes.join(
              ", "
            )}`;
          }
        }

        // Loop through all offers and validate
        offers.forEach((offer, i) => {
          validateOfferDetails(offer, i);
        });
      });
    }
  }

  return onSrchObj;
};
module.exports = checkOnSearch;
