#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-extra')
const { isDirectory, resolvePathOrFilename } = require('./filesystem/filesystem')
const { getDependenciesFromFolder } = require('./dependencies-extractor/dependencies-extractor')

const {
  setVerbose,
  infoMessage,
  errorMessage
} = require('./logger/logger')

program
  .version('0.0.1', '-v, --version')
  .option(
    '-i, --input [path]',
    '(mandatory) specifies path to the node_modules folder'
  )
  .option('-o, --output [filename]', '(optional) specifies the output filename', 'dependencies_from_node_modules.json')
  .option('--verbose', '(optional) Verbose output of commands and errors')

  .parse(process.argv)

const { input, output, verbose } = program

const areCliInputParametersValid = ({ input }) => {
  if (!input) {
    errorMessage(chalk`{red Mandatory input parameter is missing} (run 'extract --help' for usage).`)
    return false
  }

  const resolvedPathOrFilename = resolvePathOrFilename({ pathOrFilename: input })
  if (Boolean(resolvedPathOrFilename) === false ||
    !isDirectory({ resolvedPathOrFilename })
  ) {
    errorMessage(chalk`{red Input parameter cannot be resolved to an existig path}.`)
    return false
  }
  return true
}

const processFiles = async () => {
  setVerbose(verbose)

  infoMessage(
    chalk`extract\n Program arguments:\n    input: {blue ${input}}\n    output: {blue ${output}}\n      verbose: {blue ${verbose}}`
  )

  if (!areCliInputParametersValid({ input })) {
    errorMessage(chalk`{red At least one program parameter is invalid}. Program exits.`)
    return
  }

  const resolvedInputPath = resolvePathOrFilename({ pathOrFilename: input })
  if (input !== resolvedInputPath) {
    infoMessage(
      chalk`Resolved input path ${input} to path {blue ${resolvedInputPath}}`
    )
  }

  const outputJsonFileName = 'dependencies_from_node_modules.json'
  const depsFromNodeModules = getDependenciesFromFolder({ currentFolder: resolvedInputPath })
  infoMessage(
    chalk`Writing {blue ${depsFromNodeModules.length}} dependencies as JSON array to {blue ${outputJsonFileName}}`
  )
  try {
    await fs.writeJSON(outputJsonFileName, depsFromNodeModules, { spaces: 2, eol: '\n' })
  } catch (e) {
    errorMessage(chalk`Could not write to {blue ${outputJsonFileName}}`, e)
  }
}

processFiles()
