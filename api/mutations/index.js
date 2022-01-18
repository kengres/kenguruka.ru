const category = require("./category");
const currency = require("./currency");
const depense = require("./depense");
const user = require("./user");

module.exports = {
  ...category,
  ...currency,
  ...depense,
  ...user,
};