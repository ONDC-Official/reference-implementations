const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const constants = require("../constants");
const dao = require("../../dao/dao");
const utils = require("../utils");


// ************************ GENERIC VALIDATIONS ************************

// ************************ SEARCH PAYLOAD ************************

// City code std:999 for international shipments
function isCityCodeValidForExport(data, errObj) {
  console.log(errObj);
    if(data?.context?.location?.city?.code !== "std:999") {
      errObj.cityCodeErr= "Invalid city code for exports";
    }
    console.log(errObj);
    
    return errObj;
};

// No buyer-ID in message > intent
function doesNotHaveBuyerIdInTags(data, errObj) {
    const tags = data?.message?.intent?.tags || [];
    for (let tag of tags) {
        if (tag?.descriptor?.code === "buyer_id") {
          errObj.buyerIDErr = "Intent tag cannot have buyer_id";
        }
    }
    return errObj;
};

// check for context cityCode and fulfillment end location
function checkValidDestination(data, errObj) {
  try {
    const stops = data?.message?.intent?.fulfillment?.stops;
    let endLocation;
    stops.forEach((stop) => {
      if (stop.type === "end") {
        endLocation = stop?.location;
      }
    });
    const pinToStd = JSON.parse(
      fs.readFileSync(path.join(__dirname, "pinToStd.json"), "utf8")
    );
    const stdCode = data.context?.location?.city?.code.split(":")[1];
    const area_code = endLocation?.area_code;
    if (pinToStd[area_code] && pinToStd[area_code] != stdCode) {
      errObj[
        "CityCode-Err"
      ] = `CityCode ${stdCode} should match the city for the fulfillment end location ${area_code}, ${pinToStd[area_code]}`;
    }
  } catch (err) {
    console.error("Error in city code check: ", err.message);
  }
  return errObj;
};

