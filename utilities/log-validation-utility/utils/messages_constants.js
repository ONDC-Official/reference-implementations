module.exports = getLspIssueMessage = (endpoint) => {
  return {
    transaction_id_issue_message: `Transaction Id should be the id from the logistics transaction id in /${endpoint} api. It should not be of the retail transactions that is being used for retail`,
    order_details_issue_message: `Items array should be included in order_details object when the issue_category is ITEM /${endpoint} api.`,
    quantity_issue_message: `Each Item must have quantity attribute when the issue_category is ITEM /${endpoint} api.`,
    respondent_action_required: `At least one respondent action is required to have actions as CASCADED /${endpoint} api.`,
    imageMendatory: `issue/description/images are mandatory for issue sub_category in ${endpoint}`,
    phone_issue_message: `Phone Number for /${endpoint} api is not in the valid Range`,
    bap_id: `Seller app's subscriber id should be bap_id in the context of /${endpoint} api when on_issue comes from logistics provider`,
    bap_uri: `Seller app's subscriber uri should be bap_uri in the context of /${endpoint} api when on_issue comes from logistics provider`,
    updatedAtInRespondentAction: `updated_at of last respondent_action should be the same in the message/issue/update_at in the ${endpoint}`,
    updatedAtInComplainentAction: `updated_at of last complainent_action should be the same in the message/issue/update_at in the ${endpoint}`,
    resolution_provider: `When the latest respondent_action is "RESOLVED", the resolution_provider object is mandatory /${endpoint} api.`,
    respondent_info: `When the latest respondent_action is "RESOLVED", in the resolution_provider object, respondent_info type should be CASCADED-COUNTERPARTY-NP /${endpoint} api from logistics.`,
    organization_name: `Organization's Name for /${endpoint} api mismatched with bap id`,
    domain: `Domain of organization for /${endpoint} api mismatched with domain in context`,
  };
};
