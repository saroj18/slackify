const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

for (const key in env) {
  if (!process.env[key]) {
    console.log(`Environment variable ${key} is not defined`);
  }
}

export default env;
