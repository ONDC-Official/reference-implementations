const _ = require('lodash');
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");
const { reverseGeoCodingCheck } = require("../reverseGeoCoding");

const checkOnSearch = async (data, msgIdSet) => {
    let onSearch = data;
    onSearch = onSearch.message.catalog;
    dao.setValue("onSearchObj", onSearch);
    return {};
};