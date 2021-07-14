import { createSubject } from './utils/create-subject'

export const createSubjectManager = () => {
  const subjects = {
    approvalRequired$: createSubject<boolean>(),
    approvalUrl$: createSubject<string>(),
    approvalStarted$: createSubject(),
    approvalCancelled$: createSubject(),
    approvalLost$: createSubject(),
    approvalCompleted$: createSubject(),
    frameHeight$: createSubject<number>(0),
    optionsLoaded$: createSubject<boolean>(false),
    formSubmit$: createSubject(),
    transactionCreated$: createSubject<{
      id: string
      status: string
      paymentMethod?: { id?: string }
    }>(),
    transactionFailed$: createSubject(),
  }

  subjects.formSubmit$.subscribe(() => {
    if (subjects.approvalRequired$.value()) {
      subjects.approvalStarted$.next()
    }
  })

  subjects.transactionCreated$.subscribe(() => {
    if (subjects.approvalRequired$.value()) {
      subjects.approvalCompleted$.next()
    }
  })

  return subjects
}

export type SubjectManager = ReturnType<typeof createSubjectManager>
