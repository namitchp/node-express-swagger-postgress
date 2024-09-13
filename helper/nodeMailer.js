const nodemailer = require("nodemailer");
import Config from "../config";

export async function sendMailOtp(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "biswajitbehura34@gmail.com",
      pass: Config.NODEMAILER,
    },
  });

  const mailOptions = {
    from: "biswajitbehura34@gmail.com",
    to: email,
    subject: "nor_dek verification otp",
    text: `${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: " + error);
        reject(false); // Reject the promise in case of an error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response); // Resolve the promise with the success response
      }
    });
  });
}

export async function sendMailJoinUs(email, message) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "biswajitbehura34@gmail.com",
      pass: Config.NODEMAILER,
    },
  });

  const mailOptions = {
    from: "biswajitbehura34@gmail.com",
    to: email,
    subject: "You Are Join SuccessFully",
    text: `${message}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: " + error);
        reject(false); // Reject the promise in case of an error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response); // Resolve the promise with the success response
      }
    });
  });
}
export function generateOTP() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
