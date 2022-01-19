const depense = require("./depense");
const currency = require("./currency");
const category = require("./category");
const user = require("./user");

module.exports = {
  ...depense,
  ...currency,
  ...category,
  ...user,
};