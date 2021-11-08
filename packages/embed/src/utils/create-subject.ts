export const createSubject = <T = void>(initialValue?: T) => {
  let value = initialValue
  const subscribers = []
  return {
    subscribe: (callbackFn: (nextValue: T) => void) => {
      const length = subscribers.push(callbackFn)
      return {
        unsubscribe: () => {
          subscribers.splice(length - 1)
        },
      }
    },
    next: (nextValue: T) => {
      value = nextValue
      // setTimeout will ensure events are called async
      subscribers.forEach((callbackFn) => setTimeout(callbackFn(value), 0))
    },
    value: () => {
      return value
    },
  }
}
