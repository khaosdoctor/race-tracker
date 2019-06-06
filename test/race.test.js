const path = require('path')
const { expect } = require('chai')
const app = require('../src/index')
const FileHandler = require('../src/utils/FileHandler')
const RaceService = require('../src/services/RaceService')
const NoSuchFileError = require('../src/utils/errors/NoSuchFileError')
const InvalidFileError = require('../src/utils/errors/InvalidFileError')

describe('Race analyser', () => {
  describe('Command line input', () => {
    it('Should error on more than 3 args', async () => {
      app(['node', 'cli.js', 'filePath', 'maxlap', 'errorArg'], {}).catch((err) => expect(err.message).to.be.equal('Invalid usage of command: must have one to two arguments (npm start <file path> [max laps])'))
    })
  })

  describe('RaceService', () => {
    it('Should error on file not found', async () => {
      const service = new RaceService(new FileHandler())
      const args = ['node', 'cli.js', path.resolve(__dirname, '../input/race.data2')]
      try {
        await app(args, service)
      } catch (error) {
        expect(error).to.instanceOf(NoSuchFileError)
        expect(error.message).to.contain(args[2])
      }
    })

    it('Should error on invalid file', async () => {
      const service = new RaceService(new FileHandler())
      const args = ['node', 'cli.js', path.resolve(__dirname, '../input/errorFile.data')]
      try {
        await app(args, service)
      } catch (error) {
        expect(error).to.instanceOf(InvalidFileError)
      }
    })

    it('Should load correct file data', async () => {
      const service = new RaceService(new FileHandler())
      const file = path.resolve(__dirname, './fixtures/race.data')

      await service.loadFile(file)
      expect(service._raceParsedData.length).to.equal(8)
    })
  })
})