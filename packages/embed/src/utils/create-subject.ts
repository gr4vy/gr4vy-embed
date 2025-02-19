import throttle from 'lodash.throttle'

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
    // throttle the next function call to ensure it's not called
    // more than once in a short period of time.
    next: throttle(
      (nextValue: T) => {
        value = nextValue
        // setTimeout will ensure events are called async
        subscribers.forEach((callbackFn) =>
          setTimeout(() => callbackFn(value), 0)
        )
      },
      100,
      {
        leading: false, // don't execute first call.
        trailing: true, // execute the last call.
      }
    ),
    value: () => {
      return value
    },
  }
}
