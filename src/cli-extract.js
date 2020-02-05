#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const { isDirectory, resolvePathOrFilename } = require('./filesystem/filesystem')

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

  const resolvedPathOrFilename = resolvePathOrFilename({ pathOrFilename: input})
  if(!isDirectory({ resolvedPathOrFilename })){
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

  const resolvedPathOrFilename = resolvePathOrFilename({ pathOrFilename: input})
  if(input !== resolvedPathOrFilename) {
    infoMessage(
      chalk`Resolved input path ${input} to path {blue ${resolvedPathOrFilename}}`
    )
  }
}

processFiles()
