const cron = require('node-cron')
const getData = require('./utils/getData');
const { TIME_CRON_JOB } = require('./config')

cron.schedule(TIME_CRON_JOB, async function() {
//cron.schedule("59 23 * * *", async function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  const GetData = getData()
  const info = GetData.fullData()
});