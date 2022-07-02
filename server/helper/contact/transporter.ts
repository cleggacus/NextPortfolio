import nodemailer from "nodemailer";

const config = {
  port: 465,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: true,
};

const transporter = nodemailer.createTransport(config);

export default transporter;