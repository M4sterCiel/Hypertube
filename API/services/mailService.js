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
        username: "*Username*",
        link: "linkactivation"
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
      message = message
        .replace(search.username, replace.username)
        .replace(search.username, replace.link);

      transporter.sendMail(
        {
          from: "no-reply@hyperflix.com",
          to: user.email,
          subject: "Welcome to HyperFlix",
          html: message,
          contentType: "text/html"
        },
        (err, info) => {
          console.log(info.envelope);
        }
      );
    });
  }
};
