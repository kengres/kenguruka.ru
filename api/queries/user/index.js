const User = require("../../models/user");

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
};
