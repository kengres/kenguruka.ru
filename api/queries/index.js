const depense = require("./depense");
const currency = require("./currency");
const category = require("./category");

module.exports = {
  ...depense,
  ...currency,
  ...category,
};