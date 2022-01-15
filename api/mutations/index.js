const category = require("./category");
const currency = require("./currency");
const depense = require("./depense");

module.exports = {
  ...category,
  ...currency,
  ...depense,
};