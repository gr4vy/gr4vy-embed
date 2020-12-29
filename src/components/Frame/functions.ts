/**
 * Validates the presence of all the required fields
 */
export const validate = (options) =>
  isType(options, `capture`, `boolean`) &&
  isString(options, `bearerToken`) &&
  isHost(options, `apiHost`) &&
  isHost(options, `iframeHost`) &&
  isNumber(options, `amount`) &&
  isRequired(options, 'amount') &&
  isNumber(options, `timeout`) &&
  isString(options, `currency`, {
    minLength: 3,
    maxLength: 3,
    optional: false,
  }) &&
  isType(options, `showButton`, `boolean`) &&
  isString(options, `preferResponse`, { optional: true }) &&
  isOneOf(options, `debug`, [`debug`, `log`]) &&
  isType(options, `onEvent`, `function`) &&
  isString(options, `externalIdentifier`, { optional: true })

/**
 * Gets the parent frame's origin
 */
export const parentHost = () => {
  return `${document?.location?.protocol}//${document?.location?.host}`
}

/**
 * Converts a iframeHost to a full URL with a scheme
 */
export const frameUrl = (options) => {
  const url = new URL(`https://${options.iframeHost}`)
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  url.searchParams.set(`parentHost`, parentHost())
  url.searchParams.set(`channel`, options.channel)
  return String(url)
}

// PRIVATE

/**
 * Outputs a validation error to console.error and the
 * onEvent handler
 */
const error = (options, key, message) => {
  const error = {
    code: `argumentError`,
    argument: `options.${key}`,
    message: message,
  }

  console.error(`Gr4vy - Error`, error)
  options?.onEvent?.(`argumentError`, error)
}

/**
 * Validates that a field matches any value that marches the provided array
 * of the provided options for the array
 */
const isOneOf = (options, key, array) => {
  const value = options[key]
  if ([undefined, null, ``].includes(value)) {
    return true
  }

  const valid = value && array.includes(value)

  if (!valid) {
    error(options, key, `must be one of ${JSON.stringify(array)}`)
  }
  return valid
}

/**
 * Validates that a value is a non empty string
 */
const isString = (
  options,
  key,
  { minLength = 1, maxLength = Infinity, optional = false } = {}
) => {
  const value = options[key]
  if (optional && [undefined, null, ``].includes(value)) {
    return true
  }

  const valid =
    typeof value === `string` &&
    value.length >= minLength &&
    value.length <= maxLength
  if (!valid) {
    error(options, key, `must be a valid, non-empty string`)
  }
  return valid
}

/**
 * Validates that a value is a hostname
 */
const isHost = (options, key) => {
  const value = options[key] || ``
  let url = null
  try {
    url = new URL(`http://${value}`)
  } catch {
    // ignore error specifics
  }
  const valid = !!url

  if (!valid) {
    error(options, key, `must be a valid 'hostname' with an optional ':port'`)
  }
  return valid
}

/**
 * Validates that a value is a number or a string of a number
 */
const isNumber = (options, key) => {
  const value = options[key]
  if ([undefined, null, ``].includes(value)) {
    return true
  }

  const valid = !!value && !!Number(value)
  if (!valid) {
    error(options, key, `must be a valid number`)
  }
  return valid
}

/**
 * Validates that a value is of a given type
 */
const isType = (options, key, type) => {
  const value = options[key]
  if ([undefined, null, ``].includes(value)) {
    return true
  }

  const valid = typeof value === type

  if (!valid) {
    error(options, key, `must be of type ${type}`)
  }
  return valid
}

/**
 * Validates that a value is a number or a string of a number
 */
const isRequired = (options, key) => {
  const value = options[key]
  if (![undefined, null, ``].includes(value)) {
    return true
  }
  error(options, key, `is required`)
  return false
}
