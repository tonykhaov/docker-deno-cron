async function createLog(date: Date) {
  const file = await Deno.create(`./logs/${date.getTime()}`)
  const encoder = new TextEncoder()
  const data = encoder.encode(String(date))
  await file.write(data)
}

async function getLogs() {
  const logs = []
  for await (const log of Deno.readDir('./logs')) {
    logs.push(log.name)
  }

  return logs.map((log) => Number(log)).filter((log) => typeof log === 'number')
}

export { createLog, getLogs }
