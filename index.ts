import { exists } from 'https://deno.land/std@0.106.0/fs/mod.ts'
import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.4'
import { createLog, getLastLog } from './helpers.ts'

const hasLogsDir = await exists('./logs')
if (!hasLogsDir) Deno.mkdir('./logs')

console.log('Start cron job:', dayjs().format('dddd DD MMMM YYYY HH:mm'))

const everyTenMinutes = '*/10 * * * *'
cron(everyTenMinutes, cronJob)

async function cronJob() {
  const date = new Date()
  const formatedDate = dayjs(date).format('dddd DD MMMM YYYY HH:mm')
  const [currentMonth, currentDay, currentHour] = dayjs(date)
    .format('M-D-h')
    .split('-')

  const lastLog = await getLastLog()
  const [lastLogMonth, lastLogDay, lastLogHour] = dayjs(lastLog)
    .format('M-D-h')
    .split('-')

  const shouldDoJob =
    lastLogMonth === currentMonth &&
    lastLogDay === currentDay &&
    lastLogHour !== currentHour

  if (!shouldDoJob) {
    return console.log(formatedDate, 'I did not create a log file')
  }

  await createLog(date)
  console.log(
    formatedDate,
    'I created a log file because no log was created this hour',
  )
}
