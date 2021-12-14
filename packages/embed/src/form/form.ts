import FormNapper from 'form-napper'
import { SubjectManager } from '../subjects'

export type FormNapperInstance = {
  hijack: (fn: CallableFunction) => void
  inject: (name: string, value: string) => void
  submit: () => void
  detach: () => void
}

const instances = new Map<string, FormNapperInstance>()
let instanceCount = 0

export const createFormController = (
  form: HTMLFormElement,
  onComplete: CallableFunction,
  subject: SubjectManager,
  onCustomSubmit: CallableFunction
) => {
  // Check if currently managed by form napper
  if (parseInt(form.dataset.formNapperId) > 0) {
    const instance = instances.get(form.dataset.formNapperId)

    // Detatch the existing element
    instance.detach()

    // Remove the instance
    instances.delete(form.dataset.formNapperId)
  }

  instanceCount = instanceCount + 1
  form.dataset.formNapperId = String(instanceCount)
  const formNapperInstance = new FormNapper(form) as FormNapperInstance
  instances.set(instanceCount.toString(), formNapperInstance)

  formNapperInstance.hijack(() => {
    if (subject.selectedOption$.value()?.mode === 'custom') {
      onCustomSubmit({ method: subject.selectedOption$.value().method })
    } else {
      subject.formSubmit$.next()
    }
  })

  subject.transactionCreated$.subscribe((transaction) => {
    formNapperInstance.inject(`gr4vy_transaction_id`, transaction.id)
    formNapperInstance.inject(`gr4vy_transaction_status`, transaction.status)

    // include payment method id if available
    if (transaction?.paymentMethod?.id) {
      formNapperInstance.inject(
        `gr4vy_transaction_payment_method_id`,
        transaction.paymentMethod.id
      )
    }

    return typeof onComplete === 'function'
      ? onComplete(transaction)
      : formNapperInstance.submit()
  })
}
