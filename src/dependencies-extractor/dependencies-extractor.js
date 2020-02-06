const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const {
  getResolvedNameSubfoldersOf
} = require('../filesystem/filesystem')

const {
  errorMessage
} = require('../logger/logger')
const utilities = require('../utilities/utilities')

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

/* Current folder is assumed to exist
 Assumptions on the node_modules structure:
  1. if a package.json file exists in a subfolder within node_modules,
   then its folder represents a dependency, and the only sub-dependencies of it will be located in a
   node_modules subfolder. This is to avoid analyzing folders such as src code of a dependency
  2. if a package.json file does not exist in a folder within node_modules,
   then this folder represents the scope of one or more packages (e.g. @babel), and the search should go
   to all of its subdirectories
*/
const getUnsortedDependenciesFromFolder = ({ currentFolder, foldersToAnalyze }) => {
  let foundDependencies = []
  let subfoldersToAnalyse = []

  const possiblePackageLockFilename = path.join(currentFolder, 'package.json')
  if (fs.existsSync(possiblePackageLockFilename)) {
    const newDependency = readDependencyFromPackageFile({ packageJsonFilename: possiblePackageLockFilename })
    foundDependencies.push(newDependency)

    const possibleNodeModulesFolderName = path.join(currentFolder, 'node_modules')
    if (fs.existsSync(possibleNodeModulesFolderName)) {
      subfoldersToAnalyse.push(possibleNodeModulesFolderName)
    }
  } else {
    subfoldersToAnalyse = getResolvedNameSubfoldersOf({ resolvedFolderName: currentFolder })
  }

  let newFoldersToAnalyze = foldersToAnalyze
  if (subfoldersToAnalyse.length > 0) {
    newFoldersToAnalyze = foldersToAnalyze.concat(subfoldersToAnalyse)
  }

  while (newFoldersToAnalyze.length > 0) {
    const folderToAnalyze = newFoldersToAnalyze.shift()
    return foundDependencies.concat(
      getUnsortedDependenciesFromFolder({
        currentFolder: folderToAnalyze,
        foldersToAnalyze: newFoldersToAnalyze
      })
    )
  }
  return foundDependencies
}

const getDependenciesFromFolder = ({ currentFolder }) => {
  const possiblyDuplicatedDepsFromNodeModules = getUnsortedDependenciesFromFolder({
    currentFolder, foldersToAnalyze: []
  })
  return utilities
    .sortByNameAndVersionCaseInsensitive(utilities
      .getUniquesByNameAndVersion(possiblyDuplicatedDepsFromNodeModules))
}

module.exports = {
  readDependencyFromPackageFile,
  getUnsortedDependenciesFromFolder,
  getDependenciesFromFolder
}
