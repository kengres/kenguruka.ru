const Depense = require('../../models/depense');
const Currency = require('../../models/currency');
const Category = require('../../models/category');
const { each: _each } = require("lodash")
const { UserInputError, ForbiddenError } = require('apollo-server-express');

module.exports = {
  createDepense: async (_p, input) => {
    const { name, notes, amount = 1, currencyId, categoryId } = input;
    console.log(`categoryId`, categoryId)
    if (!name || !currencyId) {
      throw new UserInputError('Invalid Data! name, currency: required!')
    }
    try {
      const currency = await Currency.findById(currencyId);
      if (!currency) {
        throw new UserInputError('Invalid Currency!')
      }
      let category;
      if (categoryId) {
        category = await Category.findById(categoryId)
      }
      
      const newItem = new Depense({
        name,
        notes,
        amount,
        currency: currencyId,
        category: category && category.id,
      });

      await newItem.save()
      return newItem
    } catch (error) {
      console.log('error create One:', error)
      throw error
    }
  },
  updateDepense: async (_p, { id, name, notes, amount, currencyId }) => {
    if (!id) {
      throw new UserInputError('Invalid Data! id is required!')
    }
    try {
      const item = await Depense.findById(id);
      if (!item) {
        throw Error('Depense Not Found!');
      }
      if (currencyId) {
        const currency = Currency.findById(currencyId);
        if (!currency) {
          throw new UserInputError('Invalid Currency!')
        }
      }
      item.currency = currencyId
      _each({ notes, amount, name }, (value, key) => {
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
  deleteDepense: async (_p, { id }) => {
    if (!id) {
      throw new UserInputError('Invalid Data!')
    }
    try {
      return await Depense.findByIdAndDelete(id);
    } catch (error) {
      console.log(`delete error`, error)
      throw error;
    }
  }
}
