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

describe('getDependenciesFromFolder', () => {
  it(`returns all the dependencies from an input folder which contains siblings and nesting`,
    () => {
      const folder = '../../test-data/node_modules_samples/siblings_with_nesting/node_modules'
      const resolvedFolder = filesystem.resolvePathOrFilename({ pathOrFilename: folder })
      expect(dependenciesExtractor
        .getDependenciesFromFolder({ currentFolder: resolvedFolder }))
        .toEqual([
          { name: 'dependency-a', version: '1.0.0' },
          { name: 'dependency-c', version: '7.0.0' },
          { name: 'dependency-d', version: '1.0.0' }
        ])
    })

  it(`returns all the dependencies from an input folder which contains scoped dependencies`,
    () => {
      const folder = '../../test-data/node_modules_samples/dependencies_nested_with_scope/node_modules'
      const resolvedFolder = filesystem.resolvePathOrFilename({ pathOrFilename: folder })
      expect(dependenciesExtractor
        .getDependenciesFromFolder({ currentFolder: resolvedFolder }))
        .toEqual([
          { name: '@babel/code-frame', version: '7.5.5' },
          { name: '@babel/core', version: '7.4.3' },
          { name: 'semver', version: '5.7.0' }
        ])
    })

  it(`returns the dependency name and version from an input folder which contains a dependency having one package.json file and other subfolders (e.g., test) that also contain package.json files, while not representing new dependencies`,
    () => {
      const folder = '../../test-data/node_modules_samples/dependency-with-package-json-and-subfolders/node_modules'
      const resolvedFolder = filesystem.resolvePathOrFilename({ pathOrFilename: folder })
      expect(dependenciesExtractor
        .getDependenciesFromFolder({ currentFolder: resolvedFolder }))
        .toEqual([
          { name: 'resolve', version: '1.10.0' }
        ])
    })
})
