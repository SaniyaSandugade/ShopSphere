import nodemailer from "nodemailer";

const sendEmail = async (

  to,
  subject,
  text

) => {

  try {

    console.log(
      "EMAIL USER:",
      process.env.EMAIL_USER
    );

    console.log(
      "EMAIL PASS:",
      process.env.EMAIL_PASS
    );

    const transporter =
      nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 587,

        secure: false,

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS

        }

      });

    console.log("Sending Email...");

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to,

      subject,

      text

    });

    console.log(
      "Email Sent Successfully"
    );

  } catch (error) {

    console.log(error);

  }

};

export default sendEmail;