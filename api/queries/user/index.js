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
  me: async (_p, _input, { currentUser, reqUrl }) => {
    // console.log(`[ME] reqUrl: `, reqUrl);
    console.log(`[ME] currentUser: `, currentUser && currentUser.name);
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
