import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import { exists } from 'https://deno.land/std@0.106.0/fs/mod.ts'

const hasLogsDir = await exists('./logs')
if (!hasLogsDir) Deno.mkdir('./logs')

console.log('Start cron job', String(new Date()))

const everyTenMinutes = '*/10 * * * *'
cron(everyTenMinutes, async () => {
  const date = new Date()
  const file = await Deno.create(`./logs/${date.getTime()}`)
  const encoder = new TextEncoder()
  const data = encoder.encode(String(date))
  await file.write(data)
  console.log(`${String(date)}: script ran and I created a log file`)
})
