#!/usr/bin/env node
const app = require('./src')
const FileHandler = require('./src/utils/FileHandler')
const RaceService = require('./src/services/RaceService')
const handler = new FileHandler
const service = new RaceService(handler)

app(process.argv, service).catch(error => console.log(error.message))