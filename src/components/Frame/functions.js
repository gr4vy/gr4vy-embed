
/**
 * Validates the presence of all the required fields
 */
export const validate = (options) => (
  isArray(options, `flow`, [
    [`authorize`, `capture`, `store`],
    [`authorize`, `capture`],
    [`authorize`, `store`],
    [`authorize`],
    [`store`]
  ]) && 
  isString(options, `bearerToken`) &&
  isHost(options, `apiHost`) && 
  isHost(options, `iframeHost`) && 
  isNumber(options, `amount`) && 
  isString(options, `currency`, { minLength: 3, maxLength: 3, optional: true }) && 
  isType(options, `showButton`, `boolean`, { optional: true }) && 
  isString(options, `preferResponse`, { optional: true }) && 
  isOneOf(options, `debug`, [`debug`, `log`]) && 
  isType(options, `onEvent`, `function`, { optional: true }) && 
  isRequired(options, `currency`, `flow`, flow => (flow.includes(`authorize`) || flow.includes(`capture`))) &&
  isRequired(options, `amount`, `flow`, flow => (flow.includes(`authorize`) || flow.includes(`capture`)))
)

/**
 * Converts a iframeHost to a full URL with a scheme
 */
export const frameUrl = ({
  iframeHost
}) => {
  const url = new URL(`https://${iframeHost}`)
  if ([`localhost`, `127.0.0.1`].includes(url.hostname)) {
    url.protocol = `http`
  }
  const parentHost = `${document?.location?.protocol}//${document?.location?.host}`
  url.searchParams.set(`parentHost`, parentHost)
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
    message: message
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
  if ([undefined, null, ``].includes(value)) { return true }

  const valid = value && array.includes(value)

  if (!valid) { 
    error(options, key, `must be one of ${JSON.stringify(array)}`)
  }
  return valid
}
 
/**
 * Validates that a field is an array and that the array matches any
 * of the provided options for the array
 */
const isArray = (options, key, arrayOfArrays) => {
  const value = options[key]

  const valid = value && value?.[0] && arrayOfArrays.some(array => {
    return array.length === value.length &&
      array.every(arrayOption => value.includes(arrayOption))
  })

  if (!valid) { 
    error(options, key, `must be one of ${JSON.stringify(arrayOfArrays)}`)
  }
  return valid
}

/**
 * Validates that a value is a non empty string
 */
const isString = (options, key, { minLength = 1, maxLength = Infinity, optional = false } = {}) => {
  const value = options[key]
  if (optional && [undefined, null, ``].includes(value)) { return true }

  const valid = (typeof value === `string`) && value.length >= minLength && value.length <= maxLength
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
  if ([undefined, null, ``].includes(value)) { return true }

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
  if ([undefined, null, ``].includes(value)) { return true }

  const valid = typeof value === type

  if (!valid) {
    error(options, key, `must be of type ${type}`)
  }
  return valid
}

/**
 * Adds optional validation to a field if another field validates for the 
 * function set out by the validator
 */
const isRequired = (options, key, otherKey, validator) => {
  const value = options[key]
  const otherValue = options[otherKey]
  
  const valid = !validator(otherValue) || !!value

  if (!valid) {
    error(options, key, `most be set when ${otherKey} is set to the current value`)
  }

  return valid
}