const { Types: { ObjectId } } = require('mongoose');
const Currency = require("../../models/currency");

const isValidObjectId = id => {
  return ObjectId.isValid(id) && (new ObjectId(id)).equals(id);
}

module.exports = {
  currencyTo: async (parent, input, ctx) => {
    return await Currency.findById(parent.currencyTo)
  },
};