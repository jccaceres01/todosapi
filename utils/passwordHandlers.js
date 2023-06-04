/**
 * Handler encrypt and decrypt password
 */
const { hash, compare, genSalt } = require('bcryptjs');

/**
 * Hash password
 */
const hashPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

/**
 * Compare hashedPassword
 */
const comparedhashedPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparedhashedPassword
};
