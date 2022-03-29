type Config = {
  url: string
  data?: {}
  errorPrefix?: string
}

export const poll = (
  { url, data, errorPrefix }: Config,
  delay = 3000,
  retries = 2
) =>
  new Promise((resolve, reject) => {
    fetch(url, { mode: 'no-cors' })
      .then((response) => {
        return resolve(response)
      })
      .catch((err) => {
        // No retries left, reject and return
        if (!retries) {
          return reject(err)
        }
        // Poll again after {delay} milliseconds
        reject(`${err} - retrying in ${delay} milliseconds`)
        return setTimeout(() => {
          poll({ url, data, errorPrefix }, delay, retries - 1)
        }, delay)
      })
  }).catch((err) => {
    const message = `${errorPrefix ?? ''}
=> ${err}`
    console.warn(message, data || {})
  })
