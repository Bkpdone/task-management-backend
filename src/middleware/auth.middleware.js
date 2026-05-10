const ApiError = require("../utils/ApiError");
const { verifyAccessToken } = require("../utils/jwt.util");

const authMiddleware = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Access token missing"));
    }

    const encryptedToken = authHeader.split(" ")[1];
    if (!encryptedToken) {
      return next(new ApiError(401, "Access token missing"));
    }

    const decoded = verifyAccessToken(encryptedToken);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    }
    return next(new ApiError(401, "Invalid access token"));
  }
};

module.exports = authMiddleware;
