const chalk = require('chalk')
const fs = require('fs')

const {
  errorMessage
} = require('../logger/logger')

const readDependencyFromPackageFile = ({ packageJsonFilename }) => {
  const fileContentsAsTxt = fs.readFileSync(packageJsonFilename).toString()
  const fileContentsAsJsonObj = JSON.parse(fileContentsAsTxt)
  if (!fileContentsAsJsonObj.name || !fileContentsAsJsonObj.version) {
    errorMessage(chalk`{red Missing name or version} for dependency in file ${packageJsonFilename}: \n\t${JSON.stringify(fileContentsAsJsonObj)}\n`)
  }
  return ({
    name: fileContentsAsJsonObj.name,
    version: fileContentsAsJsonObj.version
  })
}

module.exports = {
  readDependencyFromPackageFile
}
