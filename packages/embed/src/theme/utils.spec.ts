import { themeToVars } from './utils'

test('themeToVars flattens a theme to an array of css variable tuples', () => {
  const result = themeToVars({
    foo: {
      bar: 'test',
    },
  })

  expect(result).toEqual([['--gr4vy-foo-bar', 'test']])
})
