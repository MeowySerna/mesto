const presets = [
  [
    "@babel/env",
    {
      targets: {
        ie: "11",
        chrome: "64",
      },
      useBuiltIns: "entry",
    },
  ],
];
module.exports = {presets};
