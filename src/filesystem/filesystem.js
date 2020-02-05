const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const {
  errorMessage
} = require('../logger/logger')

const isDirectory = ({ resolvedPathOrFilename }) => {
  try {
    var stat = fs.lstatSync(resolvedPathOrFilename)
    return stat.isDirectory()
  } catch (e) {
    // lstatSync throws an error if resolvedPathOrFilename doesn't exist
    errorMessage(`Path ${resolvedPathOrFilename} does not exist`)
    return false
  }
}

// Returns full name (absolute) of the path/file, if it be resolved.
// If the path to the file cannot be resolved, returns null.
const resolvePathOrFilename = ({ pathOrFilename }) => {
  let resolvedFullName = null
  if (fs.existsSync(pathOrFilename)) {
    resolvedFullName = pathOrFilename
  } else {
    resolvedFullName = path.join(__dirname, pathOrFilename)
    if (!fs.existsSync(resolvedFullName)) {
      errorMessage(chalk`File {blue ${pathOrFilename}} doesn't exist and could not be resolved to {blue ${resolvedFullName}}`)
      resolvedFullName = null
    }
  }
  return resolvedFullName
}

module.exports = {
  isDirectory,
  resolvePathOrFilename
}
