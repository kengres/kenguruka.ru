const Depense = require('../../models/depense');
const Currency = require('../../models/currency');
const Category = require('../../models/category');
const { each: _each } = require("lodash")
const { UserInputError, ForbiddenError } = require('apollo-server-express');

module.exports = {
  createDepense: async (_p, input, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    const { name, notes, amount = 1, currencyId, categoryId, date } = input;
    console.log(`categoryId`, categoryId);
    if (!name || !currencyId) {
      throw new UserInputError("Invalid Data! name, currency: required!");
    }
    try {
      const currency = await Currency.findOne({ _id: currencyId, createdBy: currentUser.id });
      if (!currency) {
        throw new UserInputError("Invalid Currency!");
      }
      let category;
      if (categoryId) {
        category = await Category.findOne({ _id: categoryId, createdBy: currentUser.id });
      }

      const newItem = new Depense({
        name,
        notes,
        amount,
        currency: currencyId,
        category: category && category.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      });

      if (date) {
        newItem.date = date;
      }

      await newItem.save();
      return newItem;
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  updateDepense: async (_p, input, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    const { id, name, notes, amount, currencyId, categoryId, date } = input;
    if (!id) {
      throw new UserInputError("Invalid Data! id is required!");
    }
    try {
      const item = await Depense.findById(id);
      if (!item) {
        throw Error("Depense Not Found!");
      }
      if (currencyId) {
        const currency = await Currency.findOne({ _id: currencyId, createdBy: currentUser.id });
        if (!currency) {
          throw new UserInputError("Invalid Currency!");
        }
      }
      if (categoryId) {
        const category = await Category.findOne({ _id: categoryId, createdBy: currentUser.id });
        if (category) {
          item.category = category.id;
        }
      }
      item.currency = currencyId;
      _each({ notes, amount, name }, (value, key) => {
        if (value) {
          item[key] = value;
        }
      });
      if (date) {
        item.date = date;
      }
      item.updatedBy = currentUser.id;
      return await item.save();
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  deleteDepense: async (_p, { id }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!id) {
      throw new UserInputError("Invalid Data!");
    }
    try {
      return await Depense.findOneAndDelete({ _id: id, createdBy: currentUser.id });
    } catch (error) {
      console.log(`delete error`, error);
      throw error;
    }
  },
};
