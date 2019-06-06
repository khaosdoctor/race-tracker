const fs = require('fs')
const path = require('path')
const readline = require('readline')
const moment = require('moment')
const InvalidFileError = require('./errors/InvalidFileError')
const NoSuchFileError = require('./errors/NoSuchFileError')

class FileHandler {
  async readFile (filePath, options = { stripHeaders: true }) {
    if (!fs.existsSync(filePath)) throw new NoSuchFileError(filePath)

    const fileStream = fs.createReadStream(path.resolve(filePath), { encoding: 'utf-8' })
    const lineInterface = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    const contentArray = []

    for await (const line of lineInterface) {
      contentArray.push(this._normalize(line).split(' ').filter((char) => char !== ''))
    }

    if (options.stripHeaders) contentArray.shift()
    return contentArray
  }

  parseFile (contents) {
    if (contents.filter(line => line.length !== 7).length > 0) throw new InvalidFileError()

    const parsedObject = []
    for (let line of contents) {
      parsedObject.push({
        time: moment(line[0], 'hh:mm:ss.SSSS'),
        racerId: line[1],
        racerName: line[3],
        lap: parseInt(line[4]),
        lapTime: moment(line[5], 'mm:ss.SSS'),
        avgLapSpeed: parseFloat(line[6].replace(',', '.'))
      })
    }

    return parsedObject
  }

  _normalize (line) {
    return line.replace(/\t/gmi, ' ')
  }
}

module.exports = FileHandler