import { exists } from 'https://deno.land/std@0.106.0/fs/exists.ts'
import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.6?dts'
import { createLog, getLastLog } from './helpers.ts'

const hasLogsDir = await exists('./logs')
if (!hasLogsDir) await Deno.create('./logs')

console.log('Start cron job:', dayjs().format('dddd DD MMMM YYYY HH:mm'))

const everyTenMinutes = '*/10 * * * *'
cron(everyTenMinutes, cronJob)

async function cronJob() {
  const now = new Date()
  const formatedDate = dayjs(now).format('dddd DD MMMM YYYY HH:mm')
  const [currentYear, currentMonth, currentDay, currentHour] = dayjs(now)
    .format('YYYY-M-D-H')
    .split('-')

  const lastLog = await getLastLog()
  const [lastLogYear, lastLogMonth, lastLogDay, lastLogHour] = dayjs(lastLog)
    .format('YYYY-M-D-H')
    .split('-')

  const hasAlreadyBeenDone = {
    thisYear: lastLogYear === currentYear,
    thisMonth: lastLogMonth === currentMonth,
    today: lastLogDay === currentDay,
    thisHour: lastLogHour === currentHour,
  }

  const hasDoneJob =
    hasAlreadyBeenDone.thisYear &&
    hasAlreadyBeenDone.thisMonth &&
    hasAlreadyBeenDone.today &&
    hasAlreadyBeenDone.thisHour

  if (!hasDoneJob) {
    await createLog(now)
    console.log(
      formatedDate,
      'I created a log file because no log was created this hour',
    )
  } else {
    console.log(formatedDate, 'I refuse to create a log file')
  }
}
