import { createTheme } from './create-theme'

describe('createTheme', () => {
  test('creates an empty theme', () => {
    const result = createTheme()
    expect(result).toEqual({})
  })

  test('includes custom colors', () => {
    const result = createTheme({
      colors: {
        primary: 'foo',
      },
    })
    expect(result.colors.primary).toEqual('foo')
  })

  test('resolves radii values', () => {
    const result = createTheme({
      radii: {
        container: 'rounded',
        input: 'subtle',
      },
    })
    expect(result.radii).toEqual({
      container: '4px',
      input: '2px',
    })
  })

  test('set custom border widths', () => {
    const result = createTheme({
      borderWidths: {
        input: 'thin',
        container: 'thick',
        focus: 'thin',
      },
    })
    expect(result.borderWidths).toEqual({
      container: '2px',
      input: '1px',
      focus: '1px',
    })
  })
})
