const utilities = require('./utilities')

describe('sortByNameAndVersionCaseInsensitive', () => {
  it('sorts alphabetically, ' +
  'in a case insensitive manner for component name ("A" and "a" are considered the same)', () => {
    const unsortedArrayInput = [
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'PACKAGE_B', version: 'B1.0.0' },
      { name: 'PACKAGE_A', version: 'A1.0.0' },
      { name: 'package_A', version: 'A1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'PACKAGE_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'PACKAGE_B', version: 'B1.0.0' }
      ])
  })

  it('sorts alphabetically, ' +
  'in a case insensitive manner for componentVersion ("A" and "a" are considered the same)', () => {
    const unsortedArrayInput = [
      { name: 'package_B', version: 'b1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_A', version: 'A1.0.0' },
      { name: 'package_A', version: 'a1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'a1.0.0' },
        { name: 'package_B', version: 'b1.0.0' },
        { name: 'package_B', version: 'B1.0.0' }
      ])
  })

  it('sorts alphabetically by componentName and componentVersion', () => {
    const unsortedArrayInput = [
      { name: 'package_C', version: 'C1.0.0' },
      { name: 'package_A', version: 'A1.0.0' },
      { name: 'PACKAGE_A', version: 'A1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_D', version: 'D2.0.0' },
      { name: 'package_D', version: 'D1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_A', version: 'a1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'PACKAGE_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'a1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'package_C', version: 'C1.0.0' },
        { name: 'package_D', version: 'D1.0.0' },
        { name: 'package_D', version: 'D2.0.0' }
      ])
  })
})

describe('getUniquesByNameAndVersion', () => {
  it('outputs the list without duplicates, when called on list with duplicates  ' +
  '(there are no objects with the same componentName and componentVersion)', () => {
    const duplicatesArrayInput = [
      { name: 'package_C', version: 'C1_threeTimes.0.0' },
      { name: 'package_A', version: 'A1_oneTime.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' },
      { name: 'package_B', version: 'B1_twoTimes.0.0' },
      { name: 'package_D', version: 'D2_oneTime.0.0' },
      { name: 'package_D', version: 'D1_oneTime.0.0' },
      { name: 'package_B', version: 'B1_twoTimes.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' }
    ]
    expect(utilities.getUniquesByNameAndVersion(duplicatesArrayInput))
      .toEqual([
        { name: 'package_C', version: 'C1_threeTimes.0.0' },
        { name: 'package_A', version: 'A1_oneTime.0.0' },
        { name: 'package_B', version: 'B1_twoTimes.0.0' },
        { name: 'package_D', version: 'D2_oneTime.0.0' },
        { name: 'package_D', version: 'D1_oneTime.0.0' }
      ])
  })

  it('when called on list with duplicated (upper cased) component name, it outputs the list without duplicates', () => {
    const duplicatesArrayInput = [
      { name: 'PACKAGE_C', version: 'C1_threeTimes.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' }
    ]
    expect(utilities.getUniquesByNameAndVersion(duplicatesArrayInput))
      .toEqual([
        { name: 'PACKAGE_C', version: 'C1_threeTimes.0.0' }
      ])
  })

  it('when called on list with duplicated (upper cased) component version, it outputs the list without duplicates', () => {
    const duplicatesArrayInput = [
      { name: 'package_C', version: 'C1_THREETIMES.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' },
      { name: 'package_C', version: 'C1_threeTimes.0.0' }
    ]
    expect(utilities.getUniquesByNameAndVersion(duplicatesArrayInput))
      .toEqual([
        { name: 'package_C', version: 'C1_THREETIMES.0.0' }
      ])
  })
})
