import { transactionCreated$, formSubmit$ } from '../subjects'

export type FormNapperInstance = {
  hijack: (fn: CallableFunction) => void
  inject: (name: string, value: string) => void
  submit: () => void
}

export const createFormController = (form: FormNapperInstance) => {
  form.hijack(() => {
    formSubmit$.next()
  })

  transactionCreated$.subscribe((transactionId) => {
    form.inject(`gr4vy_transaction_id`, transactionId)
    form.submit()
  })
}
