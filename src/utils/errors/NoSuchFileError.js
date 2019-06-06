class NoSuchFileError extends Error {
  constructor (filePath) {
    super(`No such file: ${filePath}`)
  }
}

module.exports = NoSuchFileError