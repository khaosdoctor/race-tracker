const Racer = require('../entities/Racer')
const groupBy = require('lodash.groupby')

class RaceService {
  constructor (fileHandler) {
    this._handler = fileHandler
    this._raceParsedData = []
  }

  async loadFile (filePath) {
    const contents = await this._handler.readFile(filePath)
    this._raceParsedData = this._handler.parseFile(contents)
    this._racers = this._loadRacers()
    return this._raceParsedData
  }

  generateReport () {
    const reportData = []

  }

  _loadRacers () {
    const groupedRacers = groupBy(this._raceParsedData, (value) => value.racerId)
    const racers = {}
    for (let racerId in groupedRacers) {
      const racer = new Racer(groupedRacers[racerId])
      console.log(racer)
      racers[racerId] = racer
    }
    return racers
  }

  _sortAscendingBy (criteria, data) {
    return data.sort((prev, next) => prev[criteria] - next[criteria])
  }
}

module.exports = RaceService