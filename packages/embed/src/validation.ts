import { SetupConfig, Buyer } from './types'

// checks if a value needs validation to pass
export const canSkipValidation = ({
  required,
  value,
}: {
  required: boolean
  value: any
}) => {
  return !required && [undefined, null].includes(value)
}

// checks if object adheres to another's schema
export const isObjectWithSchema = (object?: any, schemaObject?: any) =>
  Object.entries(object).every(([key, val]) => {
    if (Object.prototype.toString.call(val) === '[object Object]') {
      return isObjectWithSchema(val, schemaObject[key])
    }
    return (
      schemaObject &&
      key in schemaObject &&
      (typeof schemaObject[key] === typeof val || val === null)
    )
  })

// Validates a HTML element
export const validateHTMLElement = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: string | HTMLElement | Element
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  if (value instanceof Element) {
    return true
  }

  const element: HTMLElement = document.querySelector(value)
  if (canSkipValidation({ required, value }) || element) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

// Validates a URI origin
export const validateHost = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  if (canSkipValidation({ required, value })) {
    return true
  }

  let valid = false

  try {
    const url = new URL(`http://${value}`)
    valid = value === url.host
  } catch {
    // do nothing here
  }

  if (!valid) {
    emitArgumentError({
      argument,
      message: `${value} ${message}`,
      callback,
    })
  }

  return valid
}

// Validates a number
export const validateNumber = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const number = Number(value)
  const valid = number >= 0 && number <= 99999999

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

// Validates a currency
export const validateCurrency = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = typeof value === 'string' && value.length === 3

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

export const validateIntent = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid =
    typeof value === 'string' &&
    ['authorize', 'capture', 'approve'].includes(value)

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

