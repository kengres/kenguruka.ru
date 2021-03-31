const Currency = require("../../models/currency");

module.exports = {
  currencies: async (_p, _i) => {
    console.log(`[CURRENCIES] list`);
    let filters = {}
    
    try {
      const result = await Currency.find(filters)
      console.log(`result: `, result)
      return result
    } catch (e) {
      console.log(`e: `, e)
      throw e;
    }
  },
  currency: async (_p, { id }) => {
    let filters = { _id: id }
    try {
      const currency = await Currency.findOne(filters)
      return currency
    } catch (error) {
      throw (error);
    }
  },
}