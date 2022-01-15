const mongoose = require('mongoose');
const { MODEL_NAMES } = require('./_utils');

const Schema = mongoose.Schema;

const _schema = new Schema({
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    device: {
      type: String,
      default: ''
    },
  }]
}, { timestamps: true });

module.exports = mongoose.model(MODEL_NAMES.user, _schema);
