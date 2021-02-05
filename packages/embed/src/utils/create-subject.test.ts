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
})
