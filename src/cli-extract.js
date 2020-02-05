#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

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

const areInputParametersValid = ({ input }) => {
  if (!input) {
    errorMessage(chalk`{red Mandatory input parameter is missing} (run 'extract --help' for usage); program exits`)
    return false
  }

  return true
}

const processFiles = async () => {
  setVerbose(verbose)

  infoMessage(
    chalk`extract\n Program arguments:\n    input: {blue ${input}}\n    output: {blue ${output}}\n      verbose: {blue ${verbose}}`
  )

  if (!areInputParametersValid({ input })) {

  }
}

processFiles()
