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

const getRelativeNameSubfoldersOf = ({ resolvedFolderName }) => {
  let subfolders = []

  // May contain files and folders
  var thisDirContent = fs.readdirSync(resolvedFolderName)
  while (thisDirContent.length > 0) {
    const dirOrFileRelativeName = thisDirContent.shift()
    const dirOrFileResolvedName = path.join(resolvedFolderName, dirOrFileRelativeName)
    if (isDirectory({ resolvedPathOrFilename: dirOrFileResolvedName })) {
      subfolders = subfolders.concat(dirOrFileRelativeName)
    }
  }

  return subfolders
}

module.exports = {
  isDirectory,
  resolvePathOrFilename,
  getRelativeNameSubfoldersOf
}
