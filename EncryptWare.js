const crypto = require("crypto");
const secure = "dddddddddddddddddddddddddddddddd";
const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cypher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secure), iv);

  const encryptedPassword = Buffer.concat([
    cypher.update(password),
    cypher.final(),
  ]);

  return encryptedPassword.toString("hex");
};

const decrypt = (encryption) => {};

module.exports = { encrypt, decrypt };
