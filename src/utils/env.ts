const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
  PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
  PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER,
  ZEGOCLOUD_APP_ID: process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID,
  ZEGOCLOUD_SECRETE: process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRETE,
};

for (const key in env) {
  if (!process.env[key]) {
    console.log(`Environment variable ${key} is not defined`);
  }
}

export default env;
