const Category = require('../../models/category');
const { each: _each } = require("lodash")
const { UserInputError, ForbiddenError } = require('apollo-server-express');

module.exports = {
  createCategory: async (_p, { name }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!name) {
      throw new UserInputError("Invalid Data! name is required!");
    }
    try {
      const exist = await Category.exists({
        name,
        createdBy: currentUser.id
      });
      if (exist) {
        throw new UserInputError('Category with same name exits!')
      }
      const newItem = new Category({
        name,
        createdBy: currentUser.id,
      });
      await newItem.save();
      return newItem;
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  updateCategory: async (_p, { id, name }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!id) {
      throw new UserInputError("Invalid Data! id is required!");
    }
    try {
      const item = await Category.findById(id);
      if (!item) {
        throw Error("Category Not Found!");
      }
      _each({ name }, (value, key) => {
        if (value) {
          item[key] = value;
        }
      });
      item.updatedBy = currentUser.id;
      return await item.save();
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  deleteCategory: async (_p, { id }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!id) {
      throw new UserInputError("Invalid Data!");
    }
    try {
      return await Category.findOneAndDelete({
        _id: id,
        createdBy: currentUser.id,
      });
    } catch (error) {
      console.log(`delete error`, error);
      throw error;
    }
  },
};
