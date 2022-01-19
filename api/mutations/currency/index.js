const Currency = require('../../models/currency');
const { each: _each } = require("lodash")
const { UserInputError, ForbiddenError } = require('apollo-server-express');

module.exports = {
  createCurrency: async (_p, { name, abbreviation }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!name) {
      throw new UserInputError("Invalid Data! name is required!");
    }
    try {
      const newItem = new Currency({
        name,
        abbreviation,
      });
      await newItem.save();
      return newItem;
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  updateCurrency: async (_p, { id, name, abbreviation }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!id) {
      throw new UserInputError("Invalid Data! id is required!");
    }
    try {
      const item = await Currency.findById(id);
      if (!item) {
        throw Error("Currency Not Found!");
      }
      _each({ abbreviation, name }, (value, key) => {
        if (value) {
          item[key] = value;
        }
      });
      item.updatedBy = currentUser.id
      return await item.save();
    } catch (error) {
      console.log("error create One:", error);
      throw error;
    }
  },
  deleteCurrency: async (_p, { id }, { currentUser }) => {
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    if (!id) {
      throw new UserInputError("Invalid Data!");
    }
    try {
      return await Currency.findOneAndDelete({ _id: id, createdBy: currentUser.id });
    } catch (error) {
      console.log(`delete error`, error);
      throw error;
    }
  },
};
