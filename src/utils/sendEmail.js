"use server";
import nodeMailer from "nodemailer";

export default async function sendEmail(req) {
  const { name, email, body, subject } = req;

  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  try {
    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });
    const verifyResult = await transport.verify();
    const res = await transport.sendMail({
      from: SMTP_EMAIL,
      to: SMTP_EMAIL,
      subject,
      html: `
      <h4>name: ${name}</h4>
      <h4>Email:${email}</h4>
      <br/>
      <p>${body}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.log("email Error", err.message);
    return { success: false, error: err.message };
  }
}
