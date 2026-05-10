const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.util");

const buildTokens = async (user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const signup = async ({ fName, lName, emailid, password }) => {
  const existing = await User.findOne({ emailid });
  if (existing) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({ fName, lName, emailid, password });
  const tokens = await buildTokens(user);

  return { user: user.toSafeObject(), ...tokens };
};

const login = async ({ emailid, password }) => {
  const user = await User.findOne({ emailid });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const tokens = await buildTokens(user);
  return { user: user.toSafeObject(), ...tokens };
};

const refreshTokens = async (encryptedRefreshToken) => {
  if (!encryptedRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(encryptedRefreshToken);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  if (user.refreshToken !== encryptedRefreshToken) {
    throw new ApiError(401, "Refresh token does not match. Please login again.");
  }

  const tokens = await buildTokens(user);
  return { user: user.toSafeObject(), ...tokens };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = { signup, login, refreshTokens, logout };