// Checking provider serviceability
function checkParameters(onSearch,  errObj){
  let domain = onSearch.context.domain;
  onSearch = onSearch.message.catalog;
  const payments = onSearch?.payments;
  const fulfillments = onSearch?.fulfillments;
  if (onSearch.hasOwnProperty("providers")) {
    const providers = onSearch["providers"];
    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      try {
      console.log("Checking provider serviceability");

      let providerTags = provider?.tags;
      let providerTagSet = new Set();
      if (providerTags) {
          providerTags.forEach((tag, j) => {
          if (providerTagSet.has(tag?.descriptor?.code)) {
              let itemKey = `duplicatePrvdrTag${j}`;
              errObj[
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
                errObj.mssngTagErr = `'${missingTags}' code/s required in providers/tags for serviceability`;
              }
              tag?.list.forEach(list=>{
              const {descriptor,value} = list;
              if(descriptor.code==='category'){
                  if(!value.startsWith(domain.split('ONDC:')[1])){
                    errObj.srvcCatgryErr=`Serviceability category must be defined for the same domain code as in context - ${domCode}`
                }
              }
            })
          }
        });
      }

      let missingTags = [];

      for (let tag of constants.ON_SEARCH_PROVIDERTAGS) {
          if (!providerTagSet.has(tag)) {
          missingTags.push(tag);
          }
      }

      if (missingTags.length > 0) {
          let itemKey = `missingPRVDRTags-${i}-err`;
          errObj[itemKey] = `${missingTags} are required in /providers/tags`;
      }

      if (domain === "ONDC:RET10" || domain === "ONDC:RET11") {
        if (
          !providerTagSet.has("FSSAI_LICENSE_NO") &&
          citycode !== "std:999"
        ) {
          errObj.fssaiErr = `For food businesses, FSSAI_LICENSE_NO is required in providers/tags`;
        }
      }
      } catch (error) {
          console.log(error);
      }

      //checking mandatory attributes for fashion and electronics
      let locations = provider.locations;
      provider.items.forEach((item, k) => {
        let payment_ids = item.payment_ids;
        let fulfillment_ids = item.fulfillment_ids;
        let location_ids = item.location_ids;
        let itemTags = item?.tags;
        let mandatoryAttr = [];
        let attrPresent = false;
        let missingAttr = [];

        try {
          console.log(
            "Comparing fulfillment_ids in /items and /fulfillments in /on_search"
          );

          let fulfillment_ids = item.fulfillment_ids;
          let fulfillmentSet = new Set();

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
            errObj[
              itemKey
            ] = `Fulfillment id/s ${missingIds} in /items does not exist in /fulfillments`;
          }
        } catch (error) {
          console.log(error);
        }

        try {
          console.log(
            "Comparing location_ids in /items and /providers/locations in /on_search"
          );

          let locationSet = new Set();

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
            errObj[
              itemKey
            ] = `Location id/s ${missingIds} in /items does not exist in /providers/locations`;
          }
        } catch (error) {
          console.log(error);
        }
        try {
          console.log(
            "Comparing payment_ids in /items and /payments in /on_search"
          );

          let paymentSet = new Set();

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
            errObj[
              itemKey
            ] = `Payment id/s ${missingIds} in /items does not exist in /payments`;
          }
        } catch (error) {
          console.log(error);
        }
        let itemTagsSet = new Set();
        itemTags.forEach((tag, i) => {
          let { descriptor, list } = tag;

          if (
            itemTagsSet.has(descriptor?.code) &&
            descriptor?.code !== "price_slab"
          ) {
            let itemKey = `duplicateTag${k}`;
            errObj[
              itemKey
            ] = `${descriptor?.code} is a duplicate tag in /items/tags`;
          } else {
            itemTagsSet.add(descriptor?.code);
          }

          if (
            descriptor?.code === "attribute" &&
            constants.ATTR_DOMAINS.includes(domain)
          ) {
            if (domain === "ONDC:RET12") {
              mandatoryAttr = constants.FASHION_ATTRIBUTES;
            }
            if (domain === "ONDC:RET14") {
              mandatoryAttr = constants.ELECTRONICS_ATTRIBUTES;
            }
            if (domain === "ONDC:RET12") {
              mandatoryAttr = constants.FASHION_ATTRIBUTES;
            }
            if (
              domain === "ONDC:RET1A" ||
              domain === "ONDC:RET1B" ||
              domain === "ONDC:RET1C" ||
              domain === "ONDC:RET1D"
            ) {
              mandatoryAttr = constants.MANDATORY_ATTRIBUTES;
            }
            attrPresent = true;
            missingAttr = utils.findMissingTags(
              list,
              descriptor.code,
              mandatoryAttr
            );

            if (missingAttr.length > 0) {
              let itemKey = `mssngAttrErr-${k}-err`;
              errObj[
                itemKey
              ] = `'${missingAttr}' attribute/s required in items/tags for ${domain} domain`;
            }
          }
          if (descriptor?.code === "g2") {
            mandatoryAttr = constants.G2TAGS;
            missingAttr = utils.findMissingTags(
              list,
              descriptor.code,
              mandatoryAttr
            );

            if (missingAttr.length > 0) {
              let itemKey = `missingTagErr-${k}-err`;
              errObj[
                itemKey
              ] = `'${missingAttr}' required for 'g2' tag in items/tags`;
            }
          }
          if (descriptor?.code === "origin") {
            list.forEach((tag) => {
              if (tag.descriptor.code === "country") {
                const alpha3Pattern = /^[A-Z]{3}$/;
                console.log("origin", alpha3Pattern.test(tag?.value));
                if (!alpha3Pattern.test(tag?.value)) {
                  errObj.originFrmtErr = `Country of origin should be in a valid 'ISO 3166-1 alpha-3' format e.g. IND, SGP`;
                } else {
                  if (!constants.VALIDCOUNTRYCODES.includes(tag?.value)) {
                    let itemKey = `originFrmtErr1-${k}-err`;
                    errObj[
                      itemKey
                    ] = `'${tag?.value}' is not a valid 'ISO 3166-1 alpha-3' country code`;
                  }
                }
              }
            });
          }
        });

        let missingTags = [];

        for (let tag of constants.ON_SEEARCH_ITEMTAGS) {
          if (!itemTagsSet.has(tag)) {
            missingTags.push(tag);
          }
        }

        if (missingTags.length > 0) {
          let itemKey = `missingItemTags-${k}-err`;
          errObj[
            itemKey
          ] = `'${missingTags}' tag/s  required in /items/tags`;
        }
        if (constants.ATTR_DOMAINS.includes(domain) && !attrPresent) {
          let itemKey = `attrMissing-${k}-err`;
          errObj[
            itemKey
          ] = `code = 'attribute' is missing in /items/tags for domain ${domain}`;
        }
      });
    }
  }
  return errObj;
};

