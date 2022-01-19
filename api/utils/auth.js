const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getUserByToken = async (token) => {
  // console.log(`[GETUSERBYTOKEN], have token: `, !!token)
  // console.log(`[GETUSERBYTOKEN], token secret: `, process.env.TOKEN_STRING_SECRET)
  if (!token) return null;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_STRING_SECRET);
    // console.log(`[GETUSERBYTOKEN], decodedToken: `, decodedToken);
    if (!decodedToken) {
      return null;
    }
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(`[GETUSERBYTOKEN], error: `, error);
    throw error;
  }
}

module.exports.getUserByToken = getUserByToken;

const getUserDataFromReq = async (req) => {
  let authToken = null;
  let currentUser = null;
  const reqUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  // console.log(`reqUrl`, reqUrl)
  // console.log(`secret`, process.env.TOKEN_STRING_SECRET)
  // console.log(`req.headers`, req.headers)

  // * FROM NGINX MIDDLEWARE
  const reqIp = req.headers["x-real-ip"] || req.socket.remoteAddress;

  const authHeader = req.headers.authorization || "";
  const refreshToken = req.cookies && req.cookies["ytt-rfr-token"];

  if (authHeader) {
    try {
      // todo validate BEARER
      authToken = authHeader.split(" ")[1];
      // console.log(`authToken`, authToken)
      if (authToken) {
        currentUser = await getUserByToken(authToken);
      }
    } catch (e) {
      // console.log(`error auth: `, e)
    }
  }
  return {
    authToken,
    refreshToken,
    currentUser,
    reqUrl,
    reqIp,
  };
}

module.exports.getUserDataFromReq = getUserDataFromReq;
