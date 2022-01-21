const mongoose = require('mongoose');
const { MODEL_NAMES } = require('./_utils');

const Schema = mongoose.Schema;

const _schema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    abbreviation: {
      type: String,
      default: "",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    rates: [
      {
        amount: {
          type: Number,
          default: 1,
        },
        currencyTo: {
          type: Schema.Types.ObjectId,
          ref: MODEL_NAMES.currency,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.user,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.user,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODEL_NAMES.currency, _schema);
