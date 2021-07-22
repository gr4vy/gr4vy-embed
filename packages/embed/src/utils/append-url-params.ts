export const appendUrlParams = (url, params) => {
  const newUrl = new URL(url)
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      newUrl.searchParams.set(key, params[key])
    }
  })
  return newUrl.toString()
}
