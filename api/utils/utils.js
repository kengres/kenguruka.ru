const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9])*$/,
  phone: /^\+?\d*$/,
  code: /^[a-zA-Z0-9]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00A1-\uFFFF0-9]-*)*[a-z\u00A1-\uFFFF0-9]+)(?:\.(?:[a-z\u00A1-\uFFFF0-9]-*)*[a-z\u00A1-\uFFFF0-9]+)*(?:\.(?:[a-z\u00A1-\uFFFF]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
};

const isValidEmail = (v) => {
  return !!v && typeof v === "string" && v.length > 4 && regex.email.test(v);
};
module.exports.isValidEmail = isValidEmail;

const isValidCode = (v) => {
  return !!v && typeof v === "string" && v.length === 7 && regex.code.test(removeMinusToCode(v));
};
module.exports.isValidCode = isValidCode;

const addMinusToCode = (code) => {
  return code.slice(0, 3) + "-" + code.slice(3);
};
module.exports.addMinusToCode = addMinusToCode;

const removeMinusToCode = (code) => {
  return code.slice(0, 3) + code.slice(4);
};
module.exports.removeMinusToCode = removeMinusToCode;

const isValidPassword = (v) => {
  return !!v && typeof v === "string"; /* && regex.password.test(v) */
};
module.exports.isValidPassword = isValidPassword;

const isValidUsername = (v) => {
  return !!v && typeof v === "string" && regex.username.test(v);
};
module.exports.isValidUsername = isValidUsername;

const dateToIsoString = (date) => {
  if (!date) return "";
  return new Date(date).toISOString();
};

module.exports.dateToIsoString = dateToIsoString;

const getUniqueRandomString = () => {
  return Math.random().toString(36) + Date.now().toString(36) + Math.random().toString(36);
};

module.exports.getUniqueRandomString = getUniqueRandomString;

// todo add more phone validation
const isValidPhone = (phone) => {
  return !!phone && phone.length > 7 && regex.phone.test(phone);
};

module.exports.isValidPhone = isValidPhone;

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

module.exports.onlyUnique = onlyUnique;

const transformPhone = (phone = "") => {
  if (phone.startsWith("+257")) return phone;
  return `+257${phone}`;
};

module.exports.transformPhone = transformPhone;