const cron = require('node-cron')
const getData = require('./utils/getData');
const { TIME_CRON_JOB, SENTRY_DNS, SENTRY_ID } = require('./config')

const Sentry = require('@sentry/node');

if (SENTRY_DNS && SENTRY_ID) Sentry.init({ dsn: `https://${SENTRY_DNS}@o410557.ingest.sentry.io/${SENTRY_ID}` });

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  Sentry.captureException(err);
});

const GetData = getData()
cron.schedule(TIME_CRON_JOB, async function() {
//cron.schedule("59 23 * * *", async function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  const info = GetData.fullData()
});