const ejs = require("ejs");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const path = require("path");

//path for views
const resetPasswordTemplatePath = path.resolve(
  __dirname,
  "../../views/resetPassword.ejs"
);
const welcomeTemplatePath = path.resolve(__dirname, "../../views/welcome.ejs");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `<${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      // service: 'Brevo',
      host: process.env.SENDINBLUE_HOST,
      port: process.env.SENDINBLUE_PORT,
      auth: {
        user: process.env.SENDINBLUE_LOGIN,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }

  //send the actual email

  async send(type, subject) {
    // Render the EJS template to HTML
    let htmlTemplate;
    if (type === "welcome") {
      htmlTemplate = await ejs.renderFile(resetPasswordTemplatePath, {
        firstName: this.firstName,
      });
    }
    if (type === "resetPassword") {
      htmlTemplate = await ejs.renderFile(welcomeTemplatePath, {
        firstName: this.firstName,
        url: this.url,
      });
    }

    //define e mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlTemplate,
      text: htmlToText.convert(htmlTemplate),
    };

    //3 create a trasnport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the S.Diary family");
  }

  async sendPasswordReset() {
    await this.send(
      "resetPassword",
      "Your password reset token valid for only 10 mins"
    );
  }
};
