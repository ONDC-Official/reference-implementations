const _ = require("lodash");
const dao = require("../../../dao/dao");
const constants = require("../../constants");
const utils = require("../../utils");

const checkInit = (data, msgIdSet) => {
  const billing = data.message.order.billing;
  const billingAdd = billing.address;
  const contextTimestamp = data?.context.timestamp;
  let initItemId = [];
  const cod_order = dao.getValue("cod_order");
  const COD_ITEM = dao.getValue("COD_ITEM");
  const initObj = {};
  let init = data;
  let p2h2p = false;
  init = init.message.order;

  let itemsArr = init?.items;
  let fulfillmentsArr = init?.fulfillments;
  let bppFulfillmentsArr = dao.getValue("bppFulfillmentsArr");
  const callMasking = dao.getValue("call_masking");
  const paymentWallet = dao.getValue("payment_wallet");
  const quick_commerce = dao.getValue("quick_commerce");
  const search_fulfill_request = dao.getValue("search_fulfill_request");
  const onSearchFulfillResponse = dao.getValue("on_search_fulfill_response");
  let onSearchitemsArr;
  let providersArr = dao.getValue("providersArr");

  //provider check
  try {
    console.log(`Comparing provider object in /init and /on_search`);
    if (init.provider) {
      onSearchitemsArr = dao.getValue(`${init.provider.id}itemsArr`);
      let providerObj = providersArr?.filter(
        (prov) => prov?.id === init?.provider?.id
      );
      if (!providerObj || providerObj?.length < 1) {
        initObj.prvdrErr = `Provider with id '${init.provider.id}' does not exist in the catalog provided in /on_search`;
      } else {
        if (
          (!init?.provider?.locations ||
            init?.provider?.locations?.length < 1) &&
          providerObj[0]?.locations?.length > 1
        ) {
          initObj.provLocErr = `Provider location is mandatory if provided in the catalog in /on_search`;
        } else if (init?.provider?.locations) {
          let providerLocArr = init?.provider?.locations;
          let providerLocExists = false;
          providerLocArr.forEach((location, i) => {
            providerObj[0]?.locations?.forEach((element) => {
              console.log(location?.id, element?.id);

              if (location?.id === element?.id) providerLocExists = true;
            });

            if (!providerLocExists) {
              let itemkey = `providerLocErr${i}`;
              initObj[
                itemkey
              ] = `Provider location with id '${location?.id}' does not exist in the catalog provided in /on_search`;
            }
            providerLocExists = false;
          });
        }
      }
    }
  } catch (error) {
    console.log(
      `!!Error while checking provider object in /${constants.LOG_INIT}`,
      error?.stack
    );
  }

  if (paymentWallet) {
    const collectedBy = init?.payment?.collected_by;

    if (!collectedBy) {
      initObj.paymentCollectedByErr = `payment/collected_by is mandatory for payment_wallet flow`;
    } else if (collectedBy !== "BPP") {
      initObj.paymentCollectedByErr = `payment/collected_by should be 'BPP' for payment_wallet flow`;
    }
  }

  if (init?.payment?.type === "POST-FULFILLMENT") {
    const requiredFields = {
      "@ondc/org/settlement_basis":
        "payment/@ondc/org/settlement_basis is mandatory for POST-FULFILLMENT payment type",
      "@ondc/org/settlement_window":
        "payment/@ondc/org/settlement_window is mandatory for POST-FULFILLMENT payment type",
    };

    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!init?.payment?.[field]) {
        const errorKey = `payment${field.replace(/[^a-zA-Z]/g, "")}Err`;
        initObj[errorKey] = errorMessage;
      }
    }
  }

  //billing check
  if (billing?.created_at > contextTimestamp) {
    initObj.BilngcreatedAtErr = `billing/created_at cannot be future dated w.r.t context/timestamp`;
  }

  if (billing?.updated_at > contextTimestamp) {
    initObj.BilngupdtdAtErr = `billing/updated_at cannot be future dated w.r.t context/timestamp`;
  }
  //item check
  try {
    console.log(`Comparing item object in /init and /on_search`);
    let itemExists = false;
    itemsArr?.forEach((item, i) => {
      if (quick_commerce) {
        if (item?.category_id !== "Instant Delivery")
          initObj.itemCatIdErr = `Item category id should be 'Instant Delivery' for quick commerce flow`;
      }

      initItemId.push(item?.id);
      dao.setValue("init_item_category_id", item?.category_id ?? "");
      if (item?.descriptor?.code === "P2H2P") {
        p2h2p = true;
      }
      onSearchitemsArr?.forEach((element) => {
        if (item?.id === element?.id) itemExists = true;
      });
      if (!itemExists) {
        let itemkey = `itemErr${i}`;
        initObj[itemkey] = `Item Id '${item.id}' does not exist in /on_search`;
      } else {
        let itemObj = onSearchitemsArr?.filter(
          (element) => element?.id === item?.id
        );

        itemObj = itemObj[0];
        dao.setValue("selectedItem", itemObj?.id);
        console.log(itemObj.id);
        if (item?.category_id != itemObj?.category_id) {
          let itemkey = `catIdErr${i}`;
          initObj[
            itemkey
          ] = `Category id '${item.category_id}' for item with id '${item.id}' does not match with the catalog provided in /on_search`;
        }
        fulfillmentsArr.forEach((fulfillment, i) => {
          if (callMasking) {
            if (fulfillment?.type === "Delivery") {
              // START CONTACT

              if (!fulfillment?.start?.contact?.phone) {
                const allowedMaskedTypes = [
                  "ivr_pin",
                  "ivr_without_pin",
                  "api_endpoint",
                ];
                const maskedTag = fulfillment?.tags?.find(
                  (tag) => tag.code === "masked_contact"
                );

                if (!maskedTag) {
                  initObj.maskedContactErr = `'masked_contact' tag is required in /fulfillments in start object.`;
                } else {
                  const list = maskedTag.list || [];
                  const requiredCodes = ["type", "setup", "token"];
                  const foundCodes = new Set();

                  for (const item of list) {
                    if (!item.code || item.value == null) {
                      initObj.listmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                    }

                    foundCodes.add(item.code);

                    if (
                      item.code === "type" &&
                      !allowedMaskedTypes.includes(item.value)
                    ) {
                      initObj.typemaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                        ", "
                      )}. Found: '${item.value}'`;
                    }

                    if (
                      (item.code === "setup" || item.code === "token") &&
                      (!item.value || typeof item.value !== "string")
                    ) {
                      initObj.setupmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                    }
                  }

                  for (const code of requiredCodes) {
                    if (!foundCodes.has(code)) {
                      initObj.codemaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
                    }
                  }
                }
              }

              // END CONTACT

              if (!fulfillment?.end?.contact?.phone) {
                const allowedMaskedTypes = [
                  "ivr_pin",
                  "ivr_without_pin",
                  "api_endpoint",
                ];
                const maskedTag = fulfillment?.tags?.find(
                  (tag) => tag.code === "masked_contact"
                );

                if (!maskedTag) {
                  initObj.endmaskedContactErr = `'masked_contact' tag is required in /fulfillments in end.`;
                } else {
                  const list = maskedTag.list || [];
                  const requiredCodes = ["type", "setup", "token"];
                  const foundCodes = new Set();

                  for (const item of list) {
                    if (!item.code || item.value == null) {
                      initObj.listendmaskedContactErr = `Each item in 'masked_contact' must contain both 'code' and 'value'.`;
                    }

                    foundCodes.add(item.code);

                    if (
                      item.code === "type" &&
                      !allowedMaskedTypes.includes(item.value)
                    ) {
                      initObj.typeendmaskedContactErr = `'type' in 'masked_contact' must be one of: ${allowedMaskedTypes.join(
                        ", "
                      )}. Found: '${item.value}'`;
                    }

                    if (
                      (item.code === "setup" || item.code === "token") &&
                      (!item.value || typeof item.value !== "string")
                    ) {
                      initObj.setupendmaskedContactErr = `'${item.code}' in 'masked_contact' must be a non-empty string.`;
                    }
                  }

                  for (const code of requiredCodes) {
                    if (!foundCodes.has(code)) {
                      initObj.codeendmaskedContactErr = `'masked_contact' tag must contain '${code}' in its list.`;
                    }
                  }
                }
              }
            }
          }

          fulfillment?.tags?.forEach((item) => {
            if (item?.code === "linked_provider") {
              dao.setValue("init_linked_provider", item);
            }
          });

          if (quick_commerce) {
            const fulfillmentBatch = fulfillmentsArr?.find(
              (i) => i.type === "Batch"
            );
            if (!fulfillmentBatch) {
              initObj[
                `quick_commerce_fulfillmentType_Err`
              ] = `Fulfillment type "Batch" should be there is fulfillments array for quick commerce logistics`;
            } else {
              if (fulfillmentBatch?.tags) {
                const fulfillRequestTag = fulfillmentBatch.tags.find(
                  (tag) => tag.code === "fulfill_request"
                );
                const fulfillResponseTag = fulfillmentBatch.tags.find(
                  (tag) => tag.code === "fulfill_response"
                );

                if (!fulfillRequestTag) {
                  initObj[
                    `quick_commerce_fulfillRequestTag_Err`
                  ] = `Fulfillment tags should include a code 'fulfill_request' for quick commerce logistics`;
                } else {
                  const sortedList1 = _.sortBy(search_fulfill_request, "code");
                  const sortedList2 = _.sortBy(fulfillRequestTag, "code");

                  const areEqual =
                    _.isEqual(sortedList1, sortedList2) &&
                    search_fulfill_request.code === fulfillRequestTag.code;

                  if (!areEqual) {
                    initObj[
                      `quick_commerce_fulfillReuqest`
                    ] = `Fulfillment tags code 'fulfill_request' doesnot match with the one provided in search payload for quick commerce logistics`;
                  }
                }

                if (!fulfillResponseTag) {
                  initObj[
                    `quick_commerce_fulfillResponseTag_Err`
                  ] = `Fulfillment tags should include a code 'fulfill_response' for quick commerce logistics`;
                } else {
                  const sortedList1 = _.sortBy(onSearchFulfillResponse, "code");
                  const sortedList2 = _.sortBy(fulfillResponseTag, "code");
                  const areEqual =
                    _.isEqual(sortedList1, sortedList2) &&
                    onSearchFulfillResponse.code === fulfillResponseTag.code;

                  if (!areEqual) {
                    initObj[
                      `quick_commerce_fulfillReuqest`
                    ] = `Fulfillment tags code 'fulfill_response' doesnot match with the one provided in search payload for quick commerce logistics`;
                  }
                }
              } else
                initObj[
                  `quick_commerce_fulfillmenttags`
                ] = `Fulfillment tags is missing.`;
            }
          }

          if (cod_order) {
            const linkedOrderTag = fulfillment?.tags?.find(
              (tag) => tag.code === "linked_order"
            );
            const codOrderItem = linkedOrderTag.list?.find(
              (item) => item.code === "cod_order"
            );
            if (!linkedOrderTag) {
              initObj.codOrderErr = `linked_order tag is mandatory in /init when order type is COD`;
            } else if (!codOrderItem) {
              initObj.codOrderErr = `cod_order code must be present inside linked_order for COD`;
            } else if (codOrderItem?.value !== cod_order)
              initObj.codOrderErr = `cod_order value '${codOrderItem?.value}' in linked_order does not match with the one provided in /search (${cod_order})`;
          }

          if (fulfillment?.id !== itemObj?.fulfillment_id) {
            let itemkey = `flfillmentErr${i}`;
            initObj[
              itemkey
            ] = `Fulfillment id '${fulfillment.id}' for item with id '${item.id}' does not match with the catalog provided in /on_search`;
          } else {
            let bppfulfillment = bppFulfillmentsArr?.find(
              (element) => element?.id === fulfillment?.id
            );
            if (fulfillment?.type !== bppfulfillment?.type) {
              let itemkey = `flfillmentTypeErr${i}`;
              initObj[
                itemkey
              ] = `Fulfillment type '${fulfillment.type}' for fulfillment id '${fulfillment.id}' does not match with the catalog provided in /on_search`;
            }
          }
        });
      }
      itemExists = false;
    });

    if (cod_order) {
      if (COD_ITEM && !initItemId.includes(COD_ITEM[0]?.id)) {
        initObj.codOrderItemErr = `Item with id '${COD_ITEM[0]?.id}' does not exist in /init when order type is COD`;
      }
      // COD_ITEM?.forEach((item) => {
      //   if (!initItemId.includes(item?.id)) {
      //     initObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /init when order type is COD`;
      //   }
      // });
    }
  } catch (error) {
    console.log(
      `!!Error while checking items array in /${constants.log_INIT}`,
      error?.stack
    );
  }
  dao.setValue("p2h2p", p2h2p);
  return initObj;
};
module.exports = checkInit;
