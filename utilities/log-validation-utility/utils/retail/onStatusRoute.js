const checkUnsolicited = () => {
  // checkPending="on_status_pending"
  // checkPicked
  // CheckDelivered
};

// Pending
// onconfirm<
// order state ->accepted /created
// context.timestamp->dao

// Picked
// pending< or onconfirm<
//timestamp order picked (start.tmpstmp<=cntxt.tmpstmp && order_updated_at)
//order state->In-progress

//delivered
//picked< or pending< or on_confirm<
//start timestamp->picked.start | pending< | onconfirm<  && <orderdelviered.timestamp

//delivery timestamp-> end.timestamp<=cntxt.tmpstmp
// order state->completed
//updated_at=context.timestamp

module.exports = {};

checkPending = () => {
  checkonstatus("");
};
