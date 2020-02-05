const filesystem = require('./filesystem')

describe('getRelativeNameSubfoldersOf', () => {
  it(`returns the subfolders of the given directory`,
    () => {
      const folder = '../../test-data/node_modules_samples/siblings_no_nesting/node_modules'
      const resolvedFolderName = filesystem.resolvePathOrFilename({ pathOrFilename: folder })
      expect(filesystem
        .getRelativeNameSubfoldersOf({ resolvedFolderName }))
        .toEqual([
          'dependency-a',
          'dependency-b'
        ])
    })
  it(`returns an empty aray if the given directory has no subfolders`,
    () => {
      const folder = '../../test-data/node_modules_samples/no_dependencies/node_modules'
      const resolvedFolderName = filesystem.resolvePathOrFilename({ pathOrFilename: folder })
      expect(filesystem
        .getRelativeNameSubfoldersOf({ resolvedFolderName }))
        .toEqual([])
    })
})
