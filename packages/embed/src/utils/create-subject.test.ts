import { createSubject } from './create-subject'

describe('createSubject', () => {
  test('subscribing to events', (done) => {
    const test$ = createSubject<number>()
    test$.subscribe((value) => {
      expect(value).toBe(123)
      done()
    })
    test$.next(123)
  })
  test('value should return the last value', () => {
    const test$ = createSubject<number>()
    test$.next(123)
    expect(test$.value()).toBe(123)
  })
  test('unsubscribing from subject', () => {
    const test$ = createSubject<number>()
    let value = 321
    test$
      .subscribe((newValue) => {
        value = newValue
      })
      .unsubscribe()
    test$.next(123)
    expect(value).toBe(321)
  })

  test('sync option delivers events synchronously', () => {
    const test$ = createSubject<number>(undefined, { sync: true })
    let value = 0
    test$.subscribe((newValue) => {
      value = newValue
    })
    test$.next(123)
    // With sync: true, the value should be updated immediately
    expect(value).toBe(123)
  })

  test('async delivery (default) defers events', (done) => {
    const test$ = createSubject<number>()
    let value = 0
    test$.subscribe((newValue) => {
      value = newValue
      // This runs after the setTimeout
      expect(value).toBe(123)
      done()
    })
    test$.next(123)
    // Value should still be 0 immediately after next() because of setTimeout
    expect(value).toBe(0)
  })
})
