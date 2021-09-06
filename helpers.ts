async function createLog(date: Date) {
  const file = await Deno.create(`./logs/${date.getTime()}`)
  const encoder = new TextEncoder()
  const data = encoder.encode(String(date))
  await file.write(data)
}

async function getLastLog() {
  const logs = []
  for await (const log of Deno.readDir('./logs')) {
    logs.push(log.name)
  }

  const lastLog = logs
    .map((log) => Number(log))
    .sort((a, b) => (a > b ? -1 : 1))
    .at(0)
  return lastLog
}

export { createLog, getLastLog }
