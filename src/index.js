#!usr/bin/env node
const FileHandler = require('./utils/FileHandler')
const RaceService = require('./services/RaceService')

async function start (filePath) {
  const handler = new FileHandler
  const service = new RaceService(handler)
  await service.loadFile(filePath)

}

if (process.argv.length > 3) {
  console.log('Invalid usage of command: must have only one argument')
}

start(process.argv[2])
  .catch(error => console.log(error.message))