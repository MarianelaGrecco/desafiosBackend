import dotenv from "dotenv";

dotenv.config();

export default {
  mongo_uri: process.env.MONGO_URI,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  port: process.env.PORT,
  secret_key_jwt: process.env.SECRET_KEY_JWT,

  COOKIE: process.env.JWT_COOKIE,
  SECRET: process.env.JWT_SECRET,

  gmail_user: process.env.GMAIL_USER,
  gmail_password: process.env.GMAIL_PASSWORD,
  LOGGER: process.env.LOGGER,
  SERVICE: process.env.MAILING_USER,
  USER: process.env.MAILING_PASSWORD,
  PASSWORD: process.env.MAILING_SERVICES
};
