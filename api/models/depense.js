const mongoose = require('mongoose');
const { MODEL_NAMES } = require('./_utils');

const Schema = mongoose.Schema;

const _schema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.currency,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.category,
    },
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

module.exports = mongoose.model(MODEL_NAMES.depense, _schema);
