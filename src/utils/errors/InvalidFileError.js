class InvalidFileError extends Error {
  constructor () {
    super('File format is invalid')
  }
}

module.exports = InvalidFileError