const moment = require('moment')
const sortBy = require('lodash.sortby')

class Racer {
  constructor (racerData) {
    this.id = racerData[0].racerId
    this.name = racerData[0].racerName
    this.laps = sortBy(racerData.map((data) => ({ lapNumber: data.lap, lapTime: data.lapTime, avgSpeed: data.avgLapSpeed, time: data.time })), ['time']) // sorts laps by time
    this.lastLap = this.laps[this.laps.length - 1]
    this.completedLaps = this.lastLap.lapNumber
    this.bestLap = sortBy(racerData, ['lapTime'])[0]
    this.avgSpeed = racerData.reduce((acc, val) => acc + val.avgLapSpeed, 0) / this.completedLaps
    this.totalRacingTime = moment(this.laps[this.laps.length - 1].time - this.laps[0].time).format('mm:ss.SSS')
  }
}

module.exports = Racer