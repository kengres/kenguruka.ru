const User = require("../../models/user");
const Depense = require("../../models/depense");
const Category = require("../../models/category");
const Currency = require("../../models/currency");

module.exports = {
  users: async (__, ___, { currentUser }) => {
    // if (!currentUser || !currentUser.roles.includes("ADMIN")) {
    //   throw new ForbiddenError("Unauthorized!");
    // }
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return users;
    } catch (error) {
      throw error;
    }
  },
  user: async (__, { id }, { currentUser }) => {
    // if (!currentUser || !currentUser.roles.includes("ADMIN")) {
    //   throw new ForbiddenError("Unauthorized!");
    // }
    if (!currentUser) {
      throw new ForbiddenError("Unauthorized!");
    }
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  },
  userCounts: async (__, ___, { currentUser }) => {
    if (!currentUser || !currentUser.active) {
      throw new ForbiddenError("Unauthorized!");
    }
    try {
      const filters = {
        createdBy: currentUser.id
      }
      const promises = [
        Depense.countDocuments(filters),
        Category.countDocuments(filters),
        Currency.countDocuments(filters),
      ]
      const [depenses, categories, currencies] = await Promise.all(promises)
      return { depenses, categories, currencies };
    } catch (error) {
      throw error;
    }
  },
  me: async (_p, _input, { currentUser, reqUrl }) => {
    // console.log(`[ME] reqUrl: `, reqUrl);
    // console.log(`[ME] currentUser: `, currentUser && currentUser.name);
    if (!currentUser) {
      // todo: if (!authorizedUrls.includes(reqUrl)) {
      //   throw new AuthenticationError("Unauthorized!");
      // }
      return null;
    }
    // console.log(`___________getting me_________`);
    return currentUser;
  },
};
