const mongoose = require('mongoose');
const { MODEL_NAMES } = require('./_utils');

const Schema = mongoose.Schema;

const _schema = new Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    stats: {
      type: Object,
    },
    tokens: [
      {
        token: {
          type: String,
          default: "",
        },
        ipAddress: {
          type: String,
          default: "",
        },
        device: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODEL_NAMES.user, _schema);
