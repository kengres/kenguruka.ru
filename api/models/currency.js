const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currencySchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  abbreviation: {
    type: String,
    default: ""
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model('Currency', currencySchema);
