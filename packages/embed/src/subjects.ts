import { createSubject } from './utils/create-subject'

export const createSubjectManager = () => {
  const subjects = {
    mode$: createSubject<{
      popup?: {
        message: string
        title: string
      }
      overlay?: {
        message
        title
        cancel
        link
      }
    }>(),
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
    if (subjects.mode$.value()?.popup) {
      subjects.approvalStarted$.next()
    }
  })

  subjects.transactionCreated$.subscribe(() => {
    if (subjects.mode$.value()?.popup) {
      subjects.approvalCompleted$.next()
    }
  })

  return subjects
}

export type SubjectManager = ReturnType<typeof createSubjectManager>
