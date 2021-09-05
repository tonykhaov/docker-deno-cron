import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'

function app() {
  let count = 0
  cron('1 */10 * * * *', () => {
    count++
    console.log(`I ran ${count} times at ${new Date()}`)
  })
}

console.log('Start cron job', new Date())
app()
