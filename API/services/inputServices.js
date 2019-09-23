const mongoose = require("mongoose");
const User = require("../schemas/User");

module.exports = {
  lastname: data => {
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (data == null || data == "") return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "cannot contain spaces" };
    if (!data.match(regex)) return { error: "is invalid" };
    if (data.length < 3 || data.length > 28) return { error: "incorrect size" };
    else return { status: "valid" };
  },

  firstname: data => {
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (data == null || data == "") return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "cannot contain spaces" };
    if (!data.match(regex)) return { error: "is invalid" };
    if (data.length < 3 || data.length > 28) return { error: "incorrect size" };
    else return { status: "valid" };
  },

  username: async data => {
    const regex = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;

    if (data == null || data == "") return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "cannot contain spaces" };
    if (!data.match(regex)) return { error: "is invalid" };
    if (data.length < 3 || data.length > 30) return { error: "incorrect size" };
    //Check db for already existing username
    var result = await User.find({ username: data });
    if (result != "") return { error: "is already registered" };
    else return { status: "valid" };
  },

  mail: async data => {
    if (data == null || data == "") return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "cannot contain spaces" };
    //Check pattern
    var mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;
    if (!mailPattern.test(data)) return { error: "doesn't match pattern" };
    //Check db for already existing mail
    var result = await User.find({ email: data });
    if (result != "") return { error: "already exists" };
    else return { status: "valid" };
  },

  password: data => {
    if (data == null || data == "") return { error: "missing parameter" };
    if (/\s/.test(data)) return { error: "spaces are forbidden" };
    //Check pattern
    var pwdPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    if (!pwdPattern.test(data)) return { error: "doesn't match pattern" };
    else return { status: "valid" };
  }
};
