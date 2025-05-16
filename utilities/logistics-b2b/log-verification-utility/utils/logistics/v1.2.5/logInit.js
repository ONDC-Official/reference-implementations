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
          fulfillment?.tags?.forEach((item) => {
            if (item?.code === "linked_provider") {
              dao.setValue("init_linked_provider", item);
            }
          });
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
      COD_ITEM?.forEach((item) => {
        if (!initItemId.includes(item?.id)) {
          initObj.codOrderItemErr = `Item with id '${item.id}' does not exist in /init when order type is COD`;
        }
      });
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
