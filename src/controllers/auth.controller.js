const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  return res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

const refreshToken = asyncHandler(async (req, res) => {
  const token =
    req.body?.refreshToken ||
    req.headers["x-refresh-token"] ||
    req.headers["X-Refresh-Token"];
  const result = await authService.refreshTokens(token);
  return res.status(200).json(new ApiResponse(200, result, "Tokens refreshed"));
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(200).json(new ApiResponse(200, null, "Logged out"));
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { user: req.user }, "Current user"));
});

module.exports = { signup, login, refreshToken, logout, me };
