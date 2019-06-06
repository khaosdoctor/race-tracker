#!usr/bin/env node
const FileHandler = require('./utils/FileHandler')
const RaceService = require('./services/RaceService')
const formatter = require('./utils/ReportFormatter')

async function start (filePath) {
  const handler = new FileHandler
  const service = new RaceService(handler)
  await service.loadFile(filePath)
  const report = service.generateReport()

  console.table(formatter.getPodiumReport(report))
  console.table(formatter.getRaceReport(report))
}

if (process.argv.length > 3) {
  console.log('Invalid usage of command: must have only one argument')
}

start(process.argv[2])
  .catch(error => console.log(error.message))