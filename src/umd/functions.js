export const argumentError = (argument, message, options) => {
  const error = {
    code: `argumentError`,
    argument,
    message
  }
  console.error(`Gr4vy - Error`, error)
  options?.onEvent?.(`argumentError`, error)
  return error
}

