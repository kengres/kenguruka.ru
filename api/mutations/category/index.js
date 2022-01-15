const Category = require('../../models/category');
const { each: _each } = require("lodash")
const { UserInputError, ForbiddenError } = require('apollo-server-express');

module.exports = {
  createCategory: async (_p, { name }) => {
    if (!name) {
      throw new UserInputError('Invalid Data! name is required!')
    }
    try {
      const newItem = new Category({
        name,
      })
      await newItem.save()
      return newItem
    } catch (error) {
      console.log('error create One:', error)
      throw error
    }
  },
  updateCategory: async (_p, { id, name }) => {
    if (!id) {
      throw new UserInputError('Invalid Data! id is required!')
    }
    try {
      const item = await Category.findById(id);
      if (!item) {
        throw Error('Category Not Found!');
      }
      _each({ name }, (value, key) => {
        if (value) {
          item[key] = value
        }
      })
      return await item.save()
    } catch (error) {
      console.log('error create One:', error)
      throw error
    }
  },
  deleteCategory: async (_p, { id }) => {
    if (!id) {
      throw new UserInputError('Invalid Data!')
    }
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      console.log(`delete error`, error)
      throw error;
    }
  }
}
