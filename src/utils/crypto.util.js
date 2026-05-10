const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";

const getKey = () => {
  const secret = process.env.CRYPTO_SECRET || "";
  if (secret.length < 32) {
    return crypto.createHash("sha256").update(secret).digest();
  }
  return Buffer.from(secret.slice(0, 32), "utf8");
};

const getIv = () => {
  const iv = process.env.CRYPTO_IV || "";
  if (iv.length < 16) {
    return crypto.createHash("md5").update(iv).digest();
  }
  return Buffer.from(iv.slice(0, 16), "utf8");
};

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), getIv());
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), getIv());
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
