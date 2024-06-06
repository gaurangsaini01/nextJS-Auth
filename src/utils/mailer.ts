import User from "@/models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashValue = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashValue,
        verifyTokenExpiry: Date.now() + 20 * 60 * 1000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashValue,
        forgotPasswordTokenExpiry: Date.now() + 20 * 60 * 1000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "verify" ? "Verification Mail" : "Reset Your Password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashValue}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashValue}
      </p>`, // html body
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default sendMail;
