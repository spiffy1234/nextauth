import nodemailer from "nodemailer";
import User from "@/src/models/userModel";
import brcyptjs from "bcryptjs";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await brcyptjs.hash(userId.toString(), 10);
    console.log(email, emailType, userId, hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MTUSER,
        pass: process.env.MTPASS,
      },
    });

    const mailOptions = {
      from: "srishti26012000@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your email",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> 
      to ${emailType === "VERIFY" ? "verify your email" : "reset your email"}
      or copy and paste the below URL in the browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    console.log(mailResponse, "______________from mailer");

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//https://mailtrap.io/blog/nodemailer-gmail/