// ************************ SELECT PAYLOAD ************************

// comparing provider in action and on_action call 

function checkProviderForSelect(select, errObj) {
  try {
    let providersArr = dao.getValue("providersArr");
    console.log(`Comparing provider object in /select and /on_search`);
    if (select.provider) {
      onSearchitemsArr = dao.getValue(`${select.provider.id}itemsArr`);
      let providerObj = providersArr?.filter(
        (prov) => prov.id === select.provider.id
      );
      if (!providerObj || providerObj?.length < 1) {
        errObj.prvdrErr = `Provider with id '${select.provider.id}' does not exist in the catalog provided in /on_search`;
      } else {
        if (
          (!select?.provider?.locations ||
            select?.provider?.locations?.length < 1) &&
          providerObj[0]?.locations?.length > 1
        ) {
          errObj.provLocErr = `Provider location is mandatory if provided in the catalog in /on_search`;
        } else if (select?.provider?.locations) {
          let providerLocArr = select.provider.locations;
          let providerLocExists = false;
          providerLocArr.forEach((location, i) => {
            providerObj[0]?.locations?.forEach((element) => {
              console.log(location.id, element.id);

              if (location.id === element.id) providerLocExists = true;
            });

            if (!providerLocExists) {
              let itemkey = `providerLocErr${i}`;
              errObj[
                itemkey
              ] = `Provider location with id '${location.id}' does not exist in the catalog provided in /on_search`;
            }
            providerLocExists = false;
          });
        }
      }
    }
  } catch (error) {
    console.log(
      `!!Error while checking provider object in /${constants.LOG_select}`,
      error
    );
  }
  return errObj;
}

// message > items > tag should not have a code named BUYER_TERMS
function hasNoBuyerTerms(data, errObj) {
  if (data.message.order.items.some(item => item.id === "BUYER_TERMS")) {
    errObj.buyerTermErr = "Items tag should not have a code named 'BUYER_TERMS'.";
  }
  return errObj;
};


