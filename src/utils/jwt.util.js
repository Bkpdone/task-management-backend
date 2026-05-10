const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("./crypto.util");

const signAccessToken = (user) => {
  const payload = {
    id: user._id.toString(),
    emailid: user.emailid,
    fName: user.fName,
    lName: user.lName,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });
  return encrypt(token);
};

const signRefreshToken = (user) => {
  const payload = {
    id: user._id.toString(),
    emailid: user.emailid,
  };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
  return encrypt(token);
};

const verifyAccessToken = (encryptedToken) => {
  const token = decrypt(encryptedToken);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (encryptedToken) => {
  const token = decrypt(encryptedToken);
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
