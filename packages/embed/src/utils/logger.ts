type Options = {
  debug?: boolean
  level?: 'log' | 'warn' | 'error'
}

const defaultOptions: Options = {
  debug: false,
  level: 'log',
}

export const log = (
  key: string,
  object: any,
  options: Options = defaultOptions
) => {
  const { debug, level } = { ...defaultOptions, ...options }
  // ignore if debugging is disabled
  if (!debug) {
    return
  }
  console[level](`Gr4vy - ${key}`, object)
}

export const warn = (key: string, object: any, options: Options) => {
  log(key, object, { ...options, level: 'warn' })
}

export const error = (key: string, object: any, options: Options) => {
  log(key, object, { ...options, level: 'error' })
}
