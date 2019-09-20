const User = require("../schemas/User");
const sanitize = require("mongo-sanitize");

module.exports = {
  usernameExists: async data => {
    var result = User.findByUsername(sanitize(data));
  }
};
