const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkConfirm = (data, msgIdSet) => {
  let search = dao.getValue("searchObj");
  let onInit = dao.getValue("onInitObj");
  let init = dao.getValue("initObj");

  onInitTags = onInit.tags;
  const bppTermsTag = onInitTags.find((tag) => tag.code === "BPP_Terms");
  let confirmObj = {};

  if (!bppTermsTag) {
    confirmObj["bppTermsNotFound"] = "BPP_Terms tag not found in onInit tags";
  }

  // Transform the BPP_Terms tag into the desired format
  const transformedBPPTerms = {
    descriptor: {
      code: "BPP_Terms",
    },
    list: bppTermsTag.list.map((item) => ({
      descriptor: {
        code: item.code,
      },
      value: item.value,
    })),
  };

  let confirm = data;
  confirm = confirm.message.order;
  /**
   * Checks if tags are the same between /search and /confirm responses.
   *
   * @param {Object} search - The search response object.
   * @param {Object} confirm - The confirm response object.
   * @param {Object} transformedBPPTerms - The transformed BPP terms to be added to search tags.
   * @param {Object} confirmObj - The object to store any discrepancies found.
   */
  try {
    console.log("Checking if tags are same between /search and /confirm");
    let searchTags = search?.tags;
    let confirmTags = confirm?.tags;
    let confirmPayment = confirm?.payments;
    searchTags.push(transformedBPPTerms);
    searchTags.forEach((searchTag) => {
      const matchingConfirmTag = confirmTags.find(
        (confirmTag) =>
          confirmTag?.descriptor?.code === searchTag?.descriptor?.code
      );

      if (!matchingConfirmTag) {
        confirmObj[
          `missingTagErr_${searchTag?.descriptor?.code}`
        ] = `Tag with code ${searchTag?.descriptor?.code} from search is missing in confirm tags`;
        return;
      }

      // Compare the list arrays
      if (searchTag?.list?.length !== matchingConfirmTag?.list?.length) {
        confirmObj[
          `tagListLengthMismatchErr_${searchTag?.descriptor?.code}`
        ] = `Tag with code ${searchTag?.descriptor?.code} has different number of list items in search and confirm`;
        return;
      }

      searchTag?.list?.forEach((searchListItem, index) => {
        const confirmListItem = matchingConfirmTag?.list[index];

        if (
          !_.isEqual(searchListItem?.descriptor, confirmListItem?.descriptor)
        ) {
          confirmObj[
            `tagListDescriptorMismatchErr_${searchTag?.descriptor?.code}_${searchListItem?.descriptor?.code}`
          ] = `Descriptor mismatch for list item in tag ${searchTag?.descriptor?.code}, list item code ${searchListItem?.descriptor?.code}`;
        }

        if (searchListItem?.value !== confirmListItem?.value) {
          confirmObj[
            `tagListValueMismatchErr_${searchTag?.descriptor?.code}_${searchListItem?.descriptor?.code}`
          ] =
            `Value mismatch for list item in tag ${searchTag?.descriptor?.code}, list item code ${searchListItem?.descriptor?.code}. ` +
            `Search value: ${searchListItem?.value}, Confirm value: ${confirmListItem?.value}`;
        }
      });
    });
  } catch (e) {
    console.log("Error while checking tags between /search and /confirm");
    console.error(e);
  }

  try {
    console.log("Validating quote in /confirm with quote received in /onInit");
    /**
     * Compares two fields and adds an entry to confirmObj if there is a mismatch.
     * @param {string} fieldName - The name of the field to store the mismatch in confirmObj.
     * @param {any} confirmValue - The value of the field from the /confirm response.
     * @param {any} onInitValue - The value of the field from the /onInit response.
     */
    function compareFields(fieldName, confirmValue, onInitValue) {
      if (confirmValue !== onInitValue) {
        confirmObj[fieldName] = `Mismatch: ${confirmValue} != ${onInitValue}`;
      }
    }
    let confirmQuote = confirm?.quote;
    let onInitQuote = onInit?.quote;
    // Compare price
    compareFields(
      "price.currency",
      confirmQuote?.price?.currency,
      onInitQuote?.price?.currency
    );
    compareFields(
      "price.value",
      confirmQuote?.price?.value,
      onInitQuote?.price?.value
    );

    // Compare breakup length
    if (confirmQuote?.breakup?.length !== onInitQuote?.breakup?.length) {
      confirmObj[
        "breakup_length"
      ] = `Mismatch: ${confirmQuote?.breakup?.length} != ${onInitQuote?.breakup?.length}`;
    } else {
      // Compare each item in breakup
      for (let i = 0; i < confirmQuote?.breakup?.length; i++) {
        let confirmBreakup = confirmQuote?.breakup[i];
        let onInitBreakup = onInitQuote?.breakup[i];

        compareFields(
          `breakup[${i}].item.id`,
          confirmBreakup?.item?.id,
          onInitBreakup?.item?.id
        );
        compareFields(
          `breakup[${i}].title`,
          confirmBreakup?.title,
          onInitBreakup?.title
        );
        compareFields(
          `breakup[${i}].price.currency`,
          confirmBreakup?.price?.currency,
          onInitBreakup?.price?.currency
        );
        compareFields(
          `breakup[${i}].price.value`,
          confirmBreakup?.price?.value,
          onInitBreakup?.price?.value
        );
      }
    }

    // Compare ttl
    compareFields("ttl", confirmQuote?.ttl, onInitQuote?.ttl);
  } catch (error) {
    console.error("An error occurred during validation:", error);
  }

  try {
    console.log("Checking created_at and updated_at in /confirm");
    let createdAt = confirm?.created_at;
    let updatedAt = confirm?.updated_at;

    if (createdAt !== updatedAt) {
      confirmObj["createdAtUpdatedAtErr"] =
        "created_at and updated_at are not same";
    }
  } catch (error) {
    console.error(
      "Error occured while checking created_at and updated_at in /confirm"
    );
  }

  try {
    const validatePayments = confirmPayment?.some((payment) => {
      return (
        payment?.type === "ON-ORDER" &&
        payment?.collected_by === "BAP" &&
        !payment?.params?.transaction_id
      );
    });

    if (validatePayments) {
      confirmObj["payment_transaction_id_err"] =
        "transaction_id is missing in payment params if collector is BAP";
    }
  } catch (error) {
    console.error("Error occured while checking confirm payment array");
  }

  dao.setValue("confirmObj", confirm);
  return confirmObj;
};

module.exports = checkConfirm;
