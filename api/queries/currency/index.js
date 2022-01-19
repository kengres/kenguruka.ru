const Currency = require("../../models/currency");
const { ForbiddenError } = require("apollo-server-express");

module.exports = {
  currencies: async (_p, _i, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    let filters = {
      createdBy: currentUser.id,
    };

    try {
      let result = await Currency.find(filters);
      if (result.length === 0) {
        // todo: customize by lang and country
        const newCurr = new Currency({
          name: "Burundian Franc",
          abbreviation: "BIF",
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        });
        await newCurr.save() 
        result = await Currency.find(filters);
      }
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