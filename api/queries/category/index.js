const Category = require("../../models/category");
const { ForbiddenError } = require("apollo-server-express");

module.exports = {
  categories: async (_p, _i, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    let filters = {
      createdBy: currentUser.id,
    };

    try {
      const result = await Category.find(filters);
      // console.log(`result: `, result)
      return result;
    } catch (e) {
      console.log(`e: `, e);
      throw e;
    }
  },
  category: async (_p, { id }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    let filters = { _id: id, createdBy: currentUser.id };
    try {
      const category = await Category.findOne(filters);
      return category;
    } catch (error) {
      throw error;
    }
  },
};