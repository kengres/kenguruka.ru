const Depense = require("../../models/depense");

module.exports = {
  depenses: async (_p, _i) => {
    // console.log(`[DEPENSES] list`);
    let filters = {}
    
    try {
      const result = await Depense.find(filters).sort("-createdAt")
      // console.log(`result: `, result)
      return result
    } catch (e) {
      console.log(`e: `, e)
      throw e;
    }
  },
  depense: async (_p, { id }) => {
    let filters = { _id: id }
    try {
      const depense = await Depense.findOne(filters)
      return depense
    } catch (error) {
      throw (error);
    }
  },
}