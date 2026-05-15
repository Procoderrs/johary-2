import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, bcc, subject, html }) {
  await transporter.sendMail({
    from: `"Johary Jewellery" <${process.env.EMAIL_USER}>`,
    to,
    bcc,
    subject,
    html,
  });
}