const crypto = require("crypto");
const secure = "dddddddddddddddddddddddddddddddd";
const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cypher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secure), iv);

  const encryptedPassword = Buffer.concat([
    cypher.update(password),
    cypher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
};

const decrypt = (encryption) => {
  const decypher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secure),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decypher.update(Buffer.from(encryption.password, "hex")),
    decypher.final(),
  ]);

  return decryptedPassword.toString("utf-8");
};

module.exports = { encrypt, decrypt };
