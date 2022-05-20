export const pick = <T>(object: Object, keys: Array<string>) =>
  keys.reduce((newObject, key) => {
    if (typeof object[key] !== 'undefined' && object[key] !== null) {
      newObject[key] = object[key]
    }
    return newObject
  }, {}) as T
