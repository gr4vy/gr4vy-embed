import { DeepPartial } from 'types'

export type ThemeOptions = {
  borderWidths: Record<string, string>
  colors: Record<string, string>
  radii: Record<string, string>
}

const borderWidthMap: Record<'none' | 'thin' | 'thick', string> = {
  none: '0',
  thin: '1px',
  thick: '2px',
}

const radiiMap: Record<'none' | 'subtle' | 'rounded', string> = {
  rounded: '4px',
  subtle: '2px',
  none: '0',
}

/**
 * Resolves a value object given a map
 */
const resolveMapValues = (map, values: Record<string, string> = {}) =>
  Object.keys(values).reduce((acc, key) => {
    return { ...acc, [key]: map[values[key]] }
  }, {})

/**
 * Resolves theme values based on mapped types
 */
export const createTheme = (options?: DeepPartial<ThemeOptions>): any => {
  const theme = {}

  if (options?.colors) {
    theme['colors'] = { ...options.colors }
  }

  if (options?.borderWidths) {
    theme['borderWidths'] = resolveMapValues(borderWidthMap, {
      ...options.borderWidths,
    })
  }

  if (options?.radii) {
    theme['radii'] = resolveMapValues(radiiMap, {
      ...options.radii,
    })
  }

  return theme
}
