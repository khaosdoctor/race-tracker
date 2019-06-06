const { ascendingBy, descendingBy } = require('../utils/sort')
const moment = require('moment')

class Racer {
  constructor (racerData) {
    this.id = racerData[0].racerId
    this.name = racerData[0].racerName
    this.laps = racerData.map((data) => ({ lapNumber: data.lap, lapTime: data.lapTime, avgSpeed: data.avgLapSpeed, time: data.time })).sort(ascendingBy('time'))
    this.completedLaps = racerData.sort(descendingBy('lap'))[0].lap
    this.avgSpeed = racerData.reduce((acc, val) => acc + val.avgLapSpeed, 0) / this.completedLaps
    this.bestLap = racerData.sort(ascendingBy('lapTime'))[0]
    this.totalRacingTime = moment(this.laps[this.laps.length - 1].time - this.laps[0].time).format('mm:ss.SSS')
  }

  timeFromWinner (winnerTime) {
    return this.laps.filter((lap) => lap.lapNumber === this.completedLaps).time - winnerTime
  }
}

module.exports = Racer