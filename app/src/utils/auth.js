import jwtDecode from "jwt-decode";

const tokenHasValidData = (dtkn) => (!!dtkn && !!dtkn.userId) || !!dtkn.exp || !!dtkn.iat;

const tokenExpired = (decodedToken) => {
  return Date.now() > new Date(decodedToken.exp * 1000).getTime();
};

export const validateToken = (token, name) => {
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    // console.log(`error decoding: `, e);
    return false;
  }
  // console.log(`[validate] ${name} exp: `, dateStringFilter(decoded.exp * 1000));
  console.log(`[validate] ${name} expired: `, tokenExpired(decoded));
  return token && tokenHasValidData(decoded) && !tokenExpired(decoded);
};

const isValidToken = (decodedToken) => {
  return tokenHasValidData(decodedToken);
};

export const getTokenInfo = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      decodable: true,
      valid: isValidToken(decoded),
      expired: tokenExpired(decoded),
    };
  } catch (e) {
    return {
      decodable: false,
    };
  }
};
