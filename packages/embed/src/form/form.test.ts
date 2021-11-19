import { createSubjectManager, SubjectManager } from '../subjects'
import { createFormController } from './form'

describe('createFormController', () => {
  let form: HTMLFormElement, subject: SubjectManager

  beforeEach(() => {
    form = document.createElement('form')
    const submit = document.createElement('input')
    submit.type = 'submit'
    form.id = 'test'
    form.appendChild(submit)
    document.body.append(form)
    subject = createSubjectManager()
  })

  it('should hijack the form and notify formSubmit$', (done) => {
    createFormController(form, null, subject)
    subject.formSubmit$.subscribe(() => {
      done()
    })
    form.submit()
  })

  describe('onTransactionCreated', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should inject the transaction id', () => {
      createFormController(form, null, subject)
      subject.transactionCreated$.next({ id: '123', status: 'captured' })

      jest.runAllTimers()

      expect(
        (document.getElementsByName(
          'gr4vy_transaction_id'
        )[0] as HTMLInputElement).value
      ).toBe('123')
    })

    it('should submit the form', (done) => {
      form.onsubmit = () => {
        done()
      }
      createFormController(form, null, subject)
      subject.transactionCreated$.next({ id: '123', status: 'captured' })
      jest.runAllTimers()
    })
  })
})
