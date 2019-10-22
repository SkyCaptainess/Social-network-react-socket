const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const hash = promisify(bcrypt.hash);
const genSalt = promisify(bcrypt.genSalt);

exports.hash = password => genSalt().then(salt => hash(password, salt));

exports.compare = promisify(bcrypt.compare);
