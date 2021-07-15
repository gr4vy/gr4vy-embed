import { createSubjectManager, SubjectManager } from './subjects'

describe('createSubjectManager', () => {
  let subject: SubjectManager

  beforeEach(() => {
    subject = createSubjectManager()
    subject.formSubmit$.subscribe(() => {
      if (subject.mode$.value()) {
        subject.approvalStarted$.next()
      }
    })
  })

  test('should start approval if required on form submit', () => {
    subject.mode$.next({})
    let result = false
    const approvalStarted = subject.approvalStarted$.subscribe(() => {
      result = true
    })
    subject.formSubmit$.next()
    approvalStarted.unsubscribe()
    expect(result).toBe(true)
  })

  test('should skip approval if not required on form submit', () => {
    subject.mode$.next({})
    let result = false
    const approvalStarted = subject.approvalStarted$.subscribe(() => {
      result = true
    })
    approvalStarted.unsubscribe()
    expect(result).toBe(false)
  })

  test('should complete approval on transaction complete', () => {
    subject.mode$.next({
      popup: {
        title: 'Test',
        message: 'Test Message',
      },
    })
    let result = false
    const approvalCompleted = subject.approvalCompleted$.subscribe(
      () => (result = true)
    )
    subject.transactionCreated$.next({
      id: 'test-transaction-id',
      status: 'captured',
    })
    approvalCompleted.unsubscribe()
    expect(result).toBe(true)
  })

  test('should skip complete approval if not required on transaction complete', () => {
    subject.mode$.next({})
    let result = false
    const approvalCompleted = subject.approvalCompleted$.subscribe(
      () => (result = true)
    )
    subject.transactionCreated$.next({
      id: 'test-transaction-id',
      status: 'captured',
    })
    approvalCompleted.unsubscribe()
    expect(result).toBe(false)
  })
})
