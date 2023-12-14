// const nodemailer = require("nodemailer");
// const htmlToText = require("html-to-text");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const pug = require("pug");

// const WelcomeEmail = ({ firstName, url, subject }) => (
//   <html lang="en">
//     <head>
//       <meta charSet="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Welcome</title>
//     </head>
//     <body>
//       <h1
//         style={{ textAlign: "center", marginBottom: "40px", fontSize: "60px" }}
//       >
//         {subject}
//       </h1>
//       <p>Hello {firstName},</p>
//       <p>
//         Welcome to the S.Diary family. Click the following Button to get
//         started:
//       </p>
//       <a
//         href={url}
//         style={{
//           textDecoration: "none",
//           textAlign: "center",
//           padding: "40px",
//           borderRadius: "10px",
//           backgroundColor: "green",
//         }}
//       >
//         Welcome
//       </a>
//     </body>
//   </html>
// );
// const ResetPasswordEmail = ({ firstName, url, subject }) => (
//   <html>
//     <body>
//       <h1
//         style={{ textAlign: "center", marginBottom: "40px", fontSize: "30px" }}
//       >
//         {subject}
//       </h1>
//       <p style={{ margin: "0px", padding: "0px" }}>Hello {firstName},</p>
//       <p style={{ margin: "0px", padding: "0px" }}>
//         Click the following Button to reset password.
//       </p>
//       <a
//         href={url}
//         style={{
//           color: "#313638",
//           textDecoration: "none",
//           textAlign: "center",
//           padding: "20px",
//           borderRadius: "10px",
//           backgroundColor: "#E8E9EB",
//           display: "grid",
//           margin: "0 400px",
//         }}
//       >
//         Reset Password
//       </a>
//     </body>
//   </html>
// );
// // new Email(user, url).sendWelcome();

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `<${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       // service: 'Brevo',
//       host: process.env.SENDINBLUE_HOST,
//       port: process.env.SENDINBLUE_PORT,
//       auth: {
//         user: process.env.SENDINBLUE_LOGIN,
//         pass: process.env.SENDINBLUE_PASSWORD,
//       },
//     });
//   }

//   //send the actual email

//   async send(type, subject) {
//     // Render the React component to HTML
//     let reactHtml;
//     if (type === "welcome") {
//       reactHtml = ReactDOMServer.renderToStaticMarkup(
//         <WelcomeEmail
//           firstName={this.firstName}
//           url={this.url}
//           subject={subject}
//         />
//       );
//     }
//     if (type === "resetPassword") {
//       reactHtml = ReactDOMServer.renderToStaticMarkup(
//         <ResetPasswordEmail
//           firstName={this.firstName}
//           url={this.url}
//           subject={subject}
//         />
//       );
//     }

//     //define e mail options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html: reactHtml,
//       text: htmlToText.convert(reactHtml),
//       //html
//     };

//     //3 create a trasnport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send("welcome", "Welcome to the S.Diary family");
//   }

//   async sendPasswordReset() {
//     await this.send(
//       "resetPassword",
//       "Your password reset token valid for only 10 mins"
//     );
//   }
// };
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const path = require("path");

//path for views
const resetPasswordTemplatePath = path.join(
  __dirname,
  "../../views/resetPassword.ejs"
);
const welcomeTemplatePath = path.join(__dirname, "../../views/welcome.ejs");

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