export const validateStore = ({
  argument,
  value,
  message,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = [true, false, 'ask'].includes(value)

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

const buyerObject: Buyer = {
  billingDetails: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: {
      houseNumberOrName: '',
      line1: '',
      line2: '',
      organization: '',
      city: '',
      postalCode: '',
      country: '',
      state: '',
      stateCode: '',
    },
    taxId: {
      value: '',
      kind: '',
    },
  },
}

export const validateBuyer = ({
  argument,
  value,
  message,
  required,
  expected,
  callback,
}: {
  argument: string
  value: any
  message: string
  required?: boolean
  expected: typeof buyerObject
  callback?: (name: string, event: { message: string }) => void
}) => {
  const valid = value && isObjectWithSchema(value, buyerObject)

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${argument} ${message}`,
    callback,
    _expected: expected,
  })
  return false
}

// Validates a type
export const validateType = ({
  argument,
  value,
  message,
  type,
  required = true,
  callback,
}: {
  argument: string
  value: any
  message: string
  type: string
  required?: boolean
  callback?: (name: string, event: { message: string }) => void
}): boolean => {
  const valid = typeof value === type

  if (canSkipValidation({ required, value }) || valid) {
    return true
  }

  emitArgumentError({
    argument,
    message: `${value} ${message}`,
    callback,
  })
  return false
}

export const validateCondition = ({
  argument,
  message,
  condition,
}: {
  argument: string
  message: string
  condition: boolean
}): boolean => {
  if (condition) {
    return true
  }

  emitArgumentError({
    argument,
    message,
  })
  return false
}

// Emites an argument error to the command line and to the `onEvent` handler.
export const emitArgumentError = ({
  argument,
  message,
  callback,
  ...rest
}: {
  argument: string
  message: string
  callback?: (name: string, event: { message: string }) => void
  [key: string]: any
}) => {
  const error = {
    code: `argumentError`,
    argument,
    message,
    ...rest,
  }
  console.error(`Gr4vy - Error`, error)
  callback?.(`argumentError`, error)
}

// Validates all Config
export const validate = (options: SetupConfig) =>
  validateHTMLElement({
    argument: 'element',
    value: options.element,
    message: 'must be a valid HTML element',
    callback: options.onEvent,
  }) &&
  validateHTMLElement({
    argument: 'form',
    value: options.form,
    required: false,
    message: 'must be a valid HTML form element',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'gr4vyId',
    value: options.gr4vyId,
    required: !options.iframeHost && !options.apiHost,
    type: 'string',
    message: 'must be a valid gr4vyId or iframeHost/apiHost',
    callback: options.onEvent,
  }) &&
  validateHost({
    argument: 'iframeHost',
    value: options.iframeHost,
    required: !options.gr4vyId,
    message: 'must be a valid hostname with an optional :port',
    callback: options.onEvent,
  }) &&
  validateHost({
    argument: 'apiHost',
    value: options.apiHost,
    message: 'must be a valid hostname with an optional :port',
    required: !options.gr4vyId,
    callback: options.onEvent,
  }) &&
  validateIntent({
    argument: 'intent',
    value: options.intent,
    message: 'must be a valid intent',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'onEvent',
    value: options.onEvent,
    type: 'function',
    message: 'must be a function',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'token',
    value: options.token,
    type: 'string',
    message: 'must be a string',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'externalIdentifier',
    value: options.externalIdentifier,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateCurrency({
    argument: 'currency',
    value: options.currency,
    message: 'must be a valid currency format',
    callback: options.onEvent,
  }) &&
  validateNumber({
    argument: 'amount',
    value: options.amount,
    message: 'must be valid non-negative number',
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'debug',
    value: options.debug,
    type: 'boolean',
    message: 'must be a boolean',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerExternalIdentifier',
    value: options.buyerExternalIdentifier,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerExternalIdentifier',
    value: options.buyerExternalIdentifier && options.buyer,
    type: 'string',
    message: 'must be used without a buyer',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerId',
    value: options.buyerId,
    type: 'string',
    message: 'must be a string',
    required: false,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyerId',
    value: options.buyerId && options.buyer,
    type: 'string',
    message: 'must be used without a buyer',
    required: false,
    callback: options.onEvent,
  }) &&
  validateBuyer({
    argument: 'buyer',
    value: options.buyer,
    message: 'must be a valid object',
    required: false,
    expected: buyerObject,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'buyer',
    value:
      options.buyer && (options.buyerExternalIdentifier || options.buyerId),
    type: 'object',
    message: 'must be used without buyerExternalIdentifier or buyerId',
    required: false,
  }) &&
  validateType({
    argument: 'environment',
    value: options.environment,
    type: 'string',
    message: 'must be "production" or "sandbox"',
    required: false,
    callback: options.onEvent,
  }) &&
  validateStore({
    argument: 'store',
    value: options.store,
    message: 'must be true, false or "ask"',
    required: false,
  }) &&
  validateType({
    argument: 'country',
    value: options.country,
    type: 'string',
    message: 'must be a string ISO country code',
    required: true,
    callback: options.onEvent,
  }) &&
  validateType({
    argument: 'display',
    value: options.display,
    type: 'string',
    message: 'must be "storedOnly", "addOnly", "supportsTokenization" or "all"',
    required: false,
  }) &&
  validateType({
    argument: 'metadata',
    value: options.metadata,
    type: 'object',
    message: 'must be an object',
    required: false,
  }) &&
  validateType({
    argument: 'cartItems',
    value: options.cartItems,
    type: 'object',
    message: 'must be an array',
    required: false,
  }) &&
  validateType({
    argument: 'statementDescriptor',
    value: options.statementDescriptor,
    type: 'object',
    message: 'must be an object',
    required: false,
  }) &&
  validateType({
    argument: 'secure',
    value: options.secure,
    type: 'boolean',
    message: 'must be a boolean',
    required: false,
  }) &&
  validateNumber({
    argument: 'popupTimeout',
    value: options.popupTimeout,
    message: 'must be valid non-negative number',
    required: false,
  }) &&
  validateType({
    argument: 'shippingDetailsId',
    value: options.shippingDetailsId,
    required: false,
    type: 'string',
    message: 'must be a valid uuid',
  }) &&
  validateCondition({
    argument: 'shippingDetailsId',
    condition: options.shippingDetailsId
      ? !!(options.buyerId || options.buyerExternalIdentifier)
      : true,
    message: 'must be used with a buyerId or buyerExternalId',
  }) &&
  validateCondition({
    argument: 'shippingDetailsId',
    condition: options.shippingDetailsId ? !options.buyer : true,
    message: 'must be used without a buyer',
  }) &&
  validateType({
    argument: 'hasBeforeTransaction',
    value: options.onBeforeTransaction,
    required: false,
    type: 'function',
    message: 'must be a valid function that returns a promise',
  }) &&
  validateType({
    argument: 'merchantAccountId',
    value: options.merchantAccountId,
    message: 'must be a string',
    required: false,
    type: 'string',
  }) &&
  validateType({
    argument: 'billingAddressFields',
    value: options.billingAddressFields,
    type: 'object',
    message: 'must be an object',
    required: false,
  }) &&
  validateType({
    argument: 'antiFraudFingerprint',
    value: options.antiFraudFingerprint,
    message: 'must be a string',
    required: false,
    type: 'string',
  }) &&
  validateType({
    argument: 'excludedMethods',
    value: options.excludedMethods,
    message: 'must be a array',
    required: false,
    type: 'object',
  }) &&
  validateType({
    argument: 'optionLabels',
    value: options.optionLabels,
    type: 'object',
    message: 'must be an object',
    required: false,
  })
