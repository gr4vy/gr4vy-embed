import { createSubjectManager, SubjectManager } from './subjects'

jest.mock('./utils/create-subject')

describe('createSubjectManager', () => {
  let subject: SubjectManager

  beforeEach(() => {
    subject = createSubjectManager()
    subject.formSubmit$.subscribe(() => {
      if (subject.approvalRequired$.value()) {
        subject.approvalStarted$.next()
      }
    })
  })

  test('should start approval if required on form submit', () => {
    subject.approvalRequired$.next(true)
    let result = false
    const approvalStarted = subject.approvalStarted$.subscribe(() => {
      result = true
    })
    subject.formSubmit$.next()
    approvalStarted.unsubscribe()
    expect(result).toBe(true)
  })

  test('should skip approval if not required on form submit', () => {
    subject.approvalRequired$.next(false)
    let result = false
    const approvalStarted = subject.approvalStarted$.subscribe(() => {
      result = true
    })
    approvalStarted.unsubscribe()
    expect(result).toBe(false)
  })

  test('should complete approval on transaction complete', () => {
    subject.approvalRequired$.next(true)
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
    subject.approvalRequired$.next(false)
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
