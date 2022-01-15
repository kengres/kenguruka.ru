const User = require("../../models/user");
const Currency = require("../../models/currency");
const Category = require("../../models/category");
const { Types: { ObjectId } } = require('mongoose')

const dateToString = date => {
  if (!date) return "";
  return new Date(date).toISOString();
};


const isValidObjectId = id => {
  return ObjectId.isValid(id) && (new ObjectId(id)).equals(id);
}

const isInstance = (obj, Model) => obj instanceof Model

module.exports = {
  createdAt: (parent, input, ctx) => {
    return dateToString(parent.createdAt)
  },
  updatedAt: (parent, input, ctx) => {
    return dateToString(parent.updatedAt)
  },
  createdBy: async (_parent, _input, { currentUser }) => {
    // if (!currentUser) return null
    try {
      if (_parent.createdBy) {
        if (isInstance(_parent.createdBy, User)) {
          return _parent.createdBy
        }
        if (isValidObjectId(_parent.createdBy)) {
          return await User.findById(_parent.createdBy)
        }
      }
      return null
    } catch (error) {
      console.log(`error created by: `, error)
      return null
    }
  },
  currency: async (_parent, _input,) => {
    // if (!currentUser) return null
    try {
      if (_parent.currency) {
        if (isInstance(_parent.currency, Currency)) {
          return _parent.currency
        }
        if (isValidObjectId(_parent.currency)) {
          return await Currency.findById(_parent.currency)
        }
      }
      return null
    } catch (error) {
      console.log(`error created by: `, error)
      return null
    }
  },
  category: async (_parent, _input,) => {
    // if (!currentUser) return null
    // console.log(`_parent`, _parent)
    try {
      if (_parent.category) {
        if (isInstance(_parent.category, Category)) {
          return _parent.category
        }
        if (isValidObjectId(_parent.category)) {
          return await Category.findById(_parent.category)
        }
      }
      return null
    } catch (error) {
      console.log(`error created by: `, error)
      return null
    }
  },
  displayedAmount: async (_parent, _input,) => {
    // if (!currentUser) return null
    try {
      if (_parent.currency) {
        if (isInstance(_parent.currency, Currency)) {
          return `${_parent.amount} ${_parent.currency.abbreviation}`;
        }
        if (isValidObjectId(_parent.currency)) {
          const currency = await Currency.findById(_parent.currency)
          return `${_parent.amount} ${currency.abbreviation}`;
        }
      }
      return null
    } catch (error) {
      console.log(`error created by: `, error)
      return null
    }
  },
  updatedBy: async (_parent, _input, { currentUser }) => {
    if (!currentUser) return null
    if (_parent.updatedBy) {
      if (isInstance(_parent.updatedBy, User)) {
        return _parent.updatedBy
      }
      if (isValidObjectId(_parent.updatedBy)) {
        return await User.findById(_parent.updatedBy)
      }
    }
    return null
  },
}