module.exports = {
  $id: "http://example.com/schema/masterSchema",
  type: "object",
  properties: {
    search: {
      type: "array",
      items: {
        $ref: "searchSchema#",
      },
    },
    on_search: {
      type: "array",
      items: {
        $ref: "onSearchSchema#",
      },
    },
    select: {
      type: "array",
      items: {
        $ref: "selectSchema#",
      },
    },
    on_select: {
      type: "array",
      items: {
        $ref: "onSelectSchema#",
      },
    },
    init: {
      type: "array",
      items: {
        $ref: "initSchema#",
      },
    },
    on_init: {
      type: "array",
      items: {
        $ref: "onInitSchema#",
      },
    },
    confirm: {
      type: "array",
      items: {
        $ref: "confirmSchema#",
      },
    },
    on_confirm: {
      type: "array",
      items: {
        $ref: "onConfirmSchema#",
      },
    },
    status: {
      type: "array",
      items: {
        $ref: "statusSchema#",
      },
    },
    on_status: {
      type: "array",
      items: {
        $ref: "onStatusSchema#",
      },
    },
    cancel: {
      type: "array",
      items: {
        $ref: "cancelSchema#",
      },
    },
    on_cancel: {
      type: "array",
      items: {
        $ref: "onCancelSchema#",
      },
    }
  },
};
