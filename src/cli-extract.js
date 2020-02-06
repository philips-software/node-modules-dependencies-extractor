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

const defaultOutputJsonFileName = 'dependencies_from_node_modules.json'

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

const areCliInputParametersValid = ({ input, output }) => {
  if (!input) {
    errorMessage(chalk`{red Mandatory input parameter is missing} (run 'extract --help' for usage).`)
    return false
  }
  if (!output) {
    infoMessage(`No output parameter provided; output filename will become the default name: ${defaultOutputJsonFileName}`)
    output = defaultOutputJsonFileName
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

  if (!areCliInputParametersValid({ input, output })) {
    errorMessage(chalk`{red At least one program parameter is invalid}. Program exits.`)
    return
  }

  const resolvedInputPath = resolvePathOrFilename({ pathOrFilename: input })
  if (input !== resolvedInputPath) {
    infoMessage(
      chalk`Resolved input path ${input} to path {blue ${resolvedInputPath}}`
    )
  }

  const depsFromNodeModules = getDependenciesFromFolder({ currentFolder: resolvedInputPath })
  infoMessage(
    chalk`Writing {blue ${depsFromNodeModules.length}} dependencies as JSON array to {blue ${output}}`
  )
  try {
    await fs.writeJSON(output, depsFromNodeModules, { spaces: 2, eol: '\n' })
  } catch (e) {
    errorMessage(chalk`Could not write to {blue ${output}}`, e)
  }
}

processFiles()
