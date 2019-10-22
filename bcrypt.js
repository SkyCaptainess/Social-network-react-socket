// const bcrypt = require("bcryptjs");
// const { promisify } = require("util");
//
// const hash = promisify(bcrypt.hash);
// const genSalt = promisify(bcrypt.genSalt);
//
// exports.hash = password => genSalt().then(salt => hash(password, salt));
//
// exports.compare = promisify(bcrypt.compare);genSalt, hash, compare

let { genSalt, hash, compare } = require("bcryptjs");
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

genSalt()
    .then(salt => {
        console.log(salt);
        return hash("monkey", salt);
    })
    .then(hash => {
        console.log(hash);
        return compare("monkey", hash);
        // return compare("monkey1", hash);
    })
    .then(isMatch => console.log(isMatch));
