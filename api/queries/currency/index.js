const Currency = require("../../models/currency");
const { ForbiddenError } = require("apollo-server-express");

module.exports = {
  currencies: async (_p, _i, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    let filters = {};

    try {
      const result = await Currency.find(filters);
      // console.log(`result: `, result)
      return result;
    } catch (e) {
      console.log(`e: `, e);
      throw e;
    }
  },
  currency: async (_p, { id }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    let filters = { _id: id, createdBy: currentUser.id };
    try {
      const currency = await Currency.findOne(filters);
      return currency;
    } catch (error) {
      throw error;
    }
  },
};