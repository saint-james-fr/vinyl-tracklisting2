const autoprefixer = require("autoprefixer");
const flexbug = require("postcss-flexbugs-fixes");
const logical = require("postcss-logical");
const focus = require("postcss-focus-within");

module.exports = {
  plugins: [
    autoprefixer,
    flexbug,
    logical,
    focus
  ]
};
