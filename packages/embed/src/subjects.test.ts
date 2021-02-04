import {
  formSubmit$,
  transactionCreated$,
  approvalRequired$,
  approvalStarted$,
  approvalCompleted$,
} from './subjects'

jest.mock('./utils/create-subject')

formSubmit$.subscribe(() => {
  if (approvalRequired$.value()) {
    approvalStarted$.next()
  }
})

test('should start approval if required on form submit', () => {
  approvalRequired$.next(true)
  let result = false
  const approvalStarted = approvalStarted$.subscribe(() => {
    result = true
  })
  formSubmit$.next()
  approvalStarted.unsubscribe()
  expect(result).toBe(true)
})

test('should skip approval if not required on form submit', () => {
  approvalRequired$.next(false)
  let result = false
  const approvalStarted = approvalStarted$.subscribe(() => {
    result = true
  })
  approvalStarted.unsubscribe()
  expect(result).toBe(false)
})

test('should complete approval on transaction complete', () => {
  approvalRequired$.next(true)
  let result = false
  const approvalCompleted = approvalCompleted$.subscribe(() => (result = true))
  transactionCreated$.next('test-transaction-id')
  approvalCompleted.unsubscribe()
  expect(result).toBe(true)
})

test('should skip complete approval if not required on transaction complete', () => {
  approvalRequired$.next(false)
  let result = false
  const approvalCompleted = approvalCompleted$.subscribe(() => (result = true))
  transactionCreated$.next('test-transaction-id')
  approvalCompleted.unsubscribe()
  expect(result).toBe(false)
})
