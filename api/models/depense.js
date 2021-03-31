const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const depenseSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  notes: {
    type: String,
    default: ""
  },
  amount: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: String(Date.now)
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: "Currency",
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

module.exports = mongoose.model('Depense', depenseSchema);
