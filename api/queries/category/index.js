const Category = require("../../models/category");

module.exports = {
  categories: async (_p, _i) => {
    let filters = {}
    
    try {
      const result = await Category.find(filters)
      // console.log(`result: `, result)
      return result
    } catch (e) {
      console.log(`e: `, e)
      throw e;
    }
  },
  category: async (_p, { id }) => {
    // console.log(`category query, id: ${id}`);
    let filters = { _id: id }
    try {
      const category = await Category.findOne(filters)
      return category
    } catch (error) {
      throw (error);
    }
  },
}