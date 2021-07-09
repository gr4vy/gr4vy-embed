import { transactionCreated$, formSubmit$ } from '../subjects'

export type FormNapperInstance = {
  hijack: (fn: CallableFunction) => void
  inject: (name: string, value: string) => void
  submit: () => void
}

export const createFormController = (
  form: FormNapperInstance,
  onComplete?: CallableFunction
) => {
  form.hijack(() => {
    formSubmit$.next()
  })

  transactionCreated$.subscribe((transaction) => {
    form.inject(`gr4vy_transaction_id`, transaction.id)
    form.inject(`gr4vy_transaction_status`, transaction.status)

    // include payment method id if available
    if (transaction?.paymentMethod?.id) {
      form.inject(
        `gr4vy_transaction_payment_method_id`,
        transaction.paymentMethod.id
      )
    }

    return typeof onComplete === 'function'
      ? onComplete(transaction)
      : form.submit()
  })
}
