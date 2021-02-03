import { createSubject } from './utils/create-subject'

export const formSubmit$ = createSubject()

export const transactionCreated$ = createSubject<string>()

export const approvalRequired$ = createSubject<any>()

export const approvalNotRequired$ = createSubject<null>()

export const frameHeight$ = createSubject<number>(0)

export const approvalUrl$ = createSubject<string>()

export const optionsLoaded$ = createSubject()

export const isApprovalRequired$ = createSubject<boolean>()

export const isPopupOpen$ = createSubject<boolean>()

export const approvalStarted$ = createSubject()

export const approvalCancelled$ = createSubject()

formSubmit$.subscribe(() => {
  if (isApprovalRequired$.value()) {
    approvalStarted$.next()
  }
})

approvalRequired$.subscribe(() => {
  isApprovalRequired$.next(true)
})

approvalNotRequired$.subscribe(() => {
  isApprovalRequired$.next(false)
})

export const approvalCompleted$ = createSubject()

transactionCreated$.subscribe(() => {
  if (approvalRequired$.value()) {
    approvalCompleted$.next()
  }
})
