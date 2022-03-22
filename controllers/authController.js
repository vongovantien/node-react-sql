const db = require("../models");
const createError = require("http-errors");
const User = db.users;
const { authSchema } = require("../helpers/validation_schema");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_helper");
const salt = bcrypt.genSaltSync(10);

const register = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    //if (!email || !password) throw createError.BadRequest();
    const result = await authSchema.validateAsync(req.body);
    const hashPassword = await bcrypt.hash(result.password, salt);

    let checkEmail = await User.findOne({ where: { email: result.email } });
    if (checkEmail) throw createError.Conflict(`${result.email} da ton tai`);

    let newUser = {
      email: result.email,
      password: hashPassword,
    };

    const user = await User.create(newUser);

    res.status(201).send(user);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ where: { email: result.email } });
    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await bcrypt.compare(result.password, user.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.status(201).send({ user, accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
};

module.exports = {
  register,
  login,
};
