const nodemailer = require("nodemailer");
const fs = require("fs");

module.exports = {
  sendActivation: user => {
    let transporter = nodemailer.createTransport({
      sendmail: true,
      //newline: "unix",
      path: "/usr/sbin/sendmail"
    });

    let message = "",
      search = {
        username: "^^username^^",
        link: "^^linkactivation^^"
      },
      replace = {
        username: user.username,
        link:
          "localhost:3000/activation?user=" +
          encodeURIComponent(user.username) +
          "&key=" +
          encodeURIComponent(user.activationKey)
      };

    fs.readFile("API/templates/activationMail.html", (err, data) => {
      if (err) return console.error(err);
      message = data.toString();
      transporter.sendMail(
        {
          from: "no-reply@hyperflix.com",
          to: user.email,
          subject: "Welcome to HyperFlix",
          html: message
            .replace(search.username, replace.username)
            .replace(search.link, replace.link)
        },
        (err, info) => {
          console.log(info.envelope);
        }
      );
    });
  },

  sendNewPassword: (user, key) => {
    let transporter = nodemailer.createTransport({
      sendmail: true,
      //newline: "unix",
      path: "/usr/sbin/sendmail"
    });

    let message = "",
      search = {
        username: "^^username^^",
        link: "^^linkactivation^^"
      },
      replace = {
        username: user.username,
        link:
          "localhost:3000/reset-password?user=" +
          encodeURIComponent(user.username) +
          "&key=" +
          encodeURIComponent(key)
      };

    fs.readFile("API/templates/forgotPasswordMail.html", (err, data) => {
      if (err) return console.error(err);
      message = data.toString();
      transporter.sendMail(
        {
          from: "no-reply@hyperflix.com",
          to: user.email,
          subject: "HyperFlix - Forgot Password",
          html: message
            .replace(search.username, replace.username)
            .replace(search.link, replace.link)
        },
        (err, info) => {
          console.log(info.envelope);
        }
      );
    });
  }
};
