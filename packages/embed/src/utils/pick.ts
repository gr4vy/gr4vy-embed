export const pick = <T>(object: Object, keys: Array<string>) =>
  keys.reduce((newObject, key) => {
    if (object[key]) {
      newObject[key] = object[key]
    }
    return newObject
  }, {}) as T
