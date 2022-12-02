import { SubjectManager } from 'subjects'

export const createSubmitController = (
  onComplete: CallableFunction,
  subject: SubjectManager,
  onCustomSubmit: CallableFunction
) => {
  subject.submit$.subscribe(() => {
    if (subject.selectedOption$.value()?.mode === 'custom') {
      onCustomSubmit({ method: subject.selectedOption$.value().method })
    } else {
      subject.formSubmit$.next()
    }
  })

  subject.transactionCreated$.subscribe((transaction) => {
    if (onComplete) {
      onComplete(transaction)
    }
  })
}
