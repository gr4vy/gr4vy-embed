export * from './create-subject'
export * from './generate-channel-id'
export * from './pick'

export type MutableRef<T> = {
  get: () => T
  set: (value: T) => void
}

export const mutableRef = <T>(defaultValue?: T): MutableRef<T> => {
  let value = defaultValue
  return {
    get: () => value,
    set: (newValue) => (value = newValue),
  }
}
