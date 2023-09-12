module.exports = {
  action: {
    formats: [
      {
        val: "[controller=",
        func: "changeController",
      },
      {
        val: "[controller]",
        func: "setController",
      },
      {
        val: "[action]",
        func: "setDefault",
      },
      {
        val: "[action=",
        func: "changeDefault",
      },
      // {
      //   val: ":",
      //   func: "setDaynamicParam",
      // },
    ],
  },
  controller: {
    formats: [
      {
        val: "controller=",
        func: "changeDefault",
      },
      {
        val: "[controller]",
        func: "setDefault",
      },
      // {
      //   val: "[action]",
      //   func: "setAction",
      // },
    ],
  },
};
