const formatter = require('./utils/ReportFormatter')

async function start (filePath, maxLaps, service) {
  await service.loadFile(filePath)
  const report = service.generateReport(maxLaps)

  console.log('== PODIUM ==')
  console.table(formatter.getPodiumReport(report))
  console.log('== DADOS GERAIS ==')
  console.table(formatter.getRaceReport(report))
}

async function init (args, service) {
  if (args.length > 4) {
    throw new Error('Invalid usage of command: must have one to two arguments (npm start <file path> [max laps])')
  }

  return start(args[2], args[3], service)
}

module.exports = init