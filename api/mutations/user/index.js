const { UserInputError } = require('apollo-server-express');
const { isValidPhone, isValidEmail, isValidPassword, transformPhone, isValidCode } = require('../../utils/utils');
const User = require('../../models/user')
const Depense = require('../../models/depense')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { getUniqCode, sendEmail } = require('../../utils/sendgrid');
const { sendSmsCodeToClient } = require('../../utils/twilio');

const token_key = process.env.TOKEN_STRING_SECRET;
const refresh_token_key = process.env.REFRESH_TOKEN_STRING_SECRET;
const tokenExpTime = "7d";
const refreshTokenExpTime = "14d";

module.exports = {
  createAccount: async (__, { name, username, password }) => {
    if (!username || !password) {
      throw new UserInputError("username and password are required!");
    }
    // * MODE
    const isPhoneMode = isValidPhone(username);
    const isEmailMode = !isPhoneMode && isValidEmail(username);
    if (!isPhoneMode && !isEmailMode) {
      throw new UserInputError(`Invalid email or password!`);
    }

    if (!isValidPassword(password)) {
      throw new UserInputError("Invalid password!");
    }
    try {
      let newUser = await User.findOne({ username });
      if (newUser && newUser.verified) {
        console.log(`user with same found:`);
        throw new UserInputError(`User with same ${isPhoneMode ? "phone number" : "email"} already exists!`);
      }
      // PASSWORD ENCRYPTION
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      if (!newUser) {
        newUser = new User({
          username,
          active: true,
          name,
        });
      }
      newUser.password = hashedPass;
      // * First save
      await newUser.save();

      // SEND EMAIL OR SMS
      // todo: check not to send many emails in one day
      if (isEmailMode) {
        try {
          const uniqCode = getUniqCode();
          await sendEmail(username, uniqCode);
          newUser.stats = {
            ...newUser.stats,
            verificationEmailSent: true,
            verificationCode: uniqCode,
            codeIat: Math.floor(Date.now() / 1000),
            codeExpAt: Date.now() + (2 + 0.5) * 60 * 1000,
          };
        } catch (error) {
          newUser.stats = {
            ...newUser.stats,
            verificationEmailSent: false,
            verificationEmailError: error && error.toString(),
          };
        }
      }
      if (isPhoneMode) {
        try {
          const uniqCode = getUniqCode();
          await sendSmsCodeToClient(transformPhone(username), uniqCode);
          newUser.stats = {
            ...newUser.stats,
            verificationPhoneSent: true,
            verificationSms: uniqCode,
            codeSmsIat: Math.floor(Date.now() / 1000),
            codeSmsExpAt: Date.now() + (2 + 0.5) * 60 * 1000,
          };
        } catch (error) {
          newUser.stats = {
            ...newUser.stats,
            verificationPhoneSent: false,
            verificationPhoneError: error && error.toString(),
          };
        }
      }
      await newUser.save();
      return "ok";
    } catch (error) {
      console.log(`error create account: `, error);
      throw error;
    }
  },
  verifyCode: async (__, { username, code }) => {
    if (!username) {
      throw new UserInputError("Invalid credentials!");
    }
    if (!isValidCode(code)) {
      throw new UserInputError("Invalid credentials!");
    }
    const isPhoneMode = isValidPhone(username);
    const isEmailMode = !isPhoneMode && isValidEmail(username);
    // verifier que le mail ou telephone est valide
    if (!isPhoneMode && !isEmailMode) {
      throw new UserInputError("Invalid credentials");
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("Invalid credentials!");
      }
      // au cas ou l'admin a desactive le compte
      // todo: ou le user lui mm l'a desactive
      if (!user.active) {
        throw new ForbiddenError("Not Authorized!");
      }
      // todo validate code
      if (isEmailMode) {
        const { verificationEmailSent, verificationCode, codeExpAt } = user.stats || {};
        console.log(`[verifyCode] ----------------`);
        console.log(`[verifyCode] verificationEmailSent`, verificationEmailSent);
        console.log(`[verifyCode] verificationCode`, verificationCode);
        console.log(`[verifyCode] codeExpAt`, new Date(codeExpAt).toISOString());

        if (!verificationEmailSent || verificationCode !== code || codeExpAt <= Date.now()) {
          user.stats = {
            ...user.stats,
            verificationCode: "",
            codeIat: "",
            codeExpAt: 0,
          };
          await user.save();
          throw new UserInputError("Invalid credentials!");
        }
        user.verified = true;
        user.verifiedAt = Date.now();
        user.stats = {
          ...user.stats,
          verificationCode: "",
          codeIat: "",
          codeExpAt: 0,
        };
      }
      if (isPhoneMode) {
        const { verificationPhoneSent, verificationSms, codeSmsExpAt } = user.stats || {};

        if (!verificationPhoneSent || verificationSms !== code || codeSmsExpAt <= Date.now()) {
          user.stats = {
            ...user.stats,
            verificationSms: "",
            codeSmsIat: "",
            codeSmsExpAt: 0,
          };
          await user.save();
          throw new UserInputError("Invalid credentials!");
        }
        user.verified = true;
        user.stats = {
          ...user.stats,
          verificationSms: "",
          codeSmsIat: "",
          codeSmsExpAt: 0,
        };
      }
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          iat: Math.floor(Date.now() / 1000), // initier quand
        },
        token_key,
        {
          expiresIn: tokenExpTime,
        }
      );

      // ici on genere aussi le refresh token
      const refreshToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          iat: Math.floor(Date.now() / 1000),
        },
        refresh_token_key,
        {
          expiresIn: refreshTokenExpTime,
        }
      );

      // on enregistre
      user.tokens.push({
        token: refreshToken,
        // ipAddress: reqIp,
        device: "",
      });

      await user.save();

      return { userId: user.id, token, refreshToken };
    } catch (error) {
      console.log(`error login: `, error);
      throw error;
    }
  },
  logUserIn: async (_p, { username, password }) => {
    if (!username || !password) {
      throw new UserInputError("Invalid credentials");
    }
    // * MODE
    const isPhoneMode = isValidPhone(username);
    const isEmailMode = !isPhoneMode && isValidEmail(username);
    if (!isPhoneMode && !isEmailMode) {
      throw new UserInputError(`Invalid email or password!`);
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("Invalid Email or Password!");
      }
      if (!user.active) {
        throw new ForbiddenError("Not Authorized!");
      }
      // console.log(`user: `, user._doc);
      const pwdMatch = await bcrypt.compare(password, user._doc.password);
      if (!pwdMatch) {
        console.log(`password don't match...`);
        throw new UserInputError("Invalid Email or Password");
      }
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          iat: Math.floor(Date.now() / 1000), // initier quand
        },
        token_key,
        {
          expiresIn: tokenExpTime,
        }
      );

      // ici on genere aussi le refresh token
      const refreshToken = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          iat: Math.floor(Date.now() / 1000),
        },
        refresh_token_key,
        {
          expiresIn: refreshTokenExpTime,
        }
      );

      user.tokens.push({
        token: refreshToken,
        ipAddress: "",
        device: "",
      });
      // todo delete all tokens with same ip, or deprecated
      await user.save();
      return {
        userId: user.id,
        token,
        refreshToken,
      };
    } catch (error) {
      console.log(`error login: `, error);
      throw error;
    }
  },
  firtUser: async (__, ___, { currentUser }) => {
    if (!currentUser) return 'error'
    try {
      await Depense.updateMany({}, {
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      })
      return 'ok'
    } catch (error) {
      throw error
    }
  }
};
