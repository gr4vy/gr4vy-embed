export type MutableRef<T> = {
  current: T
}

export const mutableRef = <T>(defaultValue?: T): MutableRef<T> => {
  const ref = {
    current: defaultValue,
  }
  return ref
}
