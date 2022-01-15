const mongoose = require('mongoose');
const { MODEL_NAMES } = require('./_utils');

const Schema = mongoose.Schema;

const _schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.user,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.user,
  },
}, { timestamps: true });

module.exports = mongoose.model(MODEL_NAMES.category, _schema);