function checkItemsAndFulfillmentsForSelect(data, errObj) {
  try {
    let citycode = data?.context?.location?.city?.code;
    data = data.message.order;
    let itemsArr = data.items;
    let fulfillments = data.fulfillments;
    let fulfillmentsArr = dao.getValue("fulfillmentsArr");
    let onSearchitemsArr = dao.getValue(`${data.provider.id}itemsArr`);
    console.log(`Comparing item object in /select and /on_search`);

    itemsArr?.forEach((item, i) => {
      let itemTags = item?.tags;

      if(itemTags && !rfq){
        errObj.itemTagErr=`items/tags (BUYER TERMS) should not be provided for Non-RFQ Flow`
      }

      let itemExists = false;
      onSearchitemsArr?.forEach((element) => {
        if (item.id === element.id) itemExists = true;
      });
      if (!itemExists) {
        console.log("3 : ", errObj);

        let itemkey = `itemErr${i}`;
        errObj[itemkey] = `Item Id '${item.id}' does not exist in /on_search`;
      } else {
        let itemObj = onSearchitemsArr.filter(
          (element) => element.id === item.id
        );

        itemObj = itemObj[0];
        // dao.setValue("selectedItem", itemObj.id);
        if (
          !_.every(item.fulfillment_ids, (element) =>
            _.includes(itemObj.fulfillment_ids, element)
          )
        ) {
          let itemkey = `flflmntIdErr${i}`;
          errObj[
            itemkey
          ] = `Fulfillment ids for item with id '${item.id}' does not match with the catalog provided in /on_search`;
        }
        if (
          !_.every(item.location_ids, (element) =>
            _.includes(itemObj.location_ids, element)
          )
        ) {
          let itemkey = `lctnIdErr${i}`;
          errObj[
            itemkey
          ] = `Location ids for item with id '${item.id}' does not match with the catalog provided in /on_search`;
        }

        //checking fulfillments
        fulfillments.forEach((fulfillment, i) => {
          let fulfillmentTags = fulfillment?.tags;

          if (citycode === "std:999" && !fulfillmentTags) {
            errObj.fullfntTagErr = `Delivery terms (INCOTERMS) are required for exports in /fulfillments/tags`;
          }
          let bppfulfillment = fulfillmentsArr?.find(
            (element) => element.id === fulfillment.id
          );
          if (!bppfulfillment) {
            let itemkey = `flfillmentIDerr${i}`;
            errObj[
              itemkey
            ] = `Fulfillment id '${fulfillment.id}' does not match with the catalog provided in /on_search`;
          } else if (fulfillment.type !== bppfulfillment?.type) {
            let itemkey = `flfillmentTypeErr${i}`;
            errObj[
              itemkey
            ] = `Fulfillment type '${fulfillment.type}' for fulfillment id '${fulfillment.id}' does not match with the catalog provided in /on_search`;
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }

  return errObj;
};

function checkItemFromSelect(data, errObj) {
  try {
    const items = data.items;
    const selectedItems = dao.getValue("slctdItemsArray");
    console.log("Comparing items object with /select");
    const itemDiff = utils.findDifferencesInArrays(items, selectedItems);
    console.log(itemDiff);

    itemDiff.forEach((item, i) => {
      let index = item.attributes.indexOf("fulfillment_ids");
      if (index !== -1) {
        item.attributes.splice(index, 1);
      }
      if (item.attributes?.length > 0) {
        let itemkey = `item-${i}-DiffErr`;
        errObj[
          itemkey
        ] = `In /items, '${item.attributes}' mismatch from /select for item with id ${item.index}`;
      }
    });
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkFulfillmentForOnSelect(data, errObj) {
  try {
    let citycode = data?.context?.location?.city?.code;
    data = data.message.order;
    let fulfillments = data?.fulfillments;
    console.log("Checking fulfillment object in /on_select");
    if (fulfillments) {
      fulfillments.forEach((fulfillment) => {
        let fulfillmentTags = fulfillment?.tags;
          
        if (citycode === "std:999" && !fulfillmentTags) {
          errObj.fullfntTagErr = `Delivery terms (INCOTERMS) are required for exports in /fulfillments/tags`;
        }
        ffId = fulfillment?.id;
        ffState = fulfillment?.state?.descriptor?.code;
      });
    }
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkQuotationBreakup(data, errObj) {
  let quote = data?.quote;
  const items = data.items;
  let ffState, ffId;
  let deliveryQuoteItem = false;
  let deliveryCharge = 0;
  let outOfStock = false;
  try {
    console.log(`Checking quote object in /on_select api`);
   
    quote?.breakup.forEach((breakup, i) => {
      let itemPrice = parseFloat(breakup?.item?.price?.value);
      let available = Number(breakup?.item?.quantity?.available?.count);
      let quantity = breakup["@ondc/org/item_quantity"];


    
      if (
        breakup["@ondc/org/title_type"] === "delivery" &&
        breakup["@ondc/org/item_id"] === ffId
      ) {
        deliveryQuoteItem = true;
        deliveryCharge = breakup?.price?.value;
        console.log("deliverycharge", deliveryCharge);
      }
      if (
        breakup["@ondc/org/title_type"] === "item" &&
        quantity &&
        parseFloat(breakup.price.value).toFixed(2) !=
          parseFloat(itemPrice * quantity?.count).toFixed(2)
      ) {
        let item = `quoteErr${i}`;
        errObj[
          item
        ] = `Total price of the item with item id ${breakup["@ondc/org/item_id"]} is not in sync with the unit price and quantity`;
      }

      if (
        breakup["@ondc/org/title_type"] === "item" &&
        quantity &&
        quantity?.count > available
      ) {
        let item = `quoteErr${i}`;
        errObj[
          item
        ] = `@ondc/org/item_quantity for item with id ${breakup["@ondc/org/item_id"]} cannot be more than the available count (quantity/avaialble/count) in quote/breakup`;
      }
    });
  

    items?.forEach(item=>{
      let itemId= item?.id
      let itemQuant = item?.quantity?.selected?.count

      quote?.breakup.forEach(breakup=>{

        if(breakup['@ondc/org/title_type']==='item' && breakup['@ondc/org/item_id']===itemId){
          if(itemQuant===breakup['@ondc/org/item_quantity'].count && outOfStock == true){
            errObj.quoteItemQuantity=`In case of item quantity unavailable, item quantity in quote breakup should be updated to the available quantity`
          }
          if(itemQuant!==breakup['@ondc/org/item_quantity'].count && outOfStock == false){
            errObj.quoteItemQuantity1=`Item quantity in quote breakup should be equal to the items/quantity/selected/count`
          }
          if(itemQuant>breakup['@ondc/org/item_quantity'].count && outOfStock==false){
            errObj.outOfStockErr=`Error object with appropriate error code should be sent when the selected item quantity is not available`
          }
        }
      })
    })
    if (!deliveryQuoteItem && ffState === "Serviceable") {
      errObj.deliveryQuoteErr = `Delivery charges should be provided in quote/breakup when fulfillment is 'Serviceable'`;
    }
    if (
      deliveryQuoteItem &&
      deliveryCharge != 0 &&
      ffState === "Non-serviceable"
    ) {
      errObj.deliveryQuoteErr = `Delivery charges are not required or should be zero in quote/breakup when fulfillment is 'Non-serviceable'`;
    }

    if (ffState === "Non-serviceable" && !data.error) {
      errObj.nonSrvcableErr = `Error object with appropriate error code should be sent in case fulfillment is 'Non-serviceable`;
    }
  } catch (error) {
    console.log(
      `!!Error while checking providers array in /on_select api`,
      error
    );
  }

  return errObj;
};

// ************************ INIT PAYLOAD ************************

function checkFulfillmentForInit(data, errObj) {
  let citycode = data?.context?.location?.city?.code;
  let init = data.message.order;
  let items = init.items;
  let fulfillments = init.fulfillments;
  const selectedItems = dao.getValue("onSlctdItemsArray");
  console.log("onSlctdItemsArray ::: ", selectedItems);


  try {
    console.log("Comparing items and fulfillments object with /on_select");
    fulfillments.forEach((fulfillment, i) => {
      let fulfillmentTags = fulfillment?.tags;

      if (citycode === "std:999" && !fulfillmentTags) {
        errObj.fullfntTagErr = `Delivery terms (INCOTERMS) are required for exports in /fulfillments/tags`;
      }
    });

    const itemDiff = utils.findDifferencesInArrays(items, selectedItems);
    console.log(itemDiff);
    itemDiff.forEach((item, i) => {
      if (item?.attributes?.length > 0) {
        let itemkey = `item-${i}-DiffErr`;
        errObj[
          itemkey
        ] = `In /items, '${item.attributes}' mismatch from /on_select for item with id ${item.index}`;
      }
    });
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkPaymentForOnInit(data, errObj) {
  let payments = data?.payments;

  let rfq = dao.getValue("rfq");
  console.log("rfq ::: ", rfq);
  try {
    console.log(`Checking payment object in /on_init api`);
    payments?.forEach((payment) => {
      let type = payment?.type;
      let collectedBy = payment?.collected_by;
      let feeType = payment["@ondc/org/buyer_app_finder_fee_type"];
      let feeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

      if (type === "PRE-FULFILLMENT" && collectedBy === "BPP" && !rfq) {
        if (!payment.uri) {
          errObj.msgUri = `Payment gateway link (uri) should be sent by BPP in case of prepaid orders`;
        }
        if (!payment?.tags) {
          errObj.msngPymntags = `/payments/tags are required for prepaid payments collected by BPP`;
        } else {
          payment?.tags.forEach((tag) => {
            let paymentTagsSet = new Set();
            if (tag?.descriptor?.code === "BPP_payment") {
              if (tag?.list) {
                tag.list.forEach((val) => {
               

                  paymentTagsSet.add(val?.descriptor?.code);
                });
                let missingTags = [];

                for (let tag of constants.BPP_PAYMENT_TAGS) {
                  if (!paymentTagsSet.has(tag)) {
                    missingTags.push(tag);
                  }
                }

                if (missingTags.length > 0) {
                  errObj.missingPymntTags = `${missingTags} are required in BPP_payment tag in /payments/tags`;
                }
              }
            } else {
              errObj.msngPymntags1 = `BPP_payment tag is missing in /payments/tags`;
            }
          });
        }
      }
      if (feeType != dao.getValue("buyerFinderFeeType")) {
        errObj.feeTypeErr = `Buyer Finder Fee type mismatches from /search`;
      }
      if (
        parseFloat(feeAmount) !=
        parseFloat(dao.getValue("buyerFinderFeeAmount"))
      ) {
        errObj.feeTypeErr = `Buyer Finder Fee amount mismatches from /search`;
      }
    });
  } catch (error) {
    console.log(
      `!!Error while checking providers array in /on_init api`,
      error
    );
  }
  return errObj;
};

// ************************ CONFIRM PAYLOAD ************************

function comparingItemsData(data, errObj) {
  let items = data.items;
  const selectedItems = dao.getValue("onSlctdItemsArray");
  try {
    console.log("Comparing items object with /on_select");
    const itemDiff = utils.findDifferencesInArrays(items, selectedItems);
    console.log(itemDiff);
    itemDiff.forEach((item, i) => {
      if(item?.attributes?.length>0){
      let itemkey = `item-${i}-DiffErr`;
      errObj[
        itemkey
      ] = `In /items, '${item.attributes}' mismatch from /on_select for item with id ${item.index}`;
    }
    });
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkPaymentForConfirm(data, errObj) {
  let orderState = data.state;
  let payments = data?.payments;

  try {
    console.log(`Checking payment object in /confirm api`);
    payments.forEach((payment) => {
      let feeType = payment["@ondc/org/buyer_app_finder_fee_type"];
      let feeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];
      let paymentStatus = payment?.status;
      let paymentType = payment?.type;
      let params = payment?.params;

      if (feeType != dao.getValue("buyerFinderFeeType")) {
        errObj.feeTypeErr = `Buyer Finder Fee type mismatches from /search`;
      }
      if (
        parseFloat(feeAmount) !=
        parseFloat(dao.getValue("buyerFinderFeeAmount"))
      ) {
        errObj.feeTypeErr = `Buyer Finder Fee amount mismatches from /search`;
      }

      if (paymentStatus === "PAID" && !params?.transaction_id) {
        errObj.pymntErr = `Transaction ID in payments/params is required when the payment status is 'PAID'`;
      }
      if (paymentStatus === "NOT-PAID" && params?.transaction_id) {
        errObj.pymntErr = `Transaction ID in payments/params cannot be provided when the payment status is 'NOT-PAID'`;
      }
      if (
        paymentType === "ON-FULFILLMENT" &&
        orderState != "Completed" &&
        paymentStatus === "PAID"
      ) {
        errObj.pymntstsErr = `Payment status will be 'PAID' once the order is 'Completed' for payment type 'ON-FULFILLMENT'`;
      }
    });
  } catch (error) {
    console.log(
      `!!Error while checking providers array in /confirm api`,
      error
    );
  }
  return errObj;
};

function checkOrderTags(data, errObj) {
  let orderTags = data?.tags
  try {
    console.log("Checking order tags");

    if(orderTags){
      orderTags.forEach(tag=>{
        const {descriptor,list}= tag
        if(descriptor.code==='bap_terms'){
          list.forEach(listTag=>{
            let enums=["Y","N"]
            const {descriptor,value}= listTag;
            if(descriptor.code==='accept_bpp_terms' && !enums.includes(value) ){
              errObj.invalidVal=`Invalid value for 'accept_bpp_terms' tag in order/tags/bap_terms`
            }
          })
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkFulfillmentForOnConfirm(data, errObj) {
  let fulfillments = data?.fulfillments;
  let prvdrLocation = data?.provider?.locations;
  prvdrLocation=prvdrLocation[0];
  try {
    console.log("Checking fulfillments in /on_confirm");
    fulfillments.forEach(fulfillment=>{
        let stops = fulfillment?.stops

        stops.forEach(stop=>{
            if(stop?.type==='start'){
                if(stop?.location?.id!==prvdrLocation?.id){
                  errObj.strtlctnErr=`fulfillments/start/location/id - ${stop?.location?.id} is not matching with the provider location id - ${prvdrLocation?.id} provided in /on_search`
                }
            }
        })
    })
  } catch (error) {
    console.log("ERROR",error);
  }
  return errObj;
};

function checkPaymentForOnConfirm(data, errObj) {
  let payments = data?.payments;
  let rfq = dao.getValue("rfq");
  try {
    console.log(`Checking payment object in /on_confirm api`);

    payments?.forEach((payment) => {
      let type = payment?.type;
      let collectedBy = payment?.collected_by;
      let feeType = payment["@ondc/org/buyer_app_finder_fee_type"];
      let feeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

      if (type === "PRE-FULFILLMENT" && collectedBy === "BPP" && rfq) {
        if (!payment.uri) {
          errObj.msgUri = `Payment gateway link (uri) should be sent by BPP in case of prepaid orders`;
        }
        if (!payment?.tags) {
          errObj.msngPymntags = `/payments/tags are required for prepaid payments collected by BPP`;
        } else {
          payment?.tags.forEach((tag) => {
            let paymentTagsSet = new Set();
            if (tag?.descriptor?.code === "BPP_payment") {
              if (tag?.list) {
                tag.list.forEach((val) => {
                 

                  paymentTagsSet.add(val?.descriptor?.code);
                });
                let missingTags = [];

                for (let tag of constants.BPP_PAYMENT_TAGS) {
                  if (!paymentTagsSet.has(tag)) {
                    missingTags.push(tag);
                  }
                }

                if (missingTags.length > 0) {
                  errObj.missingPymntTags = `${missingTags} are required in BPP_payment tag in /payments/tags`;
                }
              }
            } else {
              errObj.msngPymntags1 = `BPP_payment tag is missing in /payments/tags`;
            }
          });
        }
      }
      if (feeType != dao.getValue("buyerFinderFeeType")) {
        errObj.feeTypeErr = `Buyer Finder Fee type mismatches from /search`;
      }
      if (
        parseFloat(feeAmount) !=
        parseFloat(dao.getValue("buyerFinderFeeAmount"))
      ) {
        errObj.feeTypeErr = `Buyer Finder Fee amount mismatches from /search`;
      }
    });
  } catch (error) {
    console.log(
      `!!Error while checking providers array in /on_Confirm api`,
      error
    );
  }
  return errObj;
};

// ************************ STATUS PAYLOAD ************************

function checkPaymentOfOnStatus(data, errObj) {
  let payments = data?.payments;
  try {
    console.log(`Checking payment object in /on_status`);
    payments.forEach((payment) => {
      let paymentStatus = payment?.status;
      let paymentType = payment?.type;
      let params = payment?.params;

      if (paymentStatus === "PAID" && !params?.transaction_id) {
        errObj.pymntErr = `Transaction ID in payments/params is required when the payment status is 'PAID'`;
      }
      if (paymentStatus === "NOT-PAID" && params?.transaction_id) {
        errObj.pymntErr = `Transaction ID in payments/params cannot be provided when the payment status is 'NOT-PAID'`;
      }
      if (
        paymentType === "ON-FULFILLMENT" &&
        orderState != "Completed" &&
        paymentStatus === "PAID"
      ) {
        errObj.pymntstsErr = `Payment status will be 'PAID' once the order is 'Completed' for payment type 'ON-FULFILLMENT'`;
      }
    });
  } catch (error) {
    console.log(error);
  }
  return errObj;
};

function checkTimestampForOnStatus(data, errObj) {
  let fulfillments = data.fulfillments;
  try {
    fulfillments.forEach((fulfillment) => {
      ffState = fulfillment?.state?.descriptor?.code;
      console.log(
        `Comparing pickup and delivery timestamps for on_status_${ffState}`
      );
      //Pending,Packed,Agent-assigned
      if (fulfillment.type === "Delivery") {
        if (
          ffState === "Pending" ||
          ffState === "Agent-assigned" ||
          ffState === "Packed"
        ) {
         
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              if (stop?.time?.timestamp) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
          if(invoice && !rfq) errObj.invoiceErr=`/documents (Invoice) is not required before order is picked up for Non RFQ Flow.`
        }
        //Order-picked-up

        if (ffState === "Order-picked-up") {
         
          if (orderState !== "In-progress") {
            errObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              dao.setValue("pickupTime", pickupTime);
              if (!pickupTime) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              }

              if (_.gt(pickupTime, contextTime)) {
                errObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
          if(!invoice) errObj.invoiceErr=`/documents (Invoice) is required once the order is picked up`
        }

        //Out-for-delivery
        if (ffState === "Out-for-delivery") {
          
          if (orderState !== "In-progress") {
            errObj.ordrStatErr = `Order state should be 'In-progress' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;

              if (!pickupTime) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              } else if (
                dao.getValue("pickupTime") &&
                pickupTime !== dao.getValue("pickupTime")
              ) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
          if(!invoice) errObj.invoiceErr=`/documents (Invoice) is required once the order is picked up`
        }

        //Order-delivered
        if (ffState === "Order-delivered") {
         
          if (orderState !== "Completed") {
            errObj.ordrStatErr = `Order state should be 'Completed' for fulfillment state - ${ffState}`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              if (!pickupTime) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              } else if (
                dao.getValue("pickupTime") &&
                pickupTime !== dao.getValue("pickupTime")
              ) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot change for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              deliveryTime = stop?.time?.timestamp;
              dao.setValue("deliveryTime", deliveryTime);

              if (!deliveryTime) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) is required for fulfillment state - ${ffState}`;
              }
              if (_.gt(deliveryTime, contextTime)) {
                errObj.tmstmpErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
              if (_.gte(pickupTime, deliveryTime)) {
                errObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be greater than or equal to  delivery timestamp (fulfillments/end/time/timestamp) for fulfillment state - ${ffState}`;
              }
            }
          });
          if(!invoice) errObj.invoiceErr=`/documents (Invoice) is required once the order is picked up`
        }
      }
      if (fulfillment.type === "Self-Pickup") {
        if (
          ffState === "Pending" ||
          ffState === "Packed"
        ) {
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              if (stop?.time?.timestamp) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
        }

        if (ffState === "Order-picked-up") {
          if (orderState !== "Completed") {
            errObj.ordrStatErr = `Order state should be 'Completed' once the order is picked up`;
          }
          fulfillment.stops.forEach((stop) => {
            if (stop.type === "start") {
              pickupTime = stop?.time?.timestamp;
              dao.setValue("pickupTime", pickupTime);
              if (!pickupTime) {
                errObj.pickupTimeErr = `Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - ${ffState}`;
              }

              if (_.gt(pickupTime, contextTime)) {
                errObj.tmstmpErr = `Pickup timestamp (fulfillments/start/time/timestamp) cannot be future dated w.r.t context/timestamp for fulfillment state - ${ffState}`;
              }
            }

            if (stop.type === "end") {
              if (stop?.time?.timestamp) {
                errObj.deliveryTimeErr = `Delivery timestamp (fulfillments/end/time/timestamp) cannot be provided for fulfillment state - ${ffState}`;
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(`Error checking fulfillments/start in /on_status`);
  }
  console.log(errObj);
  return errObj;
};

module.exports = {
    isCityCodeValidForExport,
    doesNotHaveBuyerIdInTags,
    hasNoBuyerTerms,
    checkValidDestination,
    checkParameters,
    checkProviderForSelect,
    checkItemsAndFulfillmentsForSelect, 
    checkItemFromSelect,
    checkFulfillmentForOnSelect,
    checkQuotationBreakup,
    checkFulfillmentForInit,
    checkPaymentForOnInit,
    comparingItemsData,
    checkPaymentForConfirm,
    checkOrderTags,
    checkFulfillmentForOnConfirm,
    checkPaymentForOnConfirm,
    checkPaymentOfOnStatus,
    checkTimestampForOnStatus
};


// ********************************** END **********************************

// // city code starts with UN for international shipments
// function isCityCodeStartsWithUN(data, msgId, srchObj) {
//     if(data?.context?.location?.city?.code.startsWith("UN")) {
//         srchObj[msgId + ":context.city"] = "City code should start with UN";
//     }
//     return srchObj;
// };

// // only pre fulfillment payement allowed
// function isPaymentTypePreFulfillment(data, msgId, srchObj) {
//     if (payload.message.order.payments.some(payment => payment.type !== "PRE-FULFILLMENT")) {
//         srchObj[msgId + ":paymentType"] = "Payment should be 'PRE_FULFILLMENT'.";
//     }
//     return srchObj;
// };

// // no shipment to any buyer
// // const doesNotHaveBuyerIdInTags = (data, msgId, srchObj) => {
// //     const tags = data?.message?.intent?.tags || [];
// //     for (let tag of tags) {
// //         if (tag?.descriptor?.code === "buyer_id") {
// //         srchObj[msgId + ":intent.tag"] = "Intent tag cannot have buyer_id";
// //         }
// //     }
// //     return srchObj;
// // };

// //country -- not IND
// function isCountryCodeNotIND(data, msgId, srchObj){
//     if( data?.context?.location?.country?.code != "IND") {
//         srchObj[msgId + ":country.code"] = "Order location cannot be INDIA";
//     }
//     return srchObj;
// };

