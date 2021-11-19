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

  test('should start approval if required on form submit', (done) => {
    subject.mode$.next({})

    // assert
    const approvalStarted = subject.approvalStarted$.subscribe(() => {
      approvalStarted.unsubscribe()
      done()
    })

    // act
    subject.formSubmit$.next()
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

  test('should complete approval on transaction complete', (done) => {
    subject.mode$.next({
      popup: {
        title: 'Test',
        message: 'Test Message',
      },
    })

    // assert
    const approvalCompleted = subject.approvalCompleted$.subscribe(() => {
      approvalCompleted.unsubscribe()
      done()
    })

    // act
    subject.transactionCreated$.next({
      id: 'test-transaction-id',
      status: 'captured',
    })
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
