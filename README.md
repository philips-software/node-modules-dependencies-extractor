# node-modules-dependencies-extractor
## Description
Extracts dependencies from the node_modules folder of a Javascript project, to a reference format. This reference format is a JSON file containing arrays of objects with keys _name_ and _version_.
The node_modules folder is assumed to have been generated by one of the following commands: `npm install` or `yarn install`.

Outputs the following files: 
  - __dependencies_from_node_modules.json__ (name can be overriden) contains the dependencies as identified in the __node_modules__ folder, in a reference format. This reference format is a JSON file containing arrays of objects with keys _name_ and _version_. It contains unique objects by the combination _name_ and _version_


# Status
0.1.0, see [CHANGELOG.md](./CHANGELOG.md)

# Limitation
- tested with the node_modules folder of various Javascript projects, as generated by the install command of the following package managers: 
  - yarn
  - npm

# Prerequisites
In order to run this project, you should have installed:
- Node installed (we used node v12.2.0)
- yarn  (we used version v1.19.0)
The input to this script should be a folder named node_modules, as generated by the install commands of either npm or yarn .

## Installation
Install globally:
```shell
npm install -g node-modules-dependencies-extractor
```
Or you could use it without installing by running:
```shell
npx node-modules-dependencies-extractor [options]
```

# Usage
```
extract-nm-dependencies [options]
```

### Supported options:

| Flag                 | Alias | Functionality
| ---------------------|:-----:| -------------------------------------
| --input [path]       |  -i   | (mandatory) specifies path to the node_modules folder.
| --output [filename]  |  -o   | (optional) Filename to which the list of dependencies (name+version) is written (json format). If the file already exists, it will be overwritten. Default value: dependencies_from_node_modules.json
| --verbose            |       | Verbose output of commands and errors
| --help               | -h    | Displays usage information
| --version            | -v    | Displays version number


### Sample usage
```
yarn extract-nm-dependencies -i ./test-data/node_modules_samples/siblings_no_nesting
```
## Technology stack
- Javascript
- This software is intended to be used standalone, as a command-line tool

## How to build
Get the sources locally; in a command line, go to the root folder of this project and execute:
```
yarn install
```
## How to test
```
yarn test
```
or 
```
yarn coverage
```

## How to do static analysis of code
Automatically enabled: standard
```
yarn lint
```

## Owners
See [CODEOWNERS](./CODEOWNERS)

## Maintainers
See [MAINTAINERS.md](./MAINTAINERS.md)

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
See [LICENSE.md](./LICENSE.md)

## Author
Sanda Contiu

## Keywords
  - dependencies
  - sbom
  - software bill of material
  - node_modules
  - npm
  - yarn
