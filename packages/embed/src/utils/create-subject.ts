export interface SubjectOptions {
  /**
   * When true, subscribers are invoked synchronously instead of being
   * deferred via setTimeout. This is required for Apple Pay where
   * the ApplePaySession constructor must run in the user gesture handler.
   */
  sync?: boolean
}

export const createSubject = <T = void>(
  initialValue?: T,
  options: SubjectOptions = {}
) => {
  const { sync = false } = options
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
      // By default, setTimeout ensures events are called async.
      // For Apple Pay, we need synchronous delivery to stay within
      // the user gesture handler required by WebKit.
      subscribers.forEach((callbackFn) =>
        sync ? callbackFn(value) : setTimeout(() => callbackFn(value), 0)
      )
    },
    value: () => {
      return value
    },
  }
}
