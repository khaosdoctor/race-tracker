const Racer = require('../entities/Racer')
const groupBy = require('lodash.groupby')
const sortBy = require('lodash.sortby')
const moment = require('moment')

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
    const podium = this._getPodium()
    const winner = podium[0]
    const bestLap = this._getBestLap()
    return {
      raceData: {
        bestLap: { lap: bestLap.lap, racerName: bestLap.racerName, id: bestLap.racerId, lapTime: bestLap.lapTime.format('mm:ss.SSS') }
      },
      podiumData: podium.map((racer) => ({ ...racer, timeFromWinner: moment(this._getTimeFromWinner(racer.lastLap.time, winner.lastLap.time)).format('mm:ss.SSS') }))
    }
  }

  _getPodium () {
    // Adds a new field to make sorting easier
    const addSortingTimestamp = (lap) => ({ ...lap, lapTimestamp: lap.lastLap.time.valueOf() })
    // Add sorting field to the collection
    const racersWithTimestamp = Object.values(this._racers).map(addSortingTimestamp)
    return sortBy(racersWithTimestamp, ['lapNumber', 'lapTimestamp'])
  }

  _getBestLap () {
    return sortBy(this._raceParsedData, ['lapTime']).reverse().pop()
  }

  _getTimeFromWinner (racerTime, winnerTime) {
    return racerTime - winnerTime
  }

  _loadRacers () {
    const groupedRacers = groupBy(this._raceParsedData, (value) => value.racerId)
    const racers = {}
    for (let racerId in groupedRacers) {
      const racer = new Racer(groupedRacers[racerId])
      racers[racerId] = racer
    }
    return racers
  }
}

module.exports = RaceService