require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWD: process.env.DB_PASSWD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  SENDGRID_API: process.env.SENDGRID_API,
  SENDGRID_WELCOME_TEMPLATE: process.env.SENDGRID_WELCOME_TEMPLATE,
  SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
  SENDGRID_REMEMBER_TEMPLATE: process.env.SENDGRID_REMEMBER_TEMPLATE,
  TIME_CRON_JOB: process.env.TIME_CRON_JOB
}

module.exports = config