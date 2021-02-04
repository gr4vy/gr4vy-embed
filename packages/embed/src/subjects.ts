import { createSubject } from './utils/create-subject'

export const approvalRequired$ = createSubject<boolean>()
export const approvalUrl$ = createSubject<string>()
export const approvalStarted$ = createSubject()
export const approvalCancelled$ = createSubject()
export const approvalCompleted$ = createSubject()
export const frameHeight$ = createSubject<number>(0)
export const optionsLoaded$ = createSubject<boolean>(false)
export const transactionCreated$ = createSubject<string>()
export const formSubmit$ = createSubject()

formSubmit$.subscribe(() => {
  if (approvalRequired$.value()) {
    approvalStarted$.next()
  }
})

transactionCreated$.subscribe(() => {
  if (approvalRequired$.value()) {
    approvalCompleted$.next()
  }
})
