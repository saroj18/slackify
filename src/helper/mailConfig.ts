import env from "@/utils/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.NODEMAILER_EMAIL,
    pass: env.NODEMAILER_PASSWORD,
  },
});

export const sendMail = async (
  userList: string[],
  subject: string,
  message: string
) => {
  try {
    const data = await Promise.all(
      userList.map(async (userMail) => {
        return await transporter.sendMail({
          from: "Slackify",
          to: userMail,
          subject: subject,
          html: message,
        });
      })
    );
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
