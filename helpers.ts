async function createLog(date: Date) {
  const encoder = new TextEncoder()
  const log = encoder.encode(date + '\n')
  await Deno.writeFile('./logs', log, { append: true })
}

async function getLastLog() {
  const decoder = new TextDecoder('utf-8')
  const logs = decoder.decode(await Deno.readFile('./logs'))

  const lastLog = logs
    .split('\n')
    .filter((x) => x !== '')
    .sort((a, b) => (a > b ? -1 : 1))
    .at(0)

  return lastLog
}

export { createLog, getLastLog }
