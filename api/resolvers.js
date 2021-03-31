const Query = require("./queries")
const Mutation = require("./mutations")
const queryExt = require("./queries/extended")

module.exports = {
  Query,
  Mutation,
  ...queryExt,
}