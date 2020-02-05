const dependenciesExtractor = require('./dependencies-extractor')
const filesystem = require('../filesystem/filesystem')

describe('readDependencyFromPackageFile', () => {
  it(`returns the dependency name and version as read from the file`,
    () => {
      const packageJsonFile = '../../test-data/node_modules_samples/siblings_no_nesting/node_modules/dependency-a/package.json'
      const resolvedFileName = filesystem.resolvePathOrFilename({ pathOrFilename: packageJsonFile })
      expect(dependenciesExtractor
        .readDependencyFromPackageFile({ packageJsonFilename: resolvedFileName }))
        .toEqual(
          { name: 'dependency-a', version: '1.0.0' }
        )
    })
})
